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
                Hesaplayıcılar
            </h2>
            <CalculatorGrid />
        </InnerContainer>
    </div>
</template>

<script>
export default {
    head() {
        return this.page.head;
    },
    data() {
        return {
            page: this.$page.AnaSayfa
        };
    }
};
</script>
