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

const meta = {
	title: "Vergi Hesaplayıcı",
	description: "Türkiye'deki farklı ürün gruplarının yurt içi ve yurt dışı fiyatlarına ne kadar vergi uygulandığını hesaplayın."
};

export default {
	layout: "default/index",
	name: "Index",
	data: () => ({
		head: {
			titleTemplate: null,
			title: meta.title,
			meta: [
				{ hid: "title", name: "description", content: meta.title },
				{ hid: "description", name: "description", content: meta.description },
				{ hid: "og:description", name: "og:description", content: meta.description }
			]
		},
		ositaIheme
	}),
	head() {
		const vm = this;
		return vm.head;
	},
	mounted() {
		const vm = this;
		vm.$store.set("ui/toolbarTitle", vm.head.title);
	}
};
</script>