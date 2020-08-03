<template>
	<div class="column is-half-mobile has-text-centered">
		<div>
			<p class="heading">1 {{currency}}</p>
			<p v-if="!isLoading" class="subtitle">{{currencyFormat($store.getters.getExchangeRate(currency), "TRY")}}</p>
			<b-skeleton v-else
						width="48px"
						height="25px"
						:animated="true" />
		</div>
	</div>
</template>

<script>
export default {
	name: "ExchangeRateItem",
	data() {
		return {
			isLoading: false
		};
	},
	props: {
		currency: {
			type: String,
			require: true
		}
	},
	created() {
		const vm = this;

		vm.isLoading = true;

		vm.$store.dispatch("getExchangeRateFromApi", vm.currency)
			.then(() => {
				vm.isLoading = false;
			});
	}
};
</script>

<style lang="scss" scoped="">
	.subtitle {
		margin: 0 !important
	}
	.b-skeleton {
	  	.b-skeleton-item {
		  	vertical-align: middle;
			display: inline-block
		}
	}
</style>