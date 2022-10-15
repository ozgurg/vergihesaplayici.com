<template>
    <v-row dense="">
        <template v-for="_currencyCode in currencyCodes">
            <ExchangeRateGridItem
                :key="_currencyCode"
                :currency-code="_currencyCode" />
        </template>
    </v-row>
</template>

<script>
export default {
    computed: {
        currencyCodes() {
            const vm = this;
            return vm.$store.getters["exchange-rates/availableCurrenciesExceptTRY"];
        }
    }
};
</script>
