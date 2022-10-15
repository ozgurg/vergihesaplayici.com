<template>
    <v-breadcrumbs
        v-if="items.length > 0"
        ref="breadcrumbs"
        :items="normalizedItems"
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
                    :content="item.position"
                    itemprop="position" />
            </v-breadcrumbs-item>
        </template>
    </v-breadcrumbs>
</template>

<script>
import { mdiChevronRight } from "@mdi/js";

export default {
    data: () => ({
        dividerIcon: mdiChevronRight
    }),
    props: {
        items: {
            type: Array,
            required: true
        }
    },
    methods: {
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
        normalizedItems() {
            const vm = this;
            return [
                {
                    title: "Ana Sayfa",
                    to: "/"
                },
                ...vm.items
            ].map((item, index) => ({
                ...item,
                position: ++index
            }));
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
