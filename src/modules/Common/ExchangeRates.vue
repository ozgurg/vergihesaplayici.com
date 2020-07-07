<template>
	<div>
		<nav class="level is-mobile">
			<ExchangeRateItem currency="USD" />
			<ExchangeRateItem currency="EUR" />
			<ExchangeRateItem currency="GBP" />
			<ExchangeRateItem currency="INR" />
			<ExchangeRateItem currency="CNY" />
		</nav>
	</div>
</template>

<script>
import ExchangeRateItem from "./ExchangeRateItem";


export default {
	name: "ExchangeRates",
	components: {
		ExchangeRateItem
	}
};
</script>