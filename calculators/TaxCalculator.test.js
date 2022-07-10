// noinspection JSUnresolvedFunction

import TaxCalculator from "@/calculators/TaxCalculator.js";
import { toHaveBeenCalledBefore } from "jest-extended";

expect.extend({ toHaveBeenCalledBefore });

describe("calculators/MultiCurrencyTaxCalculator", () => {
    const func1 = jest.fn();
    const func2 = jest.fn();
    const func3 = jest.fn();

    const functionsToCall = [
        func1,
        func2,
        func3
    ];

    class MockTaxCalculator extends TaxCalculator {
    }

    const calculator = new MockTaxCalculator();

    it("should call given functions in order", () => {
        calculator.callInOrder(functionsToCall);

        functionsToCall.forEach(func => expect(func).toBeCalled());

        expect(func1).toHaveBeenCalledBefore(func2, false);
        expect(func2).toHaveBeenCalledBefore(func3, false);
    });

    it("should call given functions in reverse order", () => {
        calculator.callInReverseOrder(functionsToCall);

        functionsToCall.forEach(func => expect(func).toBeCalled());

        expect(func2).toHaveBeenCalledBefore(func3, false);
        expect(func1).toHaveBeenCalledBefore(func2, false);
    });
});
