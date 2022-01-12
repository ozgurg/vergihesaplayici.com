<template>
	<div>
        <AppHeader>Vergi Hesaplayıcı</AppHeader>

        <InnerContainer>
            <p class="mb-4">vergihesaplayici.com, vergi hesaplar.</p>

            <OsitaIheme />

            <v-divider class="my-8" />

            <h2 class="mb-2">Hesaplayıcılar</h2>
            <CalculatorGrid />
        </InnerContainer>
	</div>
</template>

<script>
import openGraphImage from "@/assets/img/open-graph/index.jpg";

const meta = {
    title: "Vergi Hesaplayıcı",
    description: "Türkiye'deki farklı ürün gruplarının yurt içi ve yurt dışı fiyatlarına ne kadar vergi uygulandığını hesaplayın."
};

export default {
    layout: "default/index",
    data: () => ({
        head: {
            titleTemplate: null,
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
        vm.$store.set("ui/breadcrumbs", []);
    }
};
</script>
