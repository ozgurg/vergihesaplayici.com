<template>
	<div>
		<h1 class="mb-2 primary--text">Vergi Hesaplayıcı</h1>

		<p class="mb-2">vergihesaplayici.com, vergi hesaplar.</p>

		<video autoplay=""
			   loop=""
			   muted=""
			   playsinline=""
			   width="300"
			   height="300">
			<source :src="ositaIheme.ositaIhemeWebm"
					type="video/webm" />
			<source :src="ositaIheme.ositaIhemeMp4"
					type="video/mp4" />
		</video>

		<v-divider class="my-8" />

		<h3 class="mb-2">Hesaplayıcılar</h3>
		<v-card outlined="">
			<CalculatorList show-full-title="" />
		</v-card>
	</div>
</template>

<script>
import ositaIhemeMp4 from "@/assets/video/osita-iheme.mp4";
import ositaIhemeWebm from "@/assets/video/osita-iheme.webm";
import openGraphImage from "@/assets/img/open-graph/index.jpg";

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
				{ hid: "title", name: "title", content: meta.title },
				{ hid: "description", name: "description", content: meta.description },
				{ hid: "og:title", name: "og:title", content: meta.title },
				{ hid: "og:description", name: "og:description", content: meta.description },
				{ hid: "og:image", name: "og:image", content: openGraphImage }
			]
		},
		ositaIheme: {
			ositaIhemeMp4,
			ositaIhemeWebm
		}
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