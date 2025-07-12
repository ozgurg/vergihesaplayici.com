<template>
    <div
        aria-valuemax="100"
        aria-valuemin="0"
        class="spinner"
        role="progressbar">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 45 45">
            <circle
                cx="50%"
                cy="50%"
                r="20" />
        </svg>
    </div>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_div } from "@/types/html.js";

export type Props = /* @vue-ignore */ Partial<HtmlAttrs_div>;

defineProps<Props>();
</script>

<style lang="scss" scoped>
.spinner {
    --_size: var(--size, calc(var(--vh-spacer) * 1.25));
    display: inline-block;
    flex: 0 0 var(--_size);
    inline-size: var(--_size);
    block-size: var(--_size);
    svg {
        transform: rotate(-90deg);
        transform-origin: center;
        animation: spinner-rotate 1.4s linear infinite;
        inline-size: 100%;
        block-size: 100%;
        circle {
            animation: spinner-dash 1.4s ease-in-out infinite;
            fill: transparent;
            stroke-width: 5;
            stroke-linecap: round;
            stroke: currentColor
        }
    }
    @keyframes spinner-dash {
        from {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0
        }
        50% {
            stroke-dasharray: 100, 200;
            stroke-dashoffset: -15px
        }
        to {
            stroke-dasharray: 100, 200;
            stroke-dashoffset: -124px
        }
    }
    @keyframes spinner-rotate {
        to {
            transform: rotate(270deg)
        }
    }
}
</style>
