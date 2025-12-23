<template>
    <alert
        color="info"
        class="text-center">
        Türkiye'de <u :aria-label="minimumWageFormatted" data-balloon-pos="up">asgari ücretli bir çalışan</u> yemeden
        içmeden bu
        ürünü
        <string-carousel :text="wageDurationSummary" is="b" />
        maaşıyla satın alabilir.
    </alert>
</template>

<script lang="ts" setup>
// Since it is only used in this component, it is imported here to reduce bundle size.
// If it is needed elsewhere, it and the CSS below in this file should be moved to the global scope.
// oxlint-disable-next-line no-unassigned-import
import "balloon-css";

/* oxlint-disable no-magic-numbers */
import type { Props as AlertProps } from "@/components/common/alert.vue";

const DECIMAL_PLACES = 1;

export type Props = {
    price: number;
} & AlertProps;

const props = defineProps<Props>();
const MINIMUM_WAGE_GROSS_MONTHLY = inject("MINIMUM_WAGE_GROSS_MONTHLY", 28_075);

const minimumWageFormatted = formatMoney(MINIMUM_WAGE_GROSS_MONTHLY, "TRY");

const roundToDecimalPlaces = (value: number) => {
    const factor = 10 ** DECIMAL_PLACES;
    return Math.round(value * factor) / factor;
};

const wageDurationSummary = computed<string>(() => {
    const yearCount = roundToDecimalPlaces(props.price / (MINIMUM_WAGE_GROSS_MONTHLY * 12));
    if (yearCount >= 1) {
        return `${yearCount} yıllık`;
    }

    const monthCount = roundToDecimalPlaces(props.price / MINIMUM_WAGE_GROSS_MONTHLY);
    if (monthCount >= 1) {
        return `${monthCount} aylık`;
    }

    const dayCount = roundToDecimalPlaces(props.price / (MINIMUM_WAGE_GROSS_MONTHLY / 30));
    return `${dayCount} günlük`;
});
</script>

<style lang="scss">
:root {
    --balloon-font-size: var(--vh-fs-sm);
    --balloon-color: #fff;
    --balloon-text-color: #000;
    --balloon-border-radius: var(--vh-br-pill)
}
</style>

<style lang="scss" scoped>
[data-balloon-pos] {
    cursor: help
}

[data-balloon-pos],
[data-balloon-pos] {
    &::after, &::before {
        transition: vh-transition(all, var(--vh-duration-short));
        transition-delay: 0s
    }
    &::after {
        @include vh-text-number;
        font-weight: var(--vh-fw-semibold)
    }
}
</style>
