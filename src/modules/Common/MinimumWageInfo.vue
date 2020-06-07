<template>
	<b-message size="is-small"
			   type="is-info">
		Türkiye'de asgari ücretle çalışan birisi yemeden içmeden bu ürünü yaklaşık {{minWageMonthCount}} ayda satın alabilir.
	</b-message>
</template>

<script>
const MIN_WAGE = 2324.70;


export default {
	name: "MinimumWageInfo",
	props: {
		price: Number
	},
	computed: {
		minWageMonthCount() {
			const vm = this;

			return (vm.price / MIN_WAGE).toFixed(2);
		}
	}
};
</script>