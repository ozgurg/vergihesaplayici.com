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
import { HesaplayicilarPageDef } from "@/domain/hesaplayicilar/index.page-def.js";

const hesaplayicilarPage = HesaplayicilarPageDef();

export default {
    head() {
        return this.page.head;
    },
    data: () => ({
        page: hesaplayicilarPage
    })
};
</script>
