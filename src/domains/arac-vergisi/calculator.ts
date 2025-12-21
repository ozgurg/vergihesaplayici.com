import type {
    CalculationResults,
    Mode,
    Prices,
    TaxFees,
    TaxRates,
    VehicleEngineVolume,
    VehicleType
} from "@/domains/arac-vergisi/types.js";

type OtvRate = {
    maxBasePrice: number;
    percent: number;
};

type OtvRates = {
    [vehicleType in VehicleType]: { [engineVolume in VehicleEngineVolume & `${vehicleType}.${string}`]?: OtvRate[] } | OtvRate;
};

// Source: https://www.resmigazete.gov.tr/eskiler/2025/07/20250724-5.pdf
// Source: https://www.mevzuat.gov.tr/mevzuatmetin/1.5.4760.pdf
// Source: https://www.youtube.com/watch?v=qRaNnAdVnMc
const OTV_RATES: OtvRates = {
    "automobile": {
        "automobile.0-1400": [
            { maxBasePrice: 650_000, percent: 70 },
            { maxBasePrice: 900_000, percent: 75 },
            { maxBasePrice: 1_100_000, percent: 80 },
            { maxBasePrice: Infinity, percent: 90 }
        ],
        "automobile.1401-1600": [
            { maxBasePrice: 850_000, percent: 75 },
            { maxBasePrice: 1_100_000, percent: 80 },
            { maxBasePrice: 1_650_000, percent: 90 },
            { maxBasePrice: Infinity, percent: 100 }
        ],
        "automobile.1601-2000": [
            { maxBasePrice: 1_650_000, percent: 150 },
            { maxBasePrice: Infinity, percent: 170 }
        ],
        "automobile.2001-up": [
            { maxBasePrice: Infinity, percent: 220 }
        ]
    },

    "electric-automobile": {
        "electric-automobile.0-160": [
            { maxBasePrice: 1_650_000, percent: 25 },
            { maxBasePrice: Infinity, percent: 55 }
        ],
        "electric-automobile.161-up": [
            { maxBasePrice: 1_650_000, percent: 65 },
            { maxBasePrice: Infinity, percent: 75 }
        ]
    },

    "hybrid-automobile": {
        "hybrid-automobile.50-up.0-1800": [
            { maxBasePrice: 1_250_000, percent: 70 },
            { maxBasePrice: Infinity, percent: 80 }
        ],
        "hybrid-automobile.100-up.0-2500": [
            { maxBasePrice: 1_650_000, percent: 150 },
            { maxBasePrice: Infinity, percent: 170 }
        ],
        "hybrid-automobile.other": [
            { maxBasePrice: Infinity, percent: 220 }
        ]
    },

    "motorcycle": {
        "motorcycle.0-250": [
            { maxBasePrice: Infinity, percent: 0 }
        ],
        "motorcycle.251-up": [
            { maxBasePrice: Infinity, percent: 37 }
        ]
    },

    "bus": {
        maxBasePrice: Infinity, percent: 1
    },

    "midibus": {
        maxBasePrice: Infinity, percent: 4
    },

    "minibus": {
        maxBasePrice: Infinity, percent: 9
    },

    "helicopter": {
        maxBasePrice: Infinity, percent: .5
    },
    "plane": {
        maxBasePrice: Infinity, percent: .5
    },

    "boat": {
        maxBasePrice: Infinity, percent: 8
    },
    "yacht": {
        maxBasePrice: Infinity, percent: 8
    }
};

export class Calculator {
    private taxFees: TaxFees = {
        total: 0,
        trt: 0,
        specialConsumptionTax: 0,
        valueAddedTax: 0
    };

    private taxRates: TaxRates = {
        total: 0,
        trt: 0,
        specialConsumptionTax: 0,
        valueAddedTax: 0
    };

    private readonly prices: Prices = {
        taxFree: 0,
        taxAdded: 0
    };

    private price: number;
    private vehicleType: VehicleType;
    private vehicleEngineVolume: VehicleEngineVolume | null = null;
    private readonly calculateFromTaxAddedPrice: boolean;

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
        this.calculateFromTaxAddedPrice = options.mode === "tax-added-to-tax-free";

        if (this.calculateFromTaxAddedPrice) {
            this.prices.taxAdded = params.price;
        } else {
            this.prices.taxFree = params.price;
        }
    }

    public calculate(): CalculationResults {
        this.calculateTax_trt();
        this.calculateTax_specialConsumptionTax();
        this.calculateTax_valueAddedTax();


        if (this.calculateFromTaxAddedPrice) {
            this.prices.taxFree = this.price;
        } else {
            this.prices.taxAdded = this.price;
        }

        this.taxFees.total = this.calculateTotalTaxFee();
        this.taxRates.total = calculateTotalTaxRate(this.taxFees.total, this.prices.taxFree);

        return normalizeCalculatorResults({
            taxFees: this.taxFees,
            taxRates: this.taxRates,
            prices: this.prices
        });
    }

    private calculatePrice(price: number): void {
        if (this.calculateFromTaxAddedPrice) {
            this.price -= price;
        } else {
            this.price += price;
        }
    }

    private calculateTax(price: number, rate: number): number {
        return this.calculateFromTaxAddedPrice ?
            calculateTaxFromTaxAddedPrice(price, rate) :
            calculateTaxFromTaxFreePrice(price, rate);
    }

    private calculateTotalTaxFee(): number {
        return this.taxFees.trt +
            this.taxFees.specialConsumptionTax +
            this.taxFees.valueAddedTax;
    }

    private getOtvRate(): number | void {
        const rateData = OTV_RATES[this.vehicleType];

        // OtvRate
        if ("percent" in rateData) {
            return rateData.percent;
        }

        // OtvRate[]
        if (this.vehicleEngineVolume !== null && this.vehicleEngineVolume in rateData) {
            // oxlint-disable-next-line no-explicit-any
            const rates = (rateData as any)[this.vehicleEngineVolume];
            if (rates && Array.isArray(rates)) {
                for (const _rate of rates) {
                    if (this.price <= _rate.maxBasePrice) {
                        return _rate.percent;
                    }
                }
            }
        }
    }

    // "TRT bandrolü" | TRY | "percent" | "base-amount"
    private calculateTax_trt(): void {
        this.taxRates.trt = .8; // Eight per thousand
        this.taxFees.trt = this.calculateTax(this.price, this.taxRates.trt);
        this.calculatePrice(this.taxFees.trt);
    }

    // "Özel Tüketim Vergisi (ÖTV)" | TRY | "percent" | "previous-amount"
    private calculateTax_specialConsumptionTax(): void {
        this.taxRates.specialConsumptionTax = this.getOtvRate() ?? 0;
        this.taxFees.specialConsumptionTax = this.calculateTax(this.price, this.taxRates.specialConsumptionTax);
        this.calculatePrice(this.taxFees.specialConsumptionTax);
    }

    // "Katma Değer Vergisi (KDV)" | TRY | "percent" | "previous-amount"
    private calculateTax_valueAddedTax(): void {
        this.taxRates.valueAddedTax = 20;
        this.taxFees.valueAddedTax = this.calculateTax(this.price, this.taxRates.valueAddedTax);
        this.calculatePrice(this.taxFees.valueAddedTax);
    }
}
