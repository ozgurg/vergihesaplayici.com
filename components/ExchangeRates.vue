<template>
	<div class="exchange-rates" :class="{'exchange-rates--mobile': isMobile}">
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
	data: () => ({
		isMobile: false
	}),
	computed: {
		availableCurrencies() {
			const vm = this;
			return vm.$store.get("exchangeRates/availableCurrencies")
				.filter(currency => {
					return currency !== "TRY";
				});
		}
	},
	methods: {
		checkIfIsMobile() {
			const vm = this;

			vm.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) && window.innerWidth < 992;
		}
	},
	mounted() {
		const vm = this;

		vm.checkIfIsMobile();

		window.addEventListener("resize", vm.checkIfIsMobile);
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
			max-width: 150px
		}
	}
}
</style>