<template>
	<v-select
		:value="value"
		@change="$emit('input', $event)"
		:items="currencies"
		dense=""
		hide-details=""
		outlined=""
		aria-label="Para birimi" />
</template>

<script>
export default {
    name: "CurrencySelector",
    data: () => ({
        currencies: []
    }),
    props: {
        value: {
            type: String,
            required: true
        }
    },
    mounted() {
        const vm = this;
        vm.currencies = vm.$store.get("exchangeRates/availableCurrencies");
    }
};
</script>
