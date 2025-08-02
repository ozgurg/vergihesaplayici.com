import type { Form, Prices } from "@/domains/telefon-vergisi-hesaplayici/types.js";
import { Registration } from "@/domains/telefon-vergisi-hesaplayici/types.js";
import { describe, expect, it } from "vitest";
import { Calculator } from "@/domains/telefon-vergisi-hesaplayici/calculator.js";

type CalculateParams = {
    input: Omit<Form, "currency">;
    options: {
        calculateFromTaxAddedPrice: boolean;
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
        // Registration.IMPORT | calculateFromTaxAddedPrice: false
        calculate({
            input: {
                price: 500,
                registration: Registration.IMPORT
            },
            options: {
                calculateFromTaxAddedPrice: false
            },
            expectedOutput: {
                taxFree: 500,
                taxAdded: 848.4
            }
        });
        calculate({
            input: {
                price: 1_500,
                registration: Registration.IMPORT
            },
            options: {
                calculateFromTaxAddedPrice: false
            },
            expectedOutput: {
                taxFree: 1_500,
                taxAdded: 3_054.24
            }
        });
        calculate({
            input: {
                price: 5_000,
                registration: Registration.IMPORT
            },
            options: {
                calculateFromTaxAddedPrice: false
            },
            expectedOutput: {
                taxFree: 5_000,
                taxAdded: 10_180.8
            }
        });


        // Registration.IMPORT | calculateFromTaxAddedPrice: true
        calculate({
            input: {
                price: 500,
                registration: Registration.IMPORT
            },
            options: {
                calculateFromTaxAddedPrice: true
            },
            expectedOutput: {
                taxFree: 294.67,
                taxAdded: 500
            }
        });
        calculate({
            input: {
                price: 1_500,
                registration: Registration.IMPORT
            },
            options: {
                calculateFromTaxAddedPrice: true
            },
            expectedOutput: {
                taxFree: 789.3,
                taxAdded: 1_500
            }
        });
        calculate({
            input: {
                price: 5_000,
                registration: Registration.IMPORT
            },
            options: {
                calculateFromTaxAddedPrice: true
            },
            expectedOutput: {
                taxFree: 2_455.61,
                taxAdded: 5_000
            }
        });


        // Registration.PASSPORT | calculateFromTaxAddedPrice: false
        calculate({
            input: {
                price: 500,
                registration: Registration.PASSPORT
            },
            options: {
                calculateFromTaxAddedPrice: false
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
                calculateFromTaxAddedPrice: false
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
                calculateFromTaxAddedPrice: false
            },
            expectedOutput: {
                taxFree: 5_000,
                taxAdded: 50_634
            }
        });


        // Registration.PASSPORT | calculateFromTaxAddedPrice: true
        calculate({
            input: {
                price: 500,
                registration: Registration.PASSPORT
            },
            options: {
                calculateFromTaxAddedPrice: true
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
                calculateFromTaxAddedPrice: true
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
                calculateFromTaxAddedPrice: true
            },
            expectedOutput: {
                taxFree: -40_634,
                taxAdded: 5_000
            }
        });
    });
});
