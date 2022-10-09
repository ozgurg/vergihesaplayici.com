<template>
    <v-row
        v-bind="$attrs"
        dense="">
        <template v-for="_currencyCode in currencies">
            <ExchangeRateGridItem
                :key="_currencyCode"
                :currency-code="_currencyCode" />
        </template>
    </v-row>
</template>

<script>
export default {
    computed: {
        currencies() {
            const vm = this;
            return vm.$store.getters["exchange-rates/availableCurrenciesExceptTRY"];
        }
    }
};
</script>
