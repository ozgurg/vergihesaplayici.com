<template>
    <v-alert
        :icon="false"
        text=""
        type="info">
        <!-- eslint-disable vue/no-v-text-v-html-on-component vue/no-v-html -->
        <div v-html="text" />
    </v-alert>
</template>

<script>
import { calculateMinimumWageDayCount, calculateMinimumWageMonthCount } from "@/utils/calculate-minimum-wage-count.js";
import { moneyFormat } from "@/utils/formatter.js";

const minimumWage = process.env.MINIMUM_WAGE;

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

            if (vm.minimumWageMonthCount > 1) {
                return `Türkiye'de asgari ücretle (${vm.minimumWageFormatted}) çalışan birisi yemeden içmeden bu ürünü <b>${vm.minimumWageMonthCount}</b> aylık maaşı ile satın alabilir.`;
            }

            return `Türkiye'de asgari ücretle (${vm.minimumWageFormatted}) çalışan birisi yemeden içmeden bu ürünü <b>${vm.minimumWageDayCount}</b> günlük maaşı ile satın alabilir.`;
        },
        minimumWageFormatted() {
            return moneyFormat(minimumWage, "TRY");
        },
        minimumWageDayCount() {
            const vm = this;
            return calculateMinimumWageDayCount(vm.price, minimumWage);
        },
        minimumWageMonthCount() {
            const vm = this;
            return calculateMinimumWageMonthCount(vm.price, minimumWage);
        }
    }
};
</script>
