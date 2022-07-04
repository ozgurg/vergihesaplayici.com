<template>
    <v-alert
        v-bind="$attrs"
        dense=""
        text=""
        border="left"
        type="info">
        Türkiye'de asgari ücretle çalışan birisi yemeden içmeden bu ürünü <b>{{ minimumWageMonthCount }}</b> ayda satın alabilir.
    </v-alert>
</template>

<script>
import { calculateMinimumWageMonthCount } from "@/utils/calculate-minimum-wage-month-count";

export default {
    props: {
        price: {
            type: Number,
            required: true
        }
    },
    computed: {
        minimumWageMonthCount() {
            const vm = this;
            return calculateMinimumWageMonthCount(vm.price, process.env.MINIMUM_WAGE);
        }
    }
};
</script>
