<template>
    <div
        :aria-hidden="isVisible ? 'false' : 'true'"
        class="go-to-calculator-button">
        <container>
            <form-button
                @click="scrollToForm()"
                class="w-100"
                scale="small">
                Hesaplayıcıya dön
            </form-button>
        </container>
    </div>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_div } from "@/types/html.js";

const MD_BREAKPOINT_MAX_WIDTH_IN_PIXELS = 800;
const VISIBLE_THRESHOLD_RATIO = .75;
// oxlint-disable-next-line no-magic-numbers
const OBSERVER_THRESHOLDS = [0, .75, 1];

export type Props = {
    calculatorContainer: HTMLElement;
    resultsContainer: HTMLElement;
} &/* @vue-ignore */ Partial<HtmlAttrs_div>;

const props = defineProps<Props>();

const isVisible = ref<boolean>(false);

let intersectionObserver: IntersectionObserver;
let resizeObserver: ResizeObserver;

const scrollToForm = (): void => {
    props.calculatorContainer.scrollIntoView({ block: "center", behavior: "smooth" });
};

const _updateObserverBasedOnResolution = (): void => {
    const isDownMdResolution = globalThis.matchMedia(`(max-width:${MD_BREAKPOINT_MAX_WIDTH_IN_PIXELS}px)`).matches;
    if (isDownMdResolution) {
        intersectionObserver.observe(props.resultsContainer);
    } else {
        isVisible.value = false;
        intersectionObserver.disconnect();
    }
};

const _setupObservers = (): void => {
    intersectionObserver = new IntersectionObserver(
        ([entry]: IntersectionObserverEntry[]) => {
            // oxlint-disable-next-line no-non-null-assertion
            isVisible.value = entry!.intersectionRatio >= VISIBLE_THRESHOLD_RATIO;
        },
        { threshold: OBSERVER_THRESHOLDS }
    );
    resizeObserver = new ResizeObserver(_updateObserverBasedOnResolution);
};

const _destroyObservers = (): void => {
    intersectionObserver?.disconnect();
    resizeObserver?.disconnect();
};

watch(() => props.resultsContainer, () => {
    if (!props.resultsContainer) return;

    if (!intersectionObserver || !resizeObserver) {
        _setupObservers();
        _updateObserverBasedOnResolution();
        resizeObserver.observe(props.resultsContainer);
    }
});

onUnmounted(_destroyObservers);
</script>

<style lang="scss" scoped>
.go-to-calculator-button {
    @include vh-media-breakpoint-up(md) {
        display: none
    }
    @include vh-media-breakpoint-down(md) {
        --_padding-block: calc(var(--vh-spacer) * .75);
        position: fixed;
        z-index: 10;
        display: block;
        transition: vh-transition(transform visibility, var(--vh-duration-longer));
        transform: translateY(100%);
        visibility: hidden;
        pointer-events: none;
        padding-block-start: var(--_padding-block);
        padding-block-end: max(env(safe-area-inset-bottom), var(--_padding-block));
        inset-inline: 0;
        inset-block-end: 0;
        inline-size: 100%;
        &::after {
            position: absolute;
            z-index: -1;
            content: "";
            inset: 0;
            mask: linear-gradient(to top, #000 50%, transparent);
            @include vh-backdrop-filter(blur(.5rem)) {
                background: var(--vh-clr-body-bg)
            }
        }
        &[aria-hidden="false"] {
            transform: translateY(0);
            visibility: visible;
            pointer-events: all;
            button {
                transform: translateY(0);
                opacity: 1
            }
        }
        button {
            transition: vh-transition(transform opacity, var(--vh-duration-long), var(--vh-timing-spring));
            transition-delay: .15s;
            transform: translateY(calc(100% + (var(--_padding-block) * 2)));
            opacity: 0
        }
    }
}
</style>
