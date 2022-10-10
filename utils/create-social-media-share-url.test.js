import {
    createEmailShareUrl,
    createFacebookShareUrl,
    createRedditShareUrl,
    createTelegramShareUrl,
    createTwitterShareUrl,
    createWhatsAppShareUrl
} from "@/utils/create-social-media-share-url.js";

describe("utils/create-social-media-share-url", () => {
    const url = "https://vergihesaplayici.com";
    const title = "Vergi Hesaplayıcı";

    describe("createFacebookShareUrl", () => {
        it("should return a valid Facebook share URL", () => {
            const result = createFacebookShareUrl(url, title);
            expect(result).toBe(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
        });
    });

    describe("createTwitterShareUrl", () => {
        it("should return a valid Twitter share URL", () => {
            const result = createTwitterShareUrl(url, title);
            expect(result).toBe(`https://twitter.com/intent/tweet?url=${url}&text=${title}`);
        });
    });

    describe("createWhatsAppShareUrl", () => {
        it("should return a valid WhatsApp share URL", () => {
            const result = createWhatsAppShareUrl(url, title);
            expect(result).toBe(`https://wa.me/?text=${url}`);
        });
    });

    describe("createTelegramShareUrl", () => {
        it("should return a valid Telegram share URL", () => {
            const result = createTelegramShareUrl(url, title);
            expect(result).toBe(`https://telegram.me/share/url?url=${url}&text=${title}`);
        });
    });

    describe("createRedditShareUrl", () => {
        it("should return a valid Reddit share URL", () => {
            const result = createRedditShareUrl(url, title);
            expect(result).toBe(`https://www.reddit.com/submit?url=${url}&title=${title}`);
        });
    });

    describe("createEmailShareUrl", () => {
        it("should return a valid e-mail share URL", () => {
            const result = createEmailShareUrl(url, title);
            expect(result).toBe(`mailto:?subject=${title}&body=${url}`);
        });
    });
});
