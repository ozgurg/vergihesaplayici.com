<template>
	<div>
		<v-row v-bind="$attrs"
			   dense="">
			<v-col v-for="(currency, index) in availableCurrencies"
				   :key="index"
				   cols="4"
				   sm="">
				<ExchangeRateItem :currency="currency" />
			</v-col>
		</v-row>

		<small class="ma-0 text--disabled d-flex justify-end font-italic">Günlük güncellenir</small>
	</div>
</template>

<script>
export default {
	name: "ExchangeRates",
	computed: {
		availableCurrencies() {
			const vm = this;
			return vm.$store.get("exchangeRates/availableCurrencies")
				.filter(currency => {
					return currency !== "TRY";
				});
		}
	}
};
</script>