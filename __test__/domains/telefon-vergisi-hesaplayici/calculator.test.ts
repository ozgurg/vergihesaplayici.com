import type { Form, Prices } from "@/domains/telefon-vergisi-hesaplayici/types.js";
import { Mode, Registration } from "@/domains/telefon-vergisi-hesaplayici/types.js";
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
    const calculator = new Calculator({
        ...input,
        eurToTryCurrency: 1
    }, options);
    const results = calculator.calculate();
    expect(results.prices).toStrictEqual(expectedOutput);
};

describe("domains/telefon-vergisi-hesaplayici/calculator.js", () => {
    it("calculates taxes correctly with given inputs", () => {
        // Registration.IMPORT | Mode.TAX_FREE_TO_TAX_ADDED
        calculate({
            input: {
                price: 500,
                registration: Registration.IMPORT
            },
            options: {
                mode: Mode.TAX_FREE_TO_TAX_ADDED
            },
            expectedOutput: {
                taxFree: 500,
                taxAdded: 850.08
            }
        });
        calculate({
            input: {
                price: 1_500,
                registration: Registration.IMPORT
            },
            options: {
                mode: Mode.TAX_FREE_TO_TAX_ADDED
            },
            expectedOutput: {
                taxFree: 1_500,
                taxAdded: 2_550.24
            }
        });
        calculate({
            input: {
                price: 5_000,
                registration: Registration.IMPORT
            },
            options: {
                mode: Mode.TAX_FREE_TO_TAX_ADDED
            },
            expectedOutput: {
                taxFree: 5_000,
                taxAdded: 9_520.9
            }
        });


        // Registration.IMPORT | Mode.TAX_ADDED_TO_TAX_FREE
        calculate({
            input: {
                price: 500,
                registration: Registration.IMPORT
            },
            options: {
                mode: Mode.TAX_ADDED_TO_TAX_FREE
            },
            expectedOutput: {
                taxFree: 294.08,
                taxAdded: 500
            }
        });
        calculate({
            input: {
                price: 1_500,
                registration: Registration.IMPORT
            },
            options: {
                mode: Mode.TAX_ADDED_TO_TAX_FREE
            },
            expectedOutput: {
                taxFree: 882.27,
                taxAdded: 1_500
            }
        });
        calculate({
            input: {
                price: 5_000,
                registration: Registration.IMPORT
            },
            options: {
                mode: Mode.TAX_ADDED_TO_TAX_FREE
            },
            expectedOutput: {
                taxFree: 2_940.9,
                taxAdded: 5_000
            }
        });


        // Registration.PASSPORT | Mode.TAX_FREE_TO_TAX_ADDED
        calculate({
            input: {
                price: 500,
                registration: Registration.PASSPORT
            },
            options: {
                mode: Mode.TAX_FREE_TO_TAX_ADDED
            },
            expectedOutput: {
                taxFree: 500,
                taxAdded: 46_134
            }
        });
        calculate({
            input: {
                price: 1_500,
                registration: Registration.PASSPORT
            },
            options: {
                mode: Mode.TAX_FREE_TO_TAX_ADDED
            },
            expectedOutput: {
                taxFree: 1_500,
                taxAdded: 47_134
            }
        });
        calculate({
            input: {
                price: 5_000,
                registration: Registration.PASSPORT
            },
            options: {
                mode: Mode.TAX_FREE_TO_TAX_ADDED
            },
            expectedOutput: {
                taxFree: 5_000,
                taxAdded: 50_634
            }
        });


        // Registration.PASSPORT | Mode.TAX_ADDED_TO_TAX_FREE
        calculate({
            input: {
                price: 500,
                registration: Registration.PASSPORT
            },
            options: {
                mode: Mode.TAX_ADDED_TO_TAX_FREE
            },
            expectedOutput: {
                taxFree: -45_134,
                taxAdded: 500
            }
        });
        calculate({
            input: {
                price: 1_500,
                registration: Registration.PASSPORT
            },
            options: {
                mode: Mode.TAX_ADDED_TO_TAX_FREE
            },
            expectedOutput: {
                taxFree: -44_134,
                taxAdded: 1_500
            }
        });
        calculate({
            input: {
                price: 5_000,
                registration: Registration.PASSPORT
            },
            options: {
                mode: Mode.TAX_ADDED_TO_TAX_FREE
            },
            expectedOutput: {
                taxFree: -40_634,
                taxAdded: 5_000
            }
        });
        calculate({
            input: {
                price: 50_000,
                registration: Registration.IMPORT
            },
            options: {
                mode: Mode.TAX_ADDED_TO_TAX_FREE
            },
            expectedOutput: {
                taxFree: 24_507.49,
                taxAdded: 50_000
            }
        });
    });
});
