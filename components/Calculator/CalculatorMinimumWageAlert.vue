<template>
    <v-alert
        v-bind="$attrs"
        dense=""
        text=""
        border="left"
        type="info">
        Türkiye'de asgari ücretle ({{ minimumWageFormatted }}) çalışan birisi yemeden içmeden bu ürünü
        <b>{{ minimumWageMonthCount }}</b> ayda satın alabilir.
    </v-alert>
</template>

<script>
import { calculateMinimumWageMonthCount } from "@/utils/calculate-minimum-wage-month-count";
import { moneyFormat } from "@/utils/formatter.js";

export default {
    data: () => ({
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
