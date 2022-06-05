<template>
    <v-alert
        v-bind="$attrs"
        dense=""
        text=""
        border="left"
        type="info">
        Türkiye'de asgari ücretle çalışan birisi yemeden içmeden bu ürünü yaklaşık <b>{{ minimumWageMonthCount }}</b> ayda satın alabilir.
    </v-alert>
</template>

<script>
import calculateMinimumWageMonthCount from "@/utils/calculate-minimum-wage-month-count";

const MINIMUM_WAGE = 4253.40; // Source: https://www.csgb.gov.tr/asgari-ucret/asgari-ucret-2022/

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
            return calculateMinimumWageMonthCount(vm.price, MINIMUM_WAGE);
        }
    }
};
</script>
