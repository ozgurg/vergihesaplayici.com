<template>
	<div>
		<h1 class="mb-2 primary--text">Vergi Hesaplayıcı</h1>

		<p class="mb-2">vergihesaplayici.com, vergi hesaplar.</p>

		<v-img :src="ositaIheme"
			   alt="Osita Iheme"
			   draggable="false"
			   height="290"
			   width="400" />

		<v-divider class="my-8" />

		<h3 class="mb-2">Hesaplayıcılar</h3>
		<v-card outlined="">
			<CalculatorList show-full-title="" />
		</v-card>
	</div>
</template>

<script>
import ositaIheme from "@/assets/img/osita-iheme.gif";

export default {
	layout: "default/index",
	name: "Index",
	data: () => ({
		info: {
			title: "Vergi Hesaplayıcı"
		},
		ositaIheme
	}),
	head() {
		const vm = this;
		return {
			titleTemplate: null,
			title: vm.info.title
		};
	},
	mounted() {
		const vm = this;
		vm.$store.set("ui/toolbarTitle", vm.info.title);
	}
};
</script>