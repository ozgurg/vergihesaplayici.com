<template>
    <v-row
        v-bind="$attrs"
        dense="">
        <template v-for="currencyCode in currencies">
            <v-col
                :key="currencyCode"
                cols="6">
                <ExchangeRateItem :currency-code="currencyCode" />
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
