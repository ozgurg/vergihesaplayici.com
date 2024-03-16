<template>
    <div>
        <AppBreadcrumbs :items="page.breadcrumbs" />

        <heading-1>
            {{ page.title }}
        </heading-1>

        <inner-container>
            <calculator-grid />
        </inner-container>
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
