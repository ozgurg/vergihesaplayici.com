import type { Form, Mode, Prices } from "@/domains/konsol-vergisi-hesaplayici/types.js";
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
    it(`input: ${JSON.stringify(input)}, options: ${JSON.stringify(options)}, expectedOutput: ${JSON.stringify(expectedOutput)}`, () => {
        const calculator = new Calculator(input, options);
        const results = calculator.calculate();
        expect(results.prices).toStrictEqual(expectedOutput);
    });
};

describe("domains/konsol-vergisi-hesaplayici/calculator.js", () => {
    calculate({
        input: {
            price: 300
        },
        options: {
            mode: "tax-free-to-tax-added"
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
            mode: "tax-free-to-tax-added"
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
            mode: "tax-free-to-tax-added"
        },
        expectedOutput: {
            taxFree: 500,
            taxAdded: 864
        }
    });

    calculate({
        input: {
            price: 300
        },
        options: {
            mode: "tax-added-to-tax-free"
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
            mode: "tax-added-to-tax-free"
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
            mode: "tax-added-to-tax-free"
        },
        expectedOutput: {
            taxFree: 289.35,
            taxAdded: 500
        }
    });
});
