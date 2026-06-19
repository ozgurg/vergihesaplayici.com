<template>
    <component
        :is="props.tag"
        class="string-carousel">
        <div class="inner">
            <transition-group
                name="list-transition"
                tag="div"
                inert=""
                aria-hidden="true"
                class="wrapper">
                <template v-for="(_char, _index) in chars" :key="Math.random()">
                    <span :style="{'--index': _index}">
                        {{ _char === " " ? "\u00A0" : _char }}
                    </span>
                </template>
            </transition-group>
            <div class="text-overlay">
                {{ props.text }}
            </div>
        </div>
    </component>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_div } from "@/types/html.js";

export type Props = {
    tag?: string;
    text: string | number;
} & /* @vue-ignore */ Partial<HtmlAttrs_div>;

const props = withDefaults(defineProps<Props>(), {
    tag: "div"
});

const chars = computed<string[]>(() => [...String(props.text)]);
</script>

<style lang="scss" scoped>
.string-carousel {
    --string-carousel-block-size: var(--_block-size);
    --string-carousel-duration: var(--_duration);
    --_block-size: 1.125em;
    --_duration: var(--duration, var(--vh-duration-longer));
    display: inline-flex;
    .inner {
        position: relative;
        display: inline-flex
    }
    .wrapper {
        position: relative;
        z-index: 1;
        line-height: var(--_block-size);
        display: inline-flex;
        overflow: hidden;
        flex-flow: row wrap;
        block-size: var(--_block-size);
        pointer-events: none; // Disable interaction with animated chars
        user-select: none; // Prevent selection of individual `<span />`s
        span {
            will-change: transform, opacity;
            user-select: none // Explicitly disable selection
        }
    }
    .text-overlay {
        position: absolute;
        z-index: 2;
        inset: 0;
        block-size: 100%;
        inline-size: 100%;
        color: transparent;
        user-select: text;
        cursor: text;
        line-height: var(--_block-size);
        font: inherit;
        white-space: nowrap
    }
}

.list-transition {
    &-leave-active {
        display: none
    }
    &-enter-active {
        transition: vh-transition(transform opacity, var(--vh-duration-longer), var(--vh-timing-spring));
        transition-delay: calc(var(--index) * 10ms)
    }
    &-enter-from {
        transform: translateY(-100%) scale(0);
        opacity: 0
    }
    &-leave-to {
        transform: translateY(100%) scale(0);
        opacity: 0
    }
}
</style>
