import { mount } from "@vue/test-utils";
import type { Mock } from "vitest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import OsitaIhemeVideo from "@/components/osita-iheme-video.vue";

describe("components/osita-iheme-video.vue", () => {
    let matchMediaMock: Mock;

    beforeEach(() => {
        matchMediaMock = vi.fn((query: string) => ({
            matches: query === "(prefers-reduced-motion: reduce)"
        }));
        window.matchMedia = matchMediaMock;
    });

    it("renders `<video />` with correct attrs", () => {
        // Just to ignore `Not implemented: HTMLMediaElement.prototype.pause`
        matchMediaMock.mockReturnValueOnce({ matches: false });

        const wrapper = mount(OsitaIhemeVideo);

        const video = wrapper.find("video");
        expect(video.exists()).toBeTruthy();
        expect(video.element.autoplay).toBeTruthy();
        expect(video.element.loop).toBeTruthy();
        expect(video.element.muted).toBeTruthy();
        expect(video.element.playsInline).toBeTruthy();
        expect(video.element.preload).toBe("auto");
        expect(video.attributes("aria-hidden")).toBe("true");
        expect(video.attributes("width")).toBeDefined();
        expect(video.attributes("height")).toBeDefined();

        const videoSource = wrapper.find("source");
        expect(videoSource.exists()).toBeTruthy();
        expect(videoSource.attributes("src")).toBeDefined();
        expect(videoSource.attributes("type")).toBeDefined();
    });

    it("disables `autoplay`, enables `controls` and pauses video when `prefers-reduced-motion` is `reduce`", async () => {
        matchMediaMock.mockReturnValueOnce({ matches: true });

        const pauseMock = vi.fn();
        HTMLVideoElement.prototype.pause = pauseMock;

        const wrapper = mount(OsitaIhemeVideo);
        const video = wrapper.find("video").element as HTMLVideoElement;

        await wrapper.vm.$nextTick();

        expect(video.autoplay).toBeFalsy();
        expect(video.controls).toBeTruthy();
        expect(pauseMock).toHaveBeenCalledTimes(1);
    });
});
