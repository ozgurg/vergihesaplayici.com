<template>
    <v-breadcrumbs
        v-if="items.length > 0"
        v-bind="$attrs"
        ref="breadcrumbs"
        class="vh-breadcrumbs mb-3 pb-3 px-0"
        :items="items">
        <template #divider>
            <v-icon
                color="grey lighten-2"
                size="16">
                {{ dividerIcon }}
            </v-icon>
        </template>

        <template #item="{ item }">
            <v-breadcrumbs-item
                :to="item.to"
                exact=""
                nuxt="">
                {{ item.title }}
            </v-breadcrumbs-item>
        </template>
    </v-breadcrumbs>
</template>

<script>
import { mdiChevronRight } from "@mdi/js";
import { ConsoleTaxCalculator, PhoneTaxCalculator, VatCalculator } from "@/data/calculators.js";
import { buildBreadcrumbsFromPath } from "@/utils/build-breadcrumbs-from-path.js";

export default {
    data: () => ({
        dividerIcon: mdiChevronRight
    }),
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
    },
    mounted() {
        const vm = this;
        setTimeout(() => {
            // Start at the end
            const breadcrumbs = vm.$refs.breadcrumbs.$el;
            breadcrumbs.scrollLeft = breadcrumbs.scrollWidth;
        }, 0);
    }
};
</script>

<style lang="scss">
.vh-breadcrumbs {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
    white-space: nowrap;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    li {
        scroll-snap-align: center
    }
}
</style>
