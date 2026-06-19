<template>
    <details
        :class="CLASSES"
        role="listitem">
        <summary class="header">
            <span class="header-label">
                <template v-if="doesLabelContainNumber">
                    <string-carousel :text="props.label" />
                </template>
                <template v-else>
                    {{ props.label }}
                </template>
            </span>
            <span class="header-value text-number">
                <string-carousel :text="props.value" />
            </span>
        </summary>
        <div class="content">
            <template v-for="detail in props.details" :key="detail.label">
                <div class="detail">
                    <span class="detail-label">{{ detail.label }}</span>
                    <span class="detail-value text-number">{{ detail.value }}</span>
                </div>
            </template>
        </div>
    </details>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_details } from "@/types/html.js";

export type Props = {
    label: string;
    value: string;
    details: { label: string; value: string }[];
    variant?: "tax-free-price" | "total-tax" | "tax-added-price";
    isMuted?: boolean;
} & /* @vue-ignore */ Partial<HtmlAttrs_details>;

const props = withDefaults(defineProps<Props>(), {
    isMuted: false
});

const doesLabelContainNumber = computed(() => /\d/u.test(props.label));

const CLASSES = [
    "calculator-result-list-item",
    props.variant ? `calculator-result-list-item--variant-${props.variant}` : undefined,
    props.isMuted ? `calculator-result-list-item--muted` : undefined
];
</script>

<style lang="scss" scoped>
$_variants: (
    "tax-free-price": (
        --bg: vh-calculate-overlay-color($clr-body-bg, rgba(#fff, .04)),
        --font-weight: var(--vh-fw-bold)
    ),
    "total-tax": (
        --bg: vh-calculate-overlay-color($clr-body-bg, rgba($clr-primary, .04)),
        --font-weight: var(--vh-fw-medium)
    ),
    "tax-added-price": (
        --bg: vh-calculate-overlay-color($clr-body-bg, rgba($clr-primary, .16)),
        --font-weight: var(--vh-fw-bold)
    )
);

.calculator-result-list-item {
    $self: &;
    @include vh-card();
    --_bg: var(--bg, 0);
    --_font-weight: var(--font-weight, var(--vh-fw-normal));
    transition: var(--transition), vh-transition(margin-inline, var(--vh-duration-long));
    font-weight: var(--_font-weight);
    background: var(--_bg);
    @include vh-hover {
        &:has(.header:hover) {
            --border-alpha: .5
        }
    }
    @include vh-active {
        &:has(.header:active) {
            --bg-alpha: .12;
            transform: scale(.985)
        }
    }
    @each $__variant, $__properties in $_variants {
        &--variant-#{$__variant} {
            @include vh-map-to-properties($__properties)
        }
    }
    &--muted {
        transition: vh-transition(opacity, var(--vh-duration-short));
        opacity: .625;
        @include vh-hover {
            &:hover {
                opacity: 1
            }
        }
    }
    .header {
        display: flex;
        align-items: center;
        flex-flow: row wrap;
        justify-content: space-between;
        padding: calc(var(--vh-spacer) * .75) var(--vh-spacer);
        gap: var(--vh-spacer);
        &-label {
            text-align: start
        }
        &-value {
            flex: 1;
            text-align: end;
            word-break: break-word
        }
    }
    .content {
        border-block-start: var(--vh-border-inline-size) solid hsla(var(--vh-clr-white-hsl), var(--vh-clr-border-alpha));
        padding: var(--vh-spacer)
    }
    .detail {
        font-size: var(--vh-fs-sm);
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: var(--vh-spacer);
        & + .detail {
            margin-block-start: calc(var(--vh-spacer) * .75)
        }
        &-label {
            flex: 1;
            text-align: end
        }
        &-value {
            flex: 1;
            text-align: start;
            word-break: break-word
        }
    }
    &[open] {
        background: hsla(var(--vh-clr-white-hsl), .1);
        @supports (interpolate-size: allow-keywords) {
            margin-inline: calc(var(--vh-spacer) * -1);
            &::details-content {
                block-size: auto
            }
        }
        summary {
            @supports (interpolate-size: allow-keywords) {
                padding: calc(var(--vh-spacer) * .75) calc(var(--vh-spacer) + var(--vh-spacer));
            }
            &::before {
                margin-block-start: 5px;
                transform: rotate(220deg)
            }
        }
    }
    summary {
        cursor: pointer;
        @supports (interpolate-size: allow-keywords) {
            transition: vh-transition(padding, var(--vh-duration-long))
        }
        &::before {
            inline-size: calc(var(--vh-spacer) * .5);
            block-size: calc(var(--vh-spacer) * .5);
            display: inline-block;
            content: "";
            border-inline-end: var(--vh-border-inline-size) solid currentColor;
            border-block-end: var(--vh-border-inline-size) solid currentColor;
            transform-origin: center;
            transform: rotate(45deg);
            margin-block-start: -4px;
            @supports (interpolate-size: allow-keywords) {
                transition: vh-transition(transform margin-block-start, var(--vh-duration-long))
            }
        }
    }
    @supports (interpolate-size: allow-keywords) {
        &::details-content {
            transition: vh-transition(block-size content-visibility padding, var(--vh-duration-long));
            transition-behavior: allow-discrete;
            block-size: 0;
            overflow: clip
        }
    }
}
</style>
