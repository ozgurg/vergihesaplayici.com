<template>
    <v-row
        v-bind="$attrs"
        dense="">
        <template v-for="_currencyCode in currencies">
            <v-col
                :key="_currencyCode"
                cols="6">
                <ExchangeRateCard :currency-code="_currencyCode" />
            </v-col>
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
