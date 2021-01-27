<template>
	<v-alert v-bind="$attrs"
			 dense=""
			 text=""
			 border="left"
			 type="warning">
		Para birimi TRY olduğu için hesaplama satış fiyatı üzerinden yapıldı.
		<br />
		Vergiler olmasaydı tahminen ne kadar ödeyeceğinizi "Vergisiz fiyat" alanından görebilirsiniz.
	</v-alert>
</template>

<script>
export default {
	name: "CalculatedFromSalePriceAlert"
};
</script>