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
import { get } from "vuex-pathify";

export default {
    computed: {
        currencies: get("exchange-rates/availableCurrenciesExceptTRY")
    }
};
</script>
