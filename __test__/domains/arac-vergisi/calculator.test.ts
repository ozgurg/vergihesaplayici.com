import type { Mode, Prices, VehicleType } from "@/domains/arac-vergisi/types.js";
import { VehicleEngineVolume } from "@/domains/arac-vergisi/types.js";
import { describe, expect, it } from "vitest";
import { Calculator } from "@/domains/arac-vergisi/calculator.js";

type CalculateParams = {
    input: {
        price: number;
        vehicleType: VehicleType;
        vehicleEngineVolume: VehicleEngineVolume | null;
    };
    options: {
        mode: Mode;
    };
    expectedOutput: Prices;
};

const calculate = ({ input, options, expectedOutput }: CalculateParams): void => {
    const calculator = new Calculator(input, options);
    const results = calculator.calculate();
    expect(results.prices).toStrictEqual(expectedOutput);
};

describe("domains/arac-vergisi/calculator.js", () => {
    it("calculates taxes correctly with given inputs", () => {
        calculate({
            input: {
                price: 500_000,
                vehicleType: "automobile",
                vehicleEngineVolume: VehicleEngineVolume.AUTOMOBILE__0_1400
            },
            options: {
                mode: "tax-free-to-tax-added"
            },
            expectedOutput: {
                taxFree: 500_000,
                taxAdded: 1_028_160
            }
        });

        calculate({
            input: {
                price: 700_000,
                vehicleType: "automobile",
                vehicleEngineVolume: VehicleEngineVolume.AUTOMOBILE__0_1400
            },
            options: {
                mode: "tax-free-to-tax-added"
            },
            expectedOutput: {
                taxFree: 700_000,
                taxAdded: 1_481_760
            }
        });

        calculate({
            input: {
                price: 600_000,
                vehicleType: "automobile",
                vehicleEngineVolume: VehicleEngineVolume.AUTOMOBILE__1401_1600
            },
            options: {
                mode: "tax-free-to-tax-added"
            },
            expectedOutput: {
                taxFree: 600_000,
                taxAdded: 1_270_080
            }
        });

        calculate({
            input: {
                price: 800_000,
                vehicleType: "automobile",
                vehicleEngineVolume: VehicleEngineVolume.AUTOMOBILE__1601_2000
            },
            options: {
                mode: "tax-free-to-tax-added"
            },
            expectedOutput: {
                taxFree: 800_000,
                taxAdded: 2_419_200
            }
        });

        calculate({
            input: {
                price: 1_000_000,
                vehicleType: "electric-automobile",
                vehicleEngineVolume: VehicleEngineVolume.ELECTRIC_AUTOMOBILE__0_160
            },
            options: {
                mode: "tax-free-to-tax-added"
            },
            expectedOutput: {
                taxFree: 1_000_000,
                taxAdded: 1_512_000
            }
        });

        calculate({
            input: {
                price: 50_000,
                vehicleType: "motorcycle",
                vehicleEngineVolume: VehicleEngineVolume.MOTORCYCLE__0_250
            },
            options: {
                mode: "tax-free-to-tax-added"
            },
            expectedOutput: {
                taxFree: 50_000,
                taxAdded: 60_480
            }
        });

        calculate({
            input: {
                price: 100_000,
                vehicleType: "motorcycle",
                vehicleEngineVolume: VehicleEngineVolume.MOTORCYCLE__251_UP
            },
            options: {
                mode: "tax-free-to-tax-added"
            },
            expectedOutput: {
                taxFree: 100_000,
                taxAdded: 165_715.2
            }
        });

        calculate({
            input: {
                price: 1_020_000,
                vehicleType: "automobile",
                vehicleEngineVolume: VehicleEngineVolume.AUTOMOBILE__0_1400
            },
            options: {
                mode: "tax-added-to-tax-free"
            },
            expectedOutput: {
                taxFree: 468_474.42,
                taxAdded: 1_020_000
            }
        });

        calculate({
            input: {
                price: 1_470_000,
                vehicleType: "automobile",
                vehicleEngineVolume: VehicleEngineVolume.AUTOMOBILE__0_1400
            },
            options: {
                mode: "tax-added-to-tax-free"
            },
            expectedOutput: {
                taxFree: 639_619.88,
                taxAdded: 1_470_000
            }
        });

        calculate({
            input: {
                price: 1_500_000,
                vehicleType: "electric-automobile",
                vehicleEngineVolume: VehicleEngineVolume.ELECTRIC_AUTOMOBILE__0_160
            },
            options: {
                mode: "tax-added-to-tax-free"
            },
            expectedOutput: {
                taxFree: 992_063.49,
                taxAdded: 1_500_000
            }
        });

        calculate({
            input: {
                price: 60_000,
                vehicleType: "motorcycle",
                vehicleEngineVolume: VehicleEngineVolume.MOTORCYCLE__0_250
            },
            options: {
                mode: "tax-added-to-tax-free"
            },
            expectedOutput: {
                taxFree: 49_603.17,
                taxAdded: 60_000
            }
        });

        calculate({
            input: {
                price: 164_400,
                vehicleType: "motorcycle",
                vehicleEngineVolume: VehicleEngineVolume.MOTORCYCLE__251_UP
            },
            options: {
                mode: "tax-added-to-tax-free"
            },
            expectedOutput: {
                taxFree: 99_206.35,
                taxAdded: 164_400
            }
        });

        calculate({
            input: {
                price: 1_890_000,
                vehicleType: "automobile",
                vehicleEngineVolume: VehicleEngineVolume.AUTOMOBILE__0_1400
            },
            options: {
                mode: "tax-added-to-tax-free"
            },
            expectedOutput: {
                taxFree: 822_368.43,
                taxAdded: 1_890_000
            }
        });

        calculate({
            input: {
                price: 800_000,
                vehicleType: "hybrid-automobile",
                vehicleEngineVolume: VehicleEngineVolume.HYBRID_AUTOMOBILE__50_UP_0_1800
            },
            options: {
                mode: "tax-free-to-tax-added"
            },
            expectedOutput: {
                taxFree: 800_000,
                taxAdded: 1_645_056
            }
        });

        calculate({
            input: {
                price: 500_000,
                vehicleType: "bus",
                vehicleEngineVolume: null
            },
            options: {
                mode: "tax-free-to-tax-added"
            },
            expectedOutput: {
                taxFree: 500_000,
                taxAdded: 610_848
            }
        });

        calculate({
            input: {
                price: 10_000_000,
                vehicleType: "plane",
                vehicleEngineVolume: null
            },
            options: {
                mode: "tax-free-to-tax-added"
            },
            expectedOutput: {
                taxFree: 10_000_000,
                taxAdded: 12_156_480
            }
        });

        calculate({
            input: {
                price: 606_000,
                vehicleType: "bus",
                vehicleEngineVolume: null
            },
            options: {
                mode: "tax-added-to-tax-free"
            },
            expectedOutput: {
                taxFree: 496_031.75,
                taxAdded: 606_000
            }
        });
    });
});
