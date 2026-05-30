import type {
    CalculationResults,
    Mode,
    Prices,
    TaxFees,
    TaxRates,
    TaxStepId,
    VehicleEngineVolume,
    VehicleType
} from "@/domains/arac-vergisi/types.js";
import type { TaxStep } from "@/utils/tax-calculator.js";

type OtvConfig = {
    thresholds: number[];
    rates: number[];
};

type OtvConfigs = {
    [vehicleType in VehicleType]: { [engineVolume in VehicleEngineVolume & `${vehicleType}.${string}`]?: OtvConfig } | OtvConfig;
};

const OTV_CONFIGS: OtvConfigs = {
    "automobile": {
        "automobile.0-1400": {
            thresholds: [650_000, 900_000, 1_100_000],
            rates: [70, 75, 80, 90]
        },
        "automobile.1401-1600": {
            thresholds: [850_000, 1_100_000, 1_650_000],
            rates: [75, 80, 90, 100]
        },
        "automobile.1601-2000": {
            thresholds: [1_650_000],
            rates: [150, 170]
        },
        "automobile.2001-up": {
            thresholds: [],
            rates: [220]
        }
    },

    "electric-automobile": {
        "electric-automobile.0-160": {
            thresholds: [1_650_000],
            rates: [25, 55]
        },
        "electric-automobile.161-up": {
            thresholds: [1_650_000],
            rates: [65, 75]
        }
    },

    "hybrid-automobile": {
        "hybrid-automobile.50-up.0-1800": {
            thresholds: [1_250_000],
            rates: [70, 80]
        },
        "hybrid-automobile.100-up.0-2500": {
            thresholds: [1_650_000],
            rates: [150, 170]
        },
        "hybrid-automobile.other": {
            thresholds: [],
            rates: [220]
        }
    },

    "motorcycle": {
        "motorcycle.0-250": {
            thresholds: [],
            rates: [8]
        },
        "motorcycle.251-up": {
            thresholds: [],
            rates: [37]
        }
    },

    "bus": { thresholds: [], rates: [1] },
    "midibus": { thresholds: [], rates: [4] },
    "minibus": { thresholds: [], rates: [9] },
    "helicopter": { thresholds: [], rates: [0.5] },
    "plane": { thresholds: [], rates: [0.5] },
    "boat": { thresholds: [], rates: [8] },
    "yacht": { thresholds: [], rates: [8] }
};

/** @beta */
export class Calculator {
    private readonly price: number;
    private readonly vehicleType: VehicleType;
    private readonly vehicleEngineVolume: VehicleEngineVolume | null = null;
    private readonly mode: Mode;

    public constructor(
        params: {
            price: number,
            vehicleType: VehicleType,
            vehicleEngineVolume: VehicleEngineVolume | null
        },
        options: {
            mode: Mode
        }
    ) {
        this.price = params.price;
        this.vehicleType = params.vehicleType;
        this.vehicleEngineVolume = params.vehicleEngineVolume;
        this.mode = options.mode;
    }

    public calculate(): CalculationResults {
        const taxSteps = this.buildTaxSteps();
        const taxCalculator = new TaxCalculator<TaxStepId>({
            price: this.price,
            mode: this.mode,
            taxSteps
        });

        const calculation = taxCalculator.calculate();

        const trtStep = calculation.steps["trt"];
        const otvStep = calculation.steps["specialConsumptionTax"];
        const kdvStep = calculation.steps["valueAddedTax"];

        const taxFees: TaxFees = {
            total: calculation.totalTax,
            trt: trtStep.taxAmount,
            specialConsumptionTax: otvStep.taxAmount,
            valueAddedTax: kdvStep.taxAmount
        };

        const taxRates: TaxRates = {
            total: calculation.totalTaxRate,
            trt: trtStep.rate,
            specialConsumptionTax: otvStep.rate,
            valueAddedTax: kdvStep.rate
        };

        const prices: Prices = {
            taxFree: calculation.taxFreePrice,
            taxAdded: calculation.taxAddedPrice
        };

        return normalizeCalculatorResults({
            taxFees,
            taxRates,
            prices,
            steps: calculation.steps
        });
    }

    private buildTaxSteps(): TaxStep<TaxStepId>[] {
        const TRT_RATE = .8;
        const KDV_RATE = 20;

        // TRT Bandrolü
        const trt: TaxStep<"trt"> = {
            id: "trt",
            name: "TRT Bandrolü",
            baseMode: "base-amount",
            rate: TRT_RATE,
            type: "percentage"
        };

        // ÖTV
        const otv_config = this.getOtvConfig();

        const otv_rate = (amount: number): number => {
            for (let i = 0; i < otv_config.thresholds.length; i++) {
                const threshold = otv_config.thresholds[i];
                if (threshold !== undefined && amount <= threshold) {
                    const rate = otv_config.rates[i];
                    if (rate !== undefined) {
                        return rate;
                    }
                }
            }
            const lastRate = otv_config.rates.at(-1);
            if (lastRate !== undefined) {
                return lastRate;
            }
            throw new Error("Invalid ÖTV configuration");
        };

        const otv_reverseRateResolver = (finalPrice: number): number => {
            const beforeMultiplier = 1 + TRT_RATE / 100;
            const afterMultiplier = 1 + KDV_RATE / 100;

            for (let i = 0; i < otv_config.thresholds.length; i++) {
                const matrahThreshold = otv_config.thresholds[i];
                const rate = otv_config.rates[i];
                if (matrahThreshold !== undefined && rate !== undefined) {
                    const finalPriceThreshold = matrahThreshold * beforeMultiplier * (1 + rate / 100) * afterMultiplier;
                    if (finalPrice <= finalPriceThreshold) {
                        return rate;
                    }
                }
            }
            const lastRate = otv_config.rates.at(-1);
            if (lastRate !== undefined) {
                return lastRate;
            }
            throw new Error("Invalid ÖTV configuration");
        };

        const otv: TaxStep<"specialConsumptionTax"> = {
            id: "specialConsumptionTax",
            name: "Özel Tüketim Vergisi (ÖTV)",
            baseMode: "previous-amount",
            rateBaseMode: "tax-free-amount",
            rate: otv_rate,
            reverseRateResolver: otv_reverseRateResolver,
            type: "percentage"
        };

        // KDV
        const valueAddedTax: TaxStep<"valueAddedTax"> = {
            id: "valueAddedTax",
            name: "Katma Değer Vergisi (KDV)",
            baseMode: "previous-amount",
            rate: KDV_RATE,
            type: "percentage"
        };

        const steps = {
            trt,
            specialConsumptionTax: otv,
            valueAddedTax
        } satisfies { [key in TaxStepId]: TaxStep<TaxStepId> };
        return [steps.trt, steps.specialConsumptionTax, steps.valueAddedTax];
    }

    private getOtvConfig(): OtvConfig {
        const configData = OTV_CONFIGS[this.vehicleType];

        if ("rates" in configData) {
            return configData as OtvConfig;
        }

        if (typeof configData === "object" && this.vehicleEngineVolume !== null) {
            // oxlint-disable-next-line typescript/no-explicit-any
            const engineConfig = (configData as any)[this.vehicleEngineVolume];
            if (!engineConfig) {
                throw new Error(`No ÖTV configuration found for ${this.vehicleType} with engine volume ${this.vehicleEngineVolume}`);
            }
            return engineConfig;
        }

        throw new Error(`Could not determine ÖTV configuration for ${this.vehicleType}`);
    }
}
