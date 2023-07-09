<template>
    <v-row dense="">
        <template v-for="_currencyCode in currencyCodes">
            <v-col
                :key="_currencyCode"
                cols="6">
                <ExchangeRateCardItem :currency-code="_currencyCode" />
            </v-col>
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
