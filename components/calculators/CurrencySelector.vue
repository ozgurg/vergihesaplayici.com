<template>
	<v-select
        v-bind="$attrs"
        :value="value"
        :items="currencies"
        @change="$emit('input', $event)"
        hide-details=""
        outlined=""
        aria-label="Para birimi" />
</template>

<script>
import { get } from "vuex-pathify";

export default {
    name: "CurrencySelector",
    props: {
        value: {
            type: String,
            required: true
        }
    },
    computed: {
        currencies: get("exchangeRates/availableCurrencies")
    }
};
</script>
