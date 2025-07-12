<template>
    <div :class="CLASSES">
        <dt>
            <template v-if="doesLabelContainNumber">
                <string-carousel2 :text="props.label" />
            </template>
            <template v-else>
                {{ props.label }}
            </template>
        </dt>
        <dd class="text-number">
            <string-carousel2 :text="props.value" />
        </dd>
    </div>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_div } from "@/types/html.js";

export type Props = {
    label: string;
    value: string;
    variant?: "tax-free-price" | "total-tax" | "tax-added-price";
} & /* @vue-ignore */ Partial<HtmlAttrs_div>;

const props = defineProps<Props>();

const doesLabelContainNumber = /\d/.test(props.label);

const CLASSES = [
    "calculator-result-list-item",
    props.variant ? `calculator-result-list-item-variant-${props.variant}` : undefined
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
    --_bg: var(--bg, 0);
    --_font-weight: var(--font-weight, var(--vh-fw-normal));
    font-weight: var(--_font-weight);
    display: flex;
    @include vh-card();
    align-items: center;
    flex-flow: row wrap;
    justify-content: space-between;
    padding: calc(var(--vh-spacer) * .75) var(--vh-spacer);
    background: var(--_bg);
    gap: var(--vh-spacer);
    @each $__variant, $__properties in $_variants {
        &-variant-#{$__variant} {
            @include vh-map-to-properties($__properties)
        }
    }
    dt {
        text-align: start
    }
    dd {
        flex: 1;
        text-align: end;
        word-break: break-word
    }
}
</style>
