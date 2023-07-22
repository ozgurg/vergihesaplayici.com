<template>
    <div>
        <AppBreadcrumbs :items="page.breadcrumbs" />

        <Heading1>
            {{ page.title }}
        </Heading1>

        <InnerContainer>
            <CalculatorGrid />
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
