<template>
	<v-tooltip v-bind="$attrs"
			   :disabled="!isLoaded"
			   bottom="">
		<template v-slot:activator="{ on, attrs }">
			<v-card v-bind="attrs"
					v-on="on"
					class="text-center"
					outlined="">
				<v-card-subtitle v-text="currency"
								 class="pb-0 pt-2" />

				<v-card-title class="justify-center pt-0 pb-2 px-0">
					<div class="w-100 mx-auto">
						<span v-if="isLoaded"
							  v-text="$moneyFormat(exchangeRate.rate, 'TRY')"
							  class="d-block" />

						<v-skeleton-loader
							v-else
							class="mx-auto"
							max-height="32"
							max-width="64"
							type="image" />
					</div>
				</v-card-title>
			</v-card>
		</template>

		<span v-text="exchangeRate.title" />
	</v-tooltip>
</template>

<script>
export default {
	name: "ExchangeRateItem",
	data: () => ({
		isLoaded: false,
		exchangeRate: {}
	}),
	props: {
		currency: {
			type: String,
			required: true
		}
	},
	mounted() {
		const vm = this;
		vm.$store.dispatch("exchangeRates/loadExchangeRateFromApi", vm.currency)
			.then(() => {
				vm.exchangeRate = vm.$store.get(`exchangeRates/currencies@${vm.currency}`);
				vm.isLoaded = true;
			});
	}
};
</script>

<style lang="scss" scoped="">
span {
	line-height: 32px
}
</style>