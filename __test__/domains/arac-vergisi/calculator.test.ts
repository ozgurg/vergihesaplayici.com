import type { Prices } from "@/domains/arac-vergisi/types.js";
import { Mode, VehicleEngineVolume, VehicleType } from "@/domains/arac-vergisi/types.js";
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
                vehicleType: VehicleType.AUTOMOBILE,
                vehicleEngineVolume: VehicleEngineVolume.AUTOMOBILE__0_1400
            },
            options: {
                mode: Mode.TAX_FREE_TO_TAX_ADDED
            },
            expectedOutput: {
                taxFree: 500_000,
                taxAdded: 1_020_000
            }
        });

        calculate({
            input: {
                price: 700_000,
                vehicleType: VehicleType.AUTOMOBILE,
                vehicleEngineVolume: VehicleEngineVolume.AUTOMOBILE__0_1400
            },
            options: {
                mode: Mode.TAX_FREE_TO_TAX_ADDED
            },
            expectedOutput: {
                taxFree: 700_000,
                taxAdded: 1_470_000
            }
        });

        calculate({
            input: {
                price: 600_000,
                vehicleType: VehicleType.AUTOMOBILE,
                vehicleEngineVolume: VehicleEngineVolume.AUTOMOBILE__1401_1600
            },
            options: {
                mode: Mode.TAX_FREE_TO_TAX_ADDED
            },
            expectedOutput: {
                taxFree: 600_000,
                taxAdded: 1_260_000
            }
        });

        calculate({
            input: {
                price: 800_000,
                vehicleType: VehicleType.AUTOMOBILE,
                vehicleEngineVolume: VehicleEngineVolume.AUTOMOBILE__1601_2000
            },
            options: {
                mode: Mode.TAX_FREE_TO_TAX_ADDED
            },
            expectedOutput: {
                taxFree: 800_000,
                taxAdded: 2_400_000
            }
        });

        calculate({
            input: {
                price: 1_000_000,
                vehicleType: VehicleType.ELECTRIC_AUTOMOBILE,
                vehicleEngineVolume: VehicleEngineVolume.ELECTRIC_AUTOMOBILE__0_160
            },
            options: {
                mode: Mode.TAX_FREE_TO_TAX_ADDED
            },
            expectedOutput: {
                taxFree: 1_000_000,
                taxAdded: 1_500_000
            }
        });

        calculate({
            input: {
                price: 50_000,
                vehicleType: VehicleType.MOTORCYCLE,
                vehicleEngineVolume: VehicleEngineVolume.MOTORCYCLE__0_250
            },
            options: {
                mode: Mode.TAX_FREE_TO_TAX_ADDED
            },
            expectedOutput: {
                taxFree: 50_000,
                taxAdded: 60_000
            }
        });

        calculate({
            input: {
                price: 100_000,
                vehicleType: VehicleType.MOTORCYCLE,
                vehicleEngineVolume: VehicleEngineVolume.MOTORCYCLE__251_UP
            },
            options: {
                mode: Mode.TAX_FREE_TO_TAX_ADDED
            },
            expectedOutput: {
                taxFree: 100_000,
                taxAdded: 164_400
            }
        });

        calculate({
            input: {
                price: 1_020_000,
                vehicleType: VehicleType.AUTOMOBILE,
                vehicleEngineVolume: VehicleEngineVolume.AUTOMOBILE__0_1400
            },
            options: {
                mode: Mode.TAX_ADDED_TO_TAX_FREE
            },
            expectedOutput: {
                taxFree: 472_222.23,
                taxAdded: 1_020_000
            }
        });

        calculate({
            input: {
                price: 1_470_000,
                vehicleType: VehicleType.AUTOMOBILE,
                vehicleEngineVolume: VehicleEngineVolume.AUTOMOBILE__0_1400
            },
            options: {
                mode: Mode.TAX_ADDED_TO_TAX_FREE
            },
            expectedOutput: {
                taxFree: 644_736.84,
                taxAdded: 1_470_000
            }
        });

        calculate({
            input: {
                price: 1_500_000,
                vehicleType: VehicleType.ELECTRIC_AUTOMOBILE,
                vehicleEngineVolume: VehicleEngineVolume.ELECTRIC_AUTOMOBILE__0_160
            },
            options: {
                mode: Mode.TAX_ADDED_TO_TAX_FREE
            },
            expectedOutput: {
                taxFree: 1_000_000,
                taxAdded: 1_500_000
            }
        });

        calculate({
            input: {
                price: 60_000,
                vehicleType: VehicleType.MOTORCYCLE,
                vehicleEngineVolume: VehicleEngineVolume.MOTORCYCLE__0_250
            },
            options: {
                mode: Mode.TAX_ADDED_TO_TAX_FREE
            },
            expectedOutput: {
                taxFree: 50_000,
                taxAdded: 60_000
            }
        });

        calculate({
            input: {
                price: 164_400,
                vehicleType: VehicleType.MOTORCYCLE,
                vehicleEngineVolume: VehicleEngineVolume.MOTORCYCLE__251_UP
            },
            options: {
                mode: Mode.TAX_ADDED_TO_TAX_FREE
            },
            expectedOutput: {
                taxFree: 100_000,
                taxAdded: 164_400
            }
        });

        calculate({
            input: {
                price: 1_890_000,
                vehicleType: VehicleType.AUTOMOBILE,
                vehicleEngineVolume: VehicleEngineVolume.AUTOMOBILE__0_1400
            },
            options: {
                mode: Mode.TAX_ADDED_TO_TAX_FREE
            },
            expectedOutput: {
                taxFree: 828_947.37,
                taxAdded: 1_890_000
            }
        });

        calculate({
            input: {
                price: 800_000,
                vehicleType: VehicleType.HYBRID_AUTOMOBILE,
                vehicleEngineVolume: VehicleEngineVolume.HYBRID_AUTOMOBILE__50_UP_0_1800
            },
            options: {
                mode: Mode.TAX_FREE_TO_TAX_ADDED
            },
            expectedOutput: {
                taxFree: 800_000,
                taxAdded: 1_632_000
            }
        });

        calculate({
            input: {
                price: 500_000,
                vehicleType: VehicleType.BUS,
                vehicleEngineVolume: null
            },
            options: {
                mode: Mode.TAX_FREE_TO_TAX_ADDED
            },
            expectedOutput: {
                taxFree: 500_000,
                taxAdded: 606_000
            }
        });

        calculate({
            input: {
                price: 10_000_000,
                vehicleType: VehicleType.PLANE,
                vehicleEngineVolume: null
            },
            options: {
                mode: Mode.TAX_FREE_TO_TAX_ADDED
            },
            expectedOutput: {
                taxFree: 10_000_000,
                taxAdded: 12_060_000
            }
        });

        calculate({
            input: {
                price: 606_000,
                vehicleType: VehicleType.BUS,
                vehicleEngineVolume: null
            },
            options: {
                mode: Mode.TAX_ADDED_TO_TAX_FREE
            },
            expectedOutput: {
                taxFree: 500_000,
                taxAdded: 606_000
            }
        });
    });
});
