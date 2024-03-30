<template>
    <!-- DO NOT use `v-html` on the root element -->
    <vh-alert type="info">
        <!-- eslint-disable vue/no-v-text-v-html-on-component vue/no-v-html -->
        <div v-html="text" />
    </vh-alert>
</template>

<script setup="">
import { calculateMinimumWageDayCount, calculateMinimumWageMonthCount } from "@/utils/calculate-minimum-wage-count.js";
import { moneyFormat } from "@/utils/formatter.js";

const { MINIMUM_WAGE } = process.env;

const props = defineProps({
    price: {
        type: Number,
        required: true
    }
});

const minimumWageMonthCount = calculateMinimumWageMonthCount(props.price, MINIMUM_WAGE);
const minimumWageDayCount = calculateMinimumWageDayCount(props.price, MINIMUM_WAGE);
const formattedMinimumWage = moneyFormat(MINIMUM_WAGE, "TRY");

const text = (() => {
    const count = minimumWageMonthCount > 1 ? minimumWageMonthCount : minimumWageDayCount;
    const timeUnit = minimumWageMonthCount > 1 ? "aylık" : "günlük";
    return `Türkiye'de asgari ücretle (${formattedMinimumWage}) çalışan birisi yemeden içmeden bu ürünü <span class="text-h6 font-weight-bold">${count}</span> ${timeUnit} maaşıyla satın alabilir.`;
})();
</script>
