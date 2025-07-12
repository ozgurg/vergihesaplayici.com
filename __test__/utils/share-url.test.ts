import { describe, expect, it } from "vitest";
import {
    createFacebookShareUrl,
    createRedditShareUrl,
    createTelegramShareUrl,
    createWhatsAppShareUrl,
    createXShareUrl
} from "@/utils/share-url.js";

describe("utils/share-url.js", () => {
    const testUrl = new URL("https://vergihesaplayici.com.com/page?param=value#hash");

    describe("createFacebookShareUrl", () => {
        it("creates correct Facebook share URL", () => {
            const result = createFacebookShareUrl(testUrl);
            expect(result.toString()).toBe(
                "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fvergihesaplayici.com.com%2Fpage%3Fparam%3Dvalue%23hash"
            );
        });
    });

    describe("createXShareUrl", () => {
        it("creates correct X (Twitter) share URL", () => {
            const result = createXShareUrl(testUrl);
            expect(result.toString()).toBe(
                "https://x.com/intent/tweet?url=https%3A%2F%2Fvergihesaplayici.com.com%2Fpage%3Fparam%3Dvalue%23hash"
            );
        });
    });

    describe("createWhatsAppShareUrl", () => {
        it("creates correct WhatsApp share URL", () => {
            const result = createWhatsAppShareUrl(testUrl);
            expect(result.toString()).toBe(
                "https://wa.me/?text=https%3A%2F%2Fvergihesaplayici.com.com%2Fpage%3Fparam%3Dvalue%23hash"
            );
        });
    });

    describe("createTelegramShareUrl", () => {
        it("creates correct Telegram share URL", () => {
            const result = createTelegramShareUrl(testUrl);
            expect(result.toString()).toBe(
                "https://telegram.me/share/url?url=https%3A%2F%2Fvergihesaplayici.com.com%2Fpage%3Fparam%3Dvalue%23hash"
            );
        });
    });

    describe("createRedditShareUrl", () => {
        it("creates correct Reddit share URL", () => {
            const result = createRedditShareUrl(testUrl);
            expect(result.toString()).toBe(
                "https://www.reddit.com/submit?url=https%3A%2F%2Fvergihesaplayici.com.com%2Fpage%3Fparam%3Dvalue%23hash"
            );
        });
    });
});
