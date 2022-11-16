<template>
    <div>
        <PageTitle>
            {{ page.title }}
        </PageTitle>

        <InnerContainer>
            <p class="mb-10 text-subtitle-1">
                vergihesaplayici.com, vergi hesaplar.
            </p>

            <OsitaIhemeVideo />

            <v-divider class="my-15" />

            <PageSubtitle
                :to="Hesaplayicilar.url"
                class="mb-4">
                {{ Hesaplayicilar.title }}
            </PageSubtitle>
            <CalculatorGrid />
        </InnerContainer>
    </div>
</template>

<script>
import page from "@/data/pages/ana-sayfa.page.js";
import Hesaplayicilar from "@/data/pages/hesaplayicilar.page.js";

export default {
    head() {
        return this.page.head;
    },
    data: () => ({
        page,
        Hesaplayicilar
    })
};
</script>
