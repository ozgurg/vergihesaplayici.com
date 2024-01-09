<template>
    <!-- DO NOT use v-html on the root element -->
    <vh-alert type="info">
        <!-- eslint-disable vue/no-v-text-v-html-on-component vue/no-v-html -->
        <div v-html="text" />
    </vh-alert>
</template>

<script>
import { calculateMinimumWageDayCount, calculateMinimumWageMonthCount } from "@/utils/calculate-minimum-wage-count.js";
import { moneyFormat } from "@/utils/formatter.js";

const { MINIMUM_WAGE } = process.env;

export default {
    props: {
        price: {
            type: Number,
            required: true
        }
    },
    computed: {
        text() {
            const vm = this;

            const count = vm.minimumWageMonthCount > 1 ? vm.minimumWageMonthCount : vm.minimumWageDayCount;
            const timeUnit = vm.minimumWageMonthCount > 1 ? "aylık" : "günlük";

            return `Türkiye'de asgari ücretle (${vm.formattedMinimumWage}) çalışan birisi yemeden içmeden bu ürünü <span class="text-h6 font-weight-bold">${count}</span> ${timeUnit} maaşıyla satın alabilir.`;
        },
        formattedMinimumWage() {
            return moneyFormat(MINIMUM_WAGE, "TRY");
        },
        minimumWageDayCount() {
            const vm = this;
            return calculateMinimumWageDayCount(vm.price, MINIMUM_WAGE);
        },
        minimumWageMonthCount() {
            const vm = this;
            return calculateMinimumWageMonthCount(vm.price, MINIMUM_WAGE);
        }
    }
};
</script>
