import type { Form, Prices } from "@/domains/konsol-vergisi-hesaplayici/types.js";
import { Mode } from "@/domains/konsol-vergisi-hesaplayici/types.js";
import { describe, expect, it } from "vitest";
import { Calculator } from "@/domains/konsol-vergisi-hesaplayici/calculator.js";

type CalculateParams = {
    input: Omit<Form, "mode" | "currency">;
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

describe("domains/konsol-vergisi-hesaplayici/calculator.js", () => {
    it("calculates taxes correctly with given inputs", () => {
        // Mode.TAX_FREE_TO_TAX_ADDED
        calculate({
            input: {
                price: 300
            },
            options: {
                mode: Mode.TAX_FREE_TO_TAX_ADDED
            },
            expectedOutput: {
                taxFree: 300,
                taxAdded: 518.4
            }
        });
        calculate({
            input: {
                price: 400
            },
            options: {
                mode: Mode.TAX_FREE_TO_TAX_ADDED
            },
            expectedOutput: {
                taxFree: 400,
                taxAdded: 691.2
            }
        });
        calculate({
            input: {
                price: 500
            },
            options: {
                mode: Mode.TAX_FREE_TO_TAX_ADDED
            },
            expectedOutput: {
                taxFree: 500,
                taxAdded: 864
            }
        });


        // Mode.TAX_ADDED_TO_TAX_FREE
        calculate({
            input: {
                price: 300
            },
            options: {
                mode: Mode.TAX_ADDED_TO_TAX_FREE
            },
            expectedOutput: {
                taxFree: 173.61,
                taxAdded: 300
            }
        });
        calculate({
            input: {
                price: 400
            },
            options: {
                mode: Mode.TAX_ADDED_TO_TAX_FREE
            },
            expectedOutput: {
                taxFree: 231.48,
                taxAdded: 400
            }
        });
        calculate({
            input: {
                price: 500
            },
            options: {
                mode: Mode.TAX_ADDED_TO_TAX_FREE
            },
            expectedOutput: {
                taxFree: 289.35,
                taxAdded: 500
            }
        });
    });
});
