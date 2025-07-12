<template>
    <alert
        color="info"
        class="text-center">
        Türkiye'de asgari ücretli bir çalışan yemeden içmeden bu ürünü <string-carousel2 :text="wageDurationSummary" is="b" /> maaşıyla satın alabilir.
    </alert>
</template>

<script lang="ts" setup>
/* oxlint-disable no-magic-numbers */

import type { Props as AlertProps } from "@/components/common/alert.vue";

const DECIMAL_PLACES = 1;

export type Props = {
    price: number;
} & AlertProps;

const props = defineProps<Props>();
const MINIMUM_WAGE_GROSS_MONTHLY = inject("MINIMUM_WAGE_GROSS_MONTHLY", 22_104.67); // Source: https://www.csgb.gov.tr/tr/poco-pages/asgari-ucret/

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
