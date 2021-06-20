<template>
	<v-select
        v-bind="$attrs"
        :value="value"
        :items="currencies"
        @change="emit($event)"
        hide-details=""
        outlined=""
        aria-label="Para birimi" />
</template>

<script>
import { get } from "vuex-pathify";

export default {
    name: "CalculatorCurrencySelector",
    props: {
        value: {
            type: String,
            required: true
        }
    },
    methods: {
        emit(value) {
            const vm = this;
            vm.$emit("input", value);
        }
    },
    computed: {
        currencies: get("exchangeRates/availableCurrencies")
    }
};
</script>
