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
import page from "./page.js";

export default {
    head() {
        return this.page.head;
    },
    data: () => ({
        page
    })
};
</script>
