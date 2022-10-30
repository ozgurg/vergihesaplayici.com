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

            <h2 class="mb-4">
                <nuxt-link
                    :to="$page.Hesaplayicilar.url"
                    class="text-decoration-none white--text">
                    {{ $page.Hesaplayicilar.title }}
                </nuxt-link>
            </h2>
            <CalculatorGrid />
        </InnerContainer>
    </div>
</template>

<script>
import { AnaSayfa } from "@/data/pages/AnaSayfa.js";

export default {
    head() {
        return this.page.head;
    },
    data: () => ({
        page: AnaSayfa
    })
};
</script>
