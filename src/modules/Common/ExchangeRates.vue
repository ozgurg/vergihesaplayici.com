<template>
	<div>
		<nav class="level is-mobile">
			<ExchangeRateItem currency="USD" />
			<ExchangeRateItem currency="EUR" />
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