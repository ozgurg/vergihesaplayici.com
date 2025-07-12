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

export type Props = {
    price: number;
} & AlertProps;

const props = defineProps<Props>();
const MINIMUM_WAGE_GROSS_MONTHLY = inject("MINIMUM_WAGE_GROSS_MONTHLY", 22_104.67); // Source: https://www.csgb.gov.tr/tr/poco-pages/asgari-ucret/

const wageDurationSummary = computed<string>(() => {
    const yearCount = Math.floor(props.price / (MINIMUM_WAGE_GROSS_MONTHLY * 12));
    if (yearCount >= 1) {
        return `${yearCount} yıllık`;
    }

    const monthCount = Math.floor(props.price / MINIMUM_WAGE_GROSS_MONTHLY);
    if (monthCount >= 1) {
        return `${monthCount} aylık`;
    }

    const dayCount = Math.floor(props.price / (MINIMUM_WAGE_GROSS_MONTHLY / 30));
    return `${dayCount} günlük`;
});
</script>
