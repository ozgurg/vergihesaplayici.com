<template>
    <v-row
        v-bind="$attrs"
        dense="">
        <v-col
            v-for="(currency, index) in currencies"
            :key="index"
            cols="6">
            <ExchangeRateItem :currency="currency" />
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "ExchangeRates",
    computed: {
        currencies() {
            const vm = this;
            return vm.$store.get("exchangeRates/availableCurrencies").filter(currency => currency !== "TRY");
        }
    }
};
</script>
