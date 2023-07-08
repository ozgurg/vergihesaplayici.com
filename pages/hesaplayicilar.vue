<template>
    <div>
        <AppBreadcrumbs :items="page.breadcrumbs" />

        <Heading1>
            {{ page.title }}
        </Heading1>

        <InnerContainer>
            <template v-if="$vuetify.breakpoint.lgAndUp">
                <AdsterraBanner728x90 :order="0" class="d-flex mx-auto" />
            </template>
            <template v-else-if="$vuetify.breakpoint.mdAndDown">
                <AdsterraBanner300x250 :order="0" class="d-flex mx-auto" />
            </template>
            <v-divider class="mt-4 mb-12" />

            <CalculatorGrid />

            <v-divider class="mb-2 mt-12" />
            <template v-if="$vuetify.breakpoint.lgAndUp">
                <AdsterraBanner468x60 :order="1" class="d-flex mx-auto" />
            </template>
            <template v-else-if="$vuetify.breakpoint.mdAndDown">
                <AdsterraBanner320x50 :order="1" class="d-flex mx-auto" />
            </template>
            <v-divider class="mt-2 mb-12" />
        </InnerContainer>
    </div>
</template>

<script>
import page from "@/data/pages/hesaplayicilar.page.js";

export default {
    head() {
        return this.page.head;
    },
    data: () => ({
        page
    })
};
</script>
