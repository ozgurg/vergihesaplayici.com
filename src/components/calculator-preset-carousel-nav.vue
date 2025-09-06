<template>
    <!--
    Setting it initially as `disabled` prevents the
    flickering when the script is evaluated
    -->
    <button
        :aria-controls="props.ariaControls"
        :disabled="true"
        aria-label="Önceki sayfa"
        class="calculator-preset-carousel-nav calculator-preset-carousel-nav-prev"
        data-prev-button=""
        tabindex="-1"
        type="button">
        <span>
            <svg-icon :icon="icon_arrowLeft" />
        </span>
    </button>

    <button
        :aria-controls="props.ariaControls"
        aria-label="Sonraki sayfa"
        class="calculator-preset-carousel-nav calculator-preset-carousel-nav-next"
        data-next-button=""
        tabindex="-1"
        type="button">
        <span>
            <svg-icon :icon="icon_arrowRight" />
        </span>
    </button>
</template>

<script lang="ts" setup>
import { icon_arrowLeft, icon_arrowRight } from "@/utils/icons.js";

export type Props = {
    ariaControls: string;
};

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
.calculator-preset-carousel-nav {
    @include vh-touch {
        display: none
    }
    @include vh-hover {
        position: absolute;
        z-index: 2;
        @include vh-reset-button;
        text-align: center;
        transition: vh-transition(background-color, var(--vh-duration-short));
        inset-block: .25rem;
        @include vh-backdrop-filter(blur(1px));
        block-size: calc(100% - .5rem);
        inline-size: calc(var(--vh-spacer) * 4.5);
        &:not([disabled]) {
            &:hover {
                background-color: hsla(var(--vh-clr-white-hsl), .12)
            }
            &:active {
                background-color: hsla(var(--vh-clr-white-hsl), .24)
            }
        }
    }
    @include vh-js-disabled {
        display: none
    }
    span {
        display: inline-block;
        padding: calc(var(--vh-spacer) * .5);
        transition: vh-transition(opacity transform, var(--vh-duration-short));
        color: #000;
        border-radius: var(--vh-br-pill);
        background: #fff;
        box-shadow: 0 0 2rem var(--vh-clr-body-bg)
    }
    &-prev {
        @include vh-squircle(
            $topRight: var(--vh-br-normal),
            $bottomRight: var(--vh-br-normal)
        );
        background: linear-gradient(to right, var(--vh-clr-body-bg), transparent);
        inset-inline-start: 0;
        &:disabled {
            background: 0;
            backdrop-filter: none;
            span {
                transform: translateX(calc(var(--vh-spacer) * -1));
                opacity: 0
            }
        }
    }
    &-next {
        @include vh-squircle(
            $topLeft: var(--vh-br-normal),
            $bottomLeft: var(--vh-br-normal)
        );
        background: linear-gradient(to left, var(--vh-clr-body-bg), transparent);
        inset-inline-end: 0;
        &:disabled {
            background: 0;
            backdrop-filter: none;
            span {
                transform: translateX(var(--vh-spacer));
                opacity: 0
            }
        }
    }
}
</style>
