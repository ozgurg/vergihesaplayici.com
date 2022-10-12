<template>
    <v-breadcrumbs
        v-if="items.length > 0"
        v-bind="$attrs"
        ref="breadcrumbs"
        :items="items"
        class="vh-breadcrumbs mb-3 pb-3 px-0"
        itemscope=""
        itemtype="https://schema.org/BreadcrumbList">
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
                exact-path=""
                itemprop="itemListElement"
                itemscope=""
                itemtype="https://schema.org/ListItem"
                nuxt="">
                <span itemprop="name">
                    {{ item.title }}
                </span>
                <meta
                    :content="findItemPosition(item)"
                    itemprop="position" />
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
    methods: {
        // We need position of item for itemprop="position",
        // but, Vuetify currently doesn't give the index with #item slot.
        // So, we need to manually find the position of the item.
        findItemPosition(item) {
            const vm = this;
            return vm.items.findIndex(_item => _item.to === item.to) + 1;
        },
        _scrollToEnd() {
            const vm = this;
            setTimeout(() => {
                // Start at the end
                const breadcrumbs = vm.$refs.breadcrumbs.$el;
                breadcrumbs.scrollLeft = breadcrumbs.scrollWidth;
            }, 0);
        }
    },
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
    watch: {
        "$route"() { // Using "immediate: true" breaks the app
            const vm = this;
            vm._scrollToEnd();
        }
    },
    mounted() {
        const vm = this;
        vm._scrollToEnd();
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
