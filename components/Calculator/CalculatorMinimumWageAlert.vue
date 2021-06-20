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
const MINIMUM_WAGE = 2825.90;

export default {
    name: "CalculatorMinimumWageAlert",
    props: {
        price: {
            type: Number,
            required: true
        }
    },
    computed: {
        minimumWageMonthCount() {
            const vm = this;
            return (vm.price / MINIMUM_WAGE).toFixed(2);
        }
    }
};
</script>
