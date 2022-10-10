<template>
    <v-alert
        v-bind="$attrs"
        :icon="icon"
        text=""
        type="info">
        Türkiye'de asgari ücretle ({{ minimumWageFormatted }}) çalışan birisi yemeden içmeden bu ürünü
        <b>{{ minimumWageMonthCount }}</b> ayda satın alabilir.
    </v-alert>
</template>

<script>
import { mdiCreditCardClock } from "@mdi/js";
import { calculateMinimumWageMonthCount } from "@/utils/calculate-minimum-wage-month-count.js";
import { moneyFormat } from "@/utils/formatter.js";

export default {
    data: () => ({
        icon: mdiCreditCardClock,
        minimumWage: process.env.MINIMUM_WAGE
    }),
    props: {
        price: {
            type: Number,
            required: true
        }
    },
    methods: {
        moneyFormat
    },
    computed: {
        minimumWageFormatted() {
            const vm = this;
            return vm.moneyFormat(vm.minimumWage, "TRY");
        },
        minimumWageMonthCount() {
            const vm = this;
            return calculateMinimumWageMonthCount(vm.price, vm.minimumWage);
        }
    }
};
</script>
