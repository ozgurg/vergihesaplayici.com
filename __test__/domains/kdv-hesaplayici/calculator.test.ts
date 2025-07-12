import { describe, expect, it } from "vitest";
import type { Prices } from "@/domains/kdv-hesaplayici/types.js";
import { Mode } from "@/domains/kdv-hesaplayici/types.js";
import { Calculator } from "@/domains/kdv-hesaplayici/calculator.js";

type CalculateParams = {
    input: {
        mode: Mode;
        price: number;
        rate: number;
    };
    expectedOutput: Prices;
};

const calculate = ({ input, expectedOutput }: CalculateParams): void => {
    const calculator = new Calculator(input);
    const results = calculator.calculate();
    expect(results.prices).toStrictEqual(expectedOutput);
};

describe("domains/kdv-hesaplayici/calculator.js", () => {
    it("calculates taxes correctly with given inputs", () => {
        // Mode.TAX_FREE_TO_TAX_ADDED
        calculate({
            input: {
                mode: Mode.TAX_FREE_TO_TAX_ADDED,
                price: 100,
                rate: 15
            },
            expectedOutput: {
                taxFree: 100,
                taxAdded: 115
            }
        });
        calculate({
            input: {
                mode: Mode.TAX_FREE_TO_TAX_ADDED,
                price: 250,
                rate: 18
            }, expectedOutput: {
                taxFree: 250,
                taxAdded: 295
            }
        });
        calculate({
            input: {
                mode: Mode.TAX_FREE_TO_TAX_ADDED,
                price: 448,
                rate: 25
            }, expectedOutput: {
                taxFree: 448,
                taxAdded: 560
            }
        });


        // Mode.TAX_ADDED_TO_TAX_FREE
        calculate({
            input: {
                mode: Mode.TAX_ADDED_TO_TAX_FREE,
                price: 100,
                rate: 15
            }, expectedOutput: {
                taxFree: 86.96,
                taxAdded: 100
            }
        });
        calculate({
            input: {
                mode: Mode.TAX_ADDED_TO_TAX_FREE,
                price: 250,
                rate: 18
            }, expectedOutput: {
                taxFree: 211.86,
                taxAdded: 250
            }
        });
        calculate({
            input: {
                mode: Mode.TAX_ADDED_TO_TAX_FREE,
                price: 448,
                rate: 25
            }, expectedOutput: {
                taxFree: 358.4,
                taxAdded: 448
            }
        });


        // Mode.TAX_TO_TAX_BASE
        calculate({
            input: {
                mode: Mode.TAX_TO_TAX_BASE,
                price: 100,
                rate: 15
            }, expectedOutput: {
                taxFree: 666.67,
                taxAdded: 766.67
            }
        });
        calculate({
            input: {
                mode: Mode.TAX_TO_TAX_BASE,
                price: 250,
                rate: 18
            }, expectedOutput: {
                taxFree: 1_388.89,
                taxAdded: 1_638.89
            }
        });
        calculate({
            input: {
                mode: Mode.TAX_TO_TAX_BASE,
                price: 448,
                rate: 25
            }, expectedOutput: {
                taxFree: 1_792,
                taxAdded: 2_240
            }
        });
    });
});
