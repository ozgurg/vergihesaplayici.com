<template>
	<div class="exchange-rates" :class="{'exchange-rates--mobile': $vuetify.breakpoint.xsOnly}">
		<v-row v-bind="$attrs"
			   dense="">
			<v-col v-for="(currency, index) in availableCurrencies"
				   :key="index"
				   cols="4"
				   sm="">
				<ExchangeRateItem :currency="currency" />
			</v-col>
		</v-row>
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

<style lang="scss">
.exchange-rates--mobile {
	margin: 0 -24px;
	.row {
		display: block;
		overflow-x: auto;
		white-space: nowrap;
		padding-left: 24px;
		padding-right: 24px;
		[class*=col-] {
			flex: none;
			display: inline-block;
			vertical-align: top;
			max-width: 33%
		}
	}
}
</style>