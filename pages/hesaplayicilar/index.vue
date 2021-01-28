<template>
	<div>
		<A />

		<h1 class="mb-2 primary--text">Tüm Hesaplayıcılar</h1>

		<CalculatorGrid />
	</div>
</template>

<script>
import openGraphImage from "@/assets/img/open-graph/index.jpg";

const meta = {
	title: "Tüm Hesaplayıcılar",
	description: "Türkiye'deki farklı ürün gruplarının yurt içi ve yurt dışı fiyatlarına ne kadar vergi uygulandığını hesaplayın."
};

export default {
	name: "Calculators",
	data: () => ({
		head: {
			title: meta.title,
			meta: [
				{ hid: "title", name: "title", content: meta.title },
				{ hid: "description", name: "description", content: meta.description },
				{ hid: "og:title", name: "og:title", content: meta.title },
				{ hid: "og:description", name: "og:description", content: meta.description },
				{ hid: "og:image", name: "og:image", content: openGraphImage },
				{ name: "twitter:image", content: openGraphImage }
			]
		}
	}),
	head() {
		const vm = this;
		return vm.head;
	},
	mounted() {
		const vm = this;

		vm.$store.set("ui/toolbarTitle", vm.head.title);

		vm.$store.set("ui/breadcrumbs", [
			{ text: "Ana Sayfa", to: "/" },
			{ text: "Hesaplayıcılar", to: "/hesaplayicilar" }
		]);
	}
};
</script>