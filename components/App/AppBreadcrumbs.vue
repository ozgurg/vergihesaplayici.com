<template>
    <v-breadcrumbs
        v-if="items.length > 0"
        v-bind="$attrs"
        :items="items">
        <template #item="{ item }">
            <v-breadcrumbs-item
                :to="item.to"
                active-class=""
                nuxt="">
                {{ item.title }}
            </v-breadcrumbs-item>
        </template>
    </v-breadcrumbs>
</template>

<script>
import { ConsoleTaxCalculator, PhoneTaxCalculator, VatCalculator } from "@/data/calculators.js";
import { buildBreadcrumbsFromPath } from "@/utils/build-breadcrumbs-from-path.js";

export default {
    computed: {
        items() {
            const vm = this;

            const routeTitles = {
                "hesaplayicilar": "Hesaplayıcılar",
                "konsol-vergisi-hesaplayici": ConsoleTaxCalculator.title,
                "telefon-vergisi-hesaplayici": PhoneTaxCalculator.title,
                "kdv-hesaplayici": VatCalculator.title
            };

            return [
                {
                    title: "Ana Sayfa",
                    to: "/"
                },
                ...buildBreadcrumbsFromPath(vm.$route.path, part => routeTitles[part])
            ];
        }
    }
};
</script>

<style scoped="">
.v-breadcrumbs {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    padding-left: 0 !important;
    padding-right: 0;
    -webkit-overflow-scrolling: touch
}
</style>
