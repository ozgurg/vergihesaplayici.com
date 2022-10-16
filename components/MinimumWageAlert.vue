<template>
    <v-alert
        :icon="icon"
        text=""
        type="info">
        <template v-if="minimumWageMonthCount < 1">
            Türkiye'de asgari ücretle ({{ minimumWageFormatted }}) çalışan birisi yemeden içmeden bu ürünü
            <b>{{ minimumWageDayCount }}</b> günlük maaşı ile satın alabilir.
        </template>
        <template v-else>
            Türkiye'de asgari ücretle ({{ minimumWageFormatted }}) çalışan birisi yemeden içmeden bu ürünü
            <b>{{ minimumWageMonthCount }}</b> aylık maaşı ile satın alabilir.
        </template>
    </v-alert>
</template>

<script>
import { mdiCreditCardClock } from "@mdi/js";
import { calculateMinimumWageDayCount, calculateMinimumWageMonthCount } from "@/utils/calculate-minimum-wage-count.js";
import { moneyFormat } from "@/utils/formatter.js";

const minimumWage = process.env.MINIMUM_WAGE;

export default {
    data: () => ({
        icon: mdiCreditCardClock
    }),
    props: {
        price: {
            type: Number,
            required: true
        }
    },
    computed: {
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
