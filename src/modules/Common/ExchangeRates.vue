<template>
  <div>
	<div class="columns is-mobile">
	  <ExchangeRateItem currency="USD" />
	  <ExchangeRateItem currency="EUR" />
	  <ExchangeRateItem currency="GBP" />
	  <ExchangeRateItem currency="INR" />
	  <ExchangeRateItem currency="CNY" />
	</div>
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

<style scoped="">
.columns {
	flex-wrap: wrap
}
</style>