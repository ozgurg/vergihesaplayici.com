<template>
	<div>
        <AppHeader>Vergi Hesaplayıcı</AppHeader>

        <InnerContainer>
            <p class="mb-4">vergihesaplayici.com, vergi hesaplar.</p>

            <a
                href="https://youtu.be/zsCpGUDZ85w?t=55"
                rel="nofollow noopener noreferrer"
                title="Osita Iheme"
                target="_blank">
                <video
                    autoplay=""
                    loop=""
                    muted=""
                    playsinline=""
                    width="300"
                    height="300">
                    <source
                        :src="ositaIheme.webm"
                        type="video/webm" />
                    <source
                        :src="ositaIheme.mp4"
                        type="video/mp4" />
                </video>
            </a>
            <div class="caption">Osita Iheme</div>

            <v-divider class="my-8" />

            <h2 class="mb-2">Hesaplayıcılar</h2>
            <CalculatorGrid />
        </InnerContainer>
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
                { hid: "og:image", name: "og:image", content: openGraphImage },
                { name: "twitter:image", content: openGraphImage }
            ]
        },
        ositaIheme: {
            mp4: ositaIhemeMp4,
            webm: ositaIhemeWebm
        }
    }),
    head() {
        const vm = this;
        return vm.head;
    },
    mounted() {
        const vm = this;

        vm.$store.set("ui/toolbarTitle", vm.head.title);

        vm.$store.set("ui/breadcrumbs", []);
    }
};
</script>
