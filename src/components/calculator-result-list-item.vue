<template>
    <div :class="CLASSES">
        <div class="header">
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
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_div } from "@/types/html.js";

export type Props = {
    label: string;
    value: string;
    variant?: "tax-free-price" | "total-tax" | "tax-added-price";
    isMuted?: boolean;
} & /* @vue-ignore */ Partial<HtmlAttrs_div>;

const props = withDefaults(defineProps<Props>(), {
    isMuted: false
});

const doesLabelContainNumber = /\d/u.test(props.label);

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
    @include vh-card();
    --_bg: var(--bg, 0);
    --_font-weight: var(--font-weight, var(--vh-fw-normal));
    font-weight: var(--_font-weight);
    background: var(--_bg);
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
}
</style>
