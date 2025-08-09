import type { Form, Prices } from "@/domains/gumruk-vergisi/types.js";
import { describe, expect, it } from "vitest";
import { Calculator } from "@/domains/gumruk-vergisi/calculator.js";

type CalculateParams = {
    input: Partial<Omit<Form, "currency">>;
    expectedOutput: Prices;
};

const BASE_INPUT = {
    price: 1_000,
    isOverTaxExemptionWeightLimit: false,
    isOverTaxExemptionPriceLimit: false,
    isPrintedOnly: false,
    isSpecialConsumptionTaxed: false,
    isFromEU: false,
    isShippingIncluded: false,
    extraCustomTaxPercent: 0
};

const calculate = ({ input, expectedOutput }: CalculateParams): void => {
    const calculator = new Calculator({
        ...BASE_INPUT,
        ...input,
        eurToTryCurrency: 1
    });
    const results = calculator.calculate();
    expect(results.prices).toStrictEqual(expectedOutput);
};

describe("domains/gumruk-vergisi/calculator.js", () => {
    it("calculates taxes correctly with given inputs", () => {
        calculate({
            input: {},
            expectedOutput: {
                taxFree: 1_000,
                taxAdded: 1_654.4
            }
        });

        calculate({
            input: {
                isShippingIncluded: true
            },
            expectedOutput: {
                taxFree: 1_000,
                taxAdded: 1_651.4
            }
        });

        calculate({
            input: {
                isSpecialConsumptionTaxed: true
            },
            expectedOutput: {
                taxFree: 1_000,
                taxAdded: 1_974.4
            }
        });

        calculate({
            input: {
                isFromEU: true
            },
            expectedOutput: {
                taxFree: 1_000,
                taxAdded: 1_354.4
            }
        });

        calculate({
            input: {
                isSpecialConsumptionTaxed: true,
                isFromEU: true
            },
            expectedOutput: {
                taxFree: 1_000,
                taxAdded: 1_614.4
            }
        });

        calculate({
            input: {
                isOverTaxExemptionWeightLimit: true
            },
            expectedOutput: {
                taxFree: 1_000,
                taxAdded: 2_134.4
            }
        });

        calculate({
            input: {
                isOverTaxExemptionWeightLimit: true,
                isSpecialConsumptionTaxed: true
            },
            expectedOutput: {
                taxFree: 1_000,
                taxAdded: 2_550.4
            }
        });

        calculate({
            input: {
                isOverTaxExemptionWeightLimit: true,
                isFromEU: true
            },
            expectedOutput: {
                taxFree: 1_000,
                taxAdded: 1_834.4
            }
        });

        calculate({
            input: {
                isOverTaxExemptionWeightLimit: true,
                isSpecialConsumptionTaxed: true,
                isFromEU: true
            },
            expectedOutput: {
                taxFree: 1_000,
                taxAdded: 2_190.4
            }
        });

        calculate({
            input: {
                isOverTaxExemptionPriceLimit: true
            },
            expectedOutput: {
                taxFree: 1_000,
                taxAdded: 2_134.4
            }
        });

        calculate({
            input: {
                isOverTaxExemptionPriceLimit: true,
                isSpecialConsumptionTaxed: true
            },
            expectedOutput: {
                taxFree: 1_000,
                taxAdded: 2_550.4
            }
        });

        calculate({
            input: {
                isOverTaxExemptionPriceLimit: true,
                isFromEU: true
            },
            expectedOutput: {
                taxFree: 1_000,
                taxAdded: 1_834.4
            }
        });

        calculate({
            input: {
                isOverTaxExemptionPriceLimit: true,
                isSpecialConsumptionTaxed: true,
                isFromEU: true
            },
            expectedOutput: {
                taxFree: 1_000,
                taxAdded: 2_190.4
            }
        });

        calculate({
            input: {
                extraCustomTaxPercent: 50
            },
            expectedOutput: {
                taxFree: 1_000,
                taxAdded: 2_154.4
            }
        });
    });
});
