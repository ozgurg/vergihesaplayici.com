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
export default {
    head() {
        return this.page.head;
    },
    data() {
        return {
            page: this.$page.Hesaplayicilar
        };
    }
};
</script>
