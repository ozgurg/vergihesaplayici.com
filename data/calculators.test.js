import calculators from "@/data/calculators";
import { matchers } from "jest-json-schema";

expect.extend(matchers);

// This can be done TypeScript 😁
describe("data/calculators", () => {
    const schema = {
        properties: {
            icon: { type: "string" },
            title: { type: "string" },
            subtitle: { type: "string" },
            url: { type: "string" },
            description: { type: "string" }
        },
        required: ["icon", "title", "subtitle", "url", "description"]
    };

    it("should match schema", () => {
        Object.entries(calculators).forEach(app => {
            expect(app).toMatchSchema(schema);
        });
    });
});
