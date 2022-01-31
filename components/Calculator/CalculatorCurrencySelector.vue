<template>
	<v-select
        @change="emit($event)"
        v-bind="$attrs"
        :value="value"
        :items="currencies"
        hide-details=""
        outlined=""
        aria-label="Para birimi" />
</template>

<script>
import { get } from "vuex-pathify";

export default {
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
        currencies: get("exchange-rates/availableCurrencies")
    }
};
</script>
