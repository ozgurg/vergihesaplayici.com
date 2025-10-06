<template>
    <component
        :is="tagName"
        :aria-busy="loading ? 'true' : undefined"
        :aria-disabled="props.disabled ? 'true' : undefined"
        :class="CLASSES"
        :disabled="props.disabled ? '' : undefined"
        :href="props.href">
        <transition name="fade-scale-transition" mode="out-in">
            <template v-if="loading">
                <spinner />
            </template>
            <template v-else>
                <div class="form-button-content">
                    <slot name="default" />
                </div>
            </template>
        </transition>
    </component>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_a, HtmlAttrs_button } from "@/types/html.js";

type Variant = "filled" | "outlined" | "text" | "plain";

type Color =
    "primary"
    | "secondary"
    | "danger"
    | "light"
    | "brand-facebook"
    | "brand-x"
    | "brand-whatsapp"
    | "brand-telegram"
    | "brand-reddit";

type Scale = "small" | "medium" | "large";

export type Props = {
    variant?: Variant;
    color?: Color;
    scale?: Scale;
    href?: URL;
    loading?: boolean;
    disabled?: boolean;
} & /* @vue-ignore */ Partial<HtmlAttrs_a | HtmlAttrs_button>;

const props = withDefaults(defineProps<Props>(), {
    variant: "filled",
    color: "primary",
    scale: "large"
});

const tagName = props.href ? "a" : "button";

const CLASSES = [
    "form-button",
    `form-button-variant-${props.variant}`,
    `form-button-color-${props.color}`,
    `form-button-scale-${props.scale}`
];
</script>

<style lang="scss" scoped>
$_default-block-size: 3.125rem;
$_svg-icon-selector: ".svg-icon";
$_spinner-selector: ".spinner";

$_colors: (
    "primary": (
        --bg-hsl: var(--vh-clr-primary-hsl),
        --text-hsl: var(--vh-clr-secondary-hsl)
    ),
    "secondary": (
        --bg-hsl: var(--vh-clr-secondary-hsl),
        --text-hsl: var(--vh-clr-white-hsl)
    ),
    "danger": (
        --bg-hsl: var(--vh-clr-danger-hsl),
        --text-hsl: var(--vh-clr-white-hsl)
    ),
    "light": (
        --bg-hsl: "0deg, 0%, 100%",
        --text-hsl: "0deg, 0%, 0%"
    ),
    "brand-facebook": (
        --bg-hsl: "216.72deg, 100%, 50.98%",
        --text-hsl: "0deg, 0%, 100%"
    ),
    "brand-x": (
        --bg-hsl: "0deg, 0%, 0%",
        --text-hsl: "0deg, 0%, 100%",
        --border-alpha: .32
    ),
    "brand-whatsapp": (
        --bg-hsl: "142.41deg, 70.16%, 48.63%",
        --text-hsl: "0deg, 0%, 100%"
    ),
    "brand-telegram": (
        --bg-hsl: "200deg, 78%, 52%",
        --text-hsl: "0deg, 0%, 100%"
    ),
    "brand-reddit": (
        --bg-hsl: "20deg, 100%, 50%",
        --text-hsl: "0deg, 0%, 100%"
    )
);

$_scales: (
    "small": (
        --block-size: 2.5rem,
        --font-size: var(--vh-fs-sm),
        --font-weight: var(--vh-fw-normal),
        --border-radius: var(--vh-br-small),
        --icon-size: 1.5rem
    ),
    "medium": (
        --block-size: 2.75rem,
        --font-size: var(--vh-fs-sm),
        --font-weight: var(--vh-fw-semibold),
        --border-radius: var(--vh-br-small),
        --icon-size: 1.625rem
    ),
    "large": (
        --block-size: #{$_default-block-size},
        --font-size: var(--vh-fs-base),
        --font-weight: var(--vh-fw-semibold),
        --border-radius: var(--vh-br-normal),
        --icon-size: 1.875rem
    )
);

.form-button {
    --_bg-hsl: var(--bg-hsl);
    --_bg-alpha: var(--bg-alpha, 1);
    --_text-hsl: var(--text-hsl);
    --_text-alpha: var(--text-alpha, 1);
    --_border-hsl: var(--border-hsl, var(--vh-clr-white-hsl));
    --_border-alpha: var(--border-alpha, var(--vh-clr-border-alpha));
    --_block-size: var(--block-size);
    --_font-size: var(--font-size);
    --_font-weight: var(--font-weight);
    --_border-radius: var(--border-radius);
    --_icon-size: var(--icon-size);
    position: relative;
    @include vh-reset-button;
    font-size: var(--_font-size);
    font-weight: var(--_font-weight);
    display: inline-flex;
    align-items: center;
    align-self: center;
    justify-content: center;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    color: hsla(var(--_text-hsl), var(--_text-alpha));
    @include vh-squircle(var(--_border-radius));
    padding-inline: var(--vh-spacer);
    min-inline-size: 4rem;
    block-size: var(--_block-size);
    @media (prefers-contrast: more) {
        --_border-alpha: 1
    }
    &:active {
        transform: scale(.99)
    }
    @each $__color, $__properties in $_colors {
        &-color-#{$__color} {
            @include vh-map-to-properties($__properties)
        }
    }
    @each $__scale, $__properties in $_scales {
        &-scale-#{$__scale} {
            @include vh-map-to-properties($__properties)
        }
    }
    &-variant-filled {
        border: var(--vh-border-inline-size) solid hsla(var(--_border-hsl), var(--_border-alpha));
        background: hsl(var(--_bg-hsl), var(--_bg-alpha));
        @include vh-hover {
            transition: vh-transition(color background, var(--vh-duration-short));
            &:hover {
                --text-alpha: .75;
                --bg-alpha: .875
            }
            &:active {
                --text-alpha: .625;
                --bg-alpha: .75
            }
        }
    }
    &-variant-outlined {
        border: var(--vh-border-inline-size) solid hsla(var(--_border-hsl), var(--_border-alpha));
        --_border-alpha: var(--border-alpha, .36);
        --text-hsl: var(--bg-hsl);
        --border-hsl: var(--bg-hsl)
    }
    &-variant-text {
        --text-hsl: var(--bg-hsl)
    }
    &-variant-plain {
        --_border-alpha: var(--border-alpha, .36);
        --text-hsl: var(--bg-hsl);
        --border-hsl: var(--bg-hsl);
        background-color: hsla(var(--bg-hsl), .08);
        @include vh-hover {
            transition: vh-transition(background-color, var(--vh-duration-short));
            &:hover {
                background-color: hsla(var(--bg-hsl), .12)
            }
            &:active {
                background-color: hsla(var(--bg-hsl), .16)
            }
        }
    }
    &-variant-outlined,
    &-variant-text {
        @include vh-hover {
            transition: vh-transition(background-color, var(--vh-duration-short));
            &:hover {
                background-color: hsla(var(--bg-hsl), .08)
            }
            &:active {
                background-color: hsla(var(--bg-hsl), .16)
            }
        }
    }
    &[disabled] {
        cursor: not-allowed;
        opacity: .5;
        border-color: transparent
    }
    &-content {
        display: flex;
        align-items: center;
        flex-flow: row nowrap;
        justify-content: center;
        text-align: start;
        gap: calc(var(--vh-spacer) * .75)
    }
    &:has(#{$_svg-icon-selector}:only-child) {
        font-size: 0;
        line-height: 0;
        padding-inline: 0;
        min-inline-size: unset;
        inline-size: var(--_block-size);
        block-size: var(--_block-size)
    }
    &:not(:has(#{$_svg-icon-selector}:only-child)) {
        #{$_svg-icon-selector} {
            --_size: calc(var(--_icon-size) * .875);
            opacity: .925
        }
        span {
            transform: translateY(1px)
        }
    }
    :deep(#{$_svg-icon-selector}) {
        --_size: var(--_icon-size)
    }
    :deep(#{$_spinner-selector}) {
        --_size: calc(var(--_icon-size) * .875)
    }
}
</style>
