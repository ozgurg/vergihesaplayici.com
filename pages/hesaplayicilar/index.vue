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
import { Hesaplayicilar } from "@/data/pages/Hesaplayicilar.js";

export default {
    head() {
        return this.page.head;
    },
    data: () => ({
        page: Hesaplayicilar
    })
};
</script>
