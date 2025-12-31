import type { Form, Mode, Prices } from "@/domains/telefon-vergisi-hesaplayici/types.js";
import { describe, expect, it } from "vitest";
import { Calculator } from "@/domains/telefon-vergisi-hesaplayici/calculator.js";

type CalculateParams = {
    input: Omit<Form, "mode" | "currency">;
    options: {
        mode: Mode;
    };
    expectedOutput: Prices;
};

const calculate = ({ input, options, expectedOutput }: CalculateParams): void => {
    it(`input: ${JSON.stringify(input)}, options: ${JSON.stringify(options)}, expectedOutput: ${JSON.stringify(expectedOutput)}`, () => {
        const calculator = new Calculator({
            ...input,
            eurToTryCurrency: 1
        }, options);
        const results = calculator.calculate();
        expect(results.prices).toStrictEqual(expectedOutput);
    });
};

describe("domains/telefon-vergisi-hesaplayici/calculator.js", () => {
    calculate({
        input: {
            price: 500,
            registration: "import"
        },
        options: {
            mode: "tax-free-to-tax-added"
        },
        expectedOutput: {
            taxFree: 500,
            taxAdded: 850.08
        }
    });
    calculate({
        input: {
            price: 1_500,
            registration: "import"
        },
        options: {
            mode: "tax-free-to-tax-added"
        },
        expectedOutput: {
            taxFree: 1_500,
            taxAdded: 2_550.24
        }
    });
    calculate({
        input: {
            price: 5_000,
            registration: "import"
        },
        options: {
            mode: "tax-free-to-tax-added"
        },
        expectedOutput: {
            taxFree: 5_000,
            taxAdded: 9_520.9
        }
    });

    calculate({
        input: {
            price: 500,
            registration: "import"
        },
        options: {
            mode: "tax-added-to-tax-free"
        },
        expectedOutput: {
            taxFree: 294.08,
            taxAdded: 500
        }
    });
    calculate({
        input: {
            price: 1_500,
            registration: "import"
        },
        options: {
            mode: "tax-added-to-tax-free"
        },
        expectedOutput: {
            taxFree: 882.27,
            taxAdded: 1_500
        }
    });
    calculate({
        input: {
            price: 5_000,
            registration: "import"
        },
        options: {
            mode: "tax-added-to-tax-free"
        },
        expectedOutput: {
            taxFree: 2_940.9,
            taxAdded: 5_000
        }
    });

    calculate({
        input: {
            price: 500,
            registration: "passport"
        },
        options: {
            mode: "tax-free-to-tax-added"
        },
        expectedOutput: {
            taxFree: 500,
            taxAdded: 54_778
        }
    });
    calculate({
        input: {
            price: 1_500,
            registration: "passport"
        },
        options: {
            mode: "tax-free-to-tax-added"
        },
        expectedOutput: {
            taxFree: 1_500,
            taxAdded: 55_778
        }
    });
    calculate({
        input: {
            price: 5_000,
            registration: "passport"
        },
        options: {
            mode: "tax-free-to-tax-added"
        },
        expectedOutput: {
            taxFree: 5_000,
            taxAdded: 59_278
        }
    });

    calculate({
        input: {
            price: 500,
            registration: "passport"
        },
        options: {
            mode: "tax-added-to-tax-free"
        },
        expectedOutput: {
            taxFree: -53_778,
            taxAdded: 500
        }
    });
    calculate({
        input: {
            price: 1_500,
            registration: "passport"
        },
        options: {
            mode: "tax-added-to-tax-free"
        },
        expectedOutput: {
            taxFree: -52_778,
            taxAdded: 1_500
        }
    });
    calculate({
        input: {
            price: 5_000,
            registration: "passport"
        },
        options: {
            mode: "tax-added-to-tax-free"
        },
        expectedOutput: {
            taxFree: -49_278,
            taxAdded: 5_000
        }
    });
    calculate({
        input: {
            price: 50_000,
            registration: "import"
        },
        options: {
            mode: "tax-added-to-tax-free"
        },
        expectedOutput: {
            taxFree: 24_507.49,
            taxAdded: 50_000
        }
    });
});
