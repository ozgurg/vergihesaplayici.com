<template>
    <div>
        <AppHeader>
            {{ head.title }}
        </AppHeader>

        <InnerContainer>
            <CalculatorGrid />
        </InnerContainer>
    </div>
</template>

<script>
import { buildHeadTags } from "@/utils/build-head-tags.js";

const meta = {
    title: "Tüm Hesaplayıcılar",
    description: "Türkiye'deki farklı ürün gruplarının yurt içi ve yurt dışı fiyatlarına ne kadar vergi uygulandığını hesaplayın."
};

export default {
    head() {
        return this.head;
    },
    data: () => ({
        head: {
            ...buildHeadTags({
                title: meta.title,
                description: meta.description,
                ogImageName: "ana-sayfa.jpg"
            })
        }
    })
};
</script>
