import { createShareUrlOfCalculator } from "@/utils/create-share-url-of-calculator";

describe("utils/create-share-url-of-calculator", () => {
    const baseUrl = "https://vergihesaplayici.com";
    const calculatorPath = "/calculator";
    const params = {
        price: 100,
        currency: "USD"
    };

    it("should return a share URL of calculator with its params", () => {
        const url = createShareUrlOfCalculator(
            {
                baseUrl,
                calculatorPath
            },
            params,
            true
        );
        expect(url).toBe("https://vergihesaplayici.com/calculator?price=100&currency=USD");
    });

    it("should return a share URL of calculator without its params", () => {
        const url = createShareUrlOfCalculator(
            {
                baseUrl,
                calculatorPath
            },
            params,
            false
        );
        expect(url).toBe("https://vergihesaplayici.com/calculator");
    });
});
