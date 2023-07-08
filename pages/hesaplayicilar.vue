<template>
    <div>
        <AppBreadcrumbs :items="page.breadcrumbs" />

        <Heading1>
            {{ page.title }}
        </Heading1>

        <div class="mb-12">
            <template v-if="$vuetify.breakpoint.lgAndUp">
                <AdsterraBanner728x90 :order="0" />
            </template>
            <template v-else-if="$vuetify.breakpoint.mdAndDown">
                <AdsterraBanner300x250 :order="0" />
            </template>
        </div>

        <InnerContainer>
            <CalculatorGrid />
        </InnerContainer>

        <AdsterraNative
            :order="1"
            class="mt-16" />
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
