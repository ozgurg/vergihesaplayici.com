import { createShareUrlOfCalculator } from "@/utils/create-share-url-of-calculator.js";

describe("utils/create-share-url-of-calculator", () => {
    global.process = {
        env: {
            APP_URL: "https://vergihesaplayici.com"
        }
    };

    const calculatorPath = "/calculator";
    const params = {
        price: 100,
        currency: "USD"
    };

    it("should return a share URL of calculator with its params", () => {
        const url = createShareUrlOfCalculator(
            calculatorPath,
            params,
            true
        );
        expect(url).toBe("https://vergihesaplayici.com/calculator?price=100&currency=USD");
    });

    it("should return a share URL of calculator without its params", () => {
        const url = createShareUrlOfCalculator(
            calculatorPath,
            params,
            false
        );
        expect(url).toBe("https://vergihesaplayici.com/calculator");
    });
});
