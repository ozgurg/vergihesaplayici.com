<template>
    <div>
        <PageTitle>
            Vergi Hesaplayıcı
        </PageTitle>

        <InnerContainer>
            <p class="mb-10 text-subtitle-1">
                vergihesaplayici.com, vergi hesaplar.
            </p>

            <OsitaIhemeVideo />

            <v-divider class="my-15" />

            <h2 class="mb-4">
                Hesaplayıcılar
            </h2>
            <CalculatorGrid />
        </InnerContainer>
    </div>
</template>

<script>
import { buildHeadTags } from "@/utils/build-head-tags.js";

const meta = {
    title: "Vergi Hesaplayıcı",
    description: "Türkiye'deki farklı ürün gruplarının yurt içi ve yurt dışı fiyatlarına ne kadar vergi uygulandığını hesaplayın."
};

export default {
    head() {
        return this.head;
    },
    data: () => ({
        head: {
            titleTemplate: null,
            ...buildHeadTags({
                title: meta.title,
                description: meta.description,
                ogImageName: "ana-sayfa.jpg"
            })
        }
    })
};
</script>
