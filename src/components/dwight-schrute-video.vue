<template>
    <video
        ref="videoEl"
        :autoplay="true"
        :loop="true"
        :muted="true"
        :playsinline="true"
        aria-hidden="true"
        class="dwight-schrute-video"
        width="455"
        height="256"
        preload="auto">
        <source
            :src="SRC"
            type="video/mp4" />
    </video>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_video } from "@/types/html.js";

export type Props = /* @vue-ignore */ Partial<HtmlAttrs_video>;

defineProps<Props>();

const videoEl = useTemplateRef<HTMLVideoElement>("videoEl");

const SRC = staticUrl("/dwight-schrute.mp4").href;

onMounted(() => {
    if (videoEl.value && globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        videoEl.value.autoplay = false;
        videoEl.value.controls = true;
        videoEl.value.pause();
    }
});
</script>

<style lang="scss" scoped>
.dwight-schrute-video {
    display: inline-block;
    overflow: hidden;
    @include vh-squircle(var(--vh-br-normal));
    background: hsla(var(--vh-clr-white-hsl), .08);
    aspect-ratio: 455/256
}
</style>
