import androidApps from "@/data/android-apps";
import { matchers } from "jest-json-schema";

expect.extend(matchers);

// This can be done TypeScript 😁
describe("data/android-apps", () => {
    const schema = {
        properties: {
            icon: { type: "string" },
            title: { type: "string" },
            url: { type: "string" }
        },
        required: ["icon", "title", "url"]
    };

    it("should match schema", () => {
        androidApps.forEach(app => {
            expect(app).toMatchSchema(schema);
        });
    });
});
