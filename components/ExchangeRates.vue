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

		<small v-if="lastUpdate"
			   class="ma-0 text--disabled d-flex justify-end">Son güncelleme: {{ lastUpdate }}</small>
	</div>
</template>

<script>
import { sync } from "vuex-pathify";

export default {
	name: "ExchangeRates",
	computed: {
		lastUpdate: sync("exchangeRates/lastUpdate"),
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