<template>
    <div>
        <AppBreadcrumbs :items="page.breadcrumbs" />

        <PageTitle>
            {{ page.title }}
        </PageTitle>

        <InnerContainer>
            <CalculatorGrid />
        </InnerContainer>
    </div>
</template>

<script>
import page from "@/data/pages/Hesaplayicilar.js";

export default {
    head() {
        return page.head;
    },
    data: () => ({
        page
    })
};
</script>
