<template>
	<div>
        <AppHeader>{{ head.title }}</AppHeader>

        <InnerContainer>
            <CalculatorGrid />
        </InnerContainer>
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
        vm.$store.set("ui/breadcrumbs", [
            { text: "Ana Sayfa", to: "/" },
            { text: "Hesaplayıcılar", to: "/hesaplayicilar" }
        ]);
    }
};
</script>
