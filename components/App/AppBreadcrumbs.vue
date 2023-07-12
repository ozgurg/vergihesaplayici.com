<template>
    <v-breadcrumbs
        ref="breadcrumbs"
        :items="positionAddedItems"
        class="vh-breadcrumbs mb-3 pb-3 px-0"
        itemscope=""
        itemtype="https://schema.org/BreadcrumbList">
        <template #divider>
            <v-icon
                color="grey lighten-2"
                size="12">
                {{ dividerIcon }}
            </v-icon>
        </template>

        <template #item="{ item: _item }">
            <li
                itemprop="itemListElement"
                itemscope=""
                itemtype="https://schema.org/ListItem">
                <nuxt-link
                    v-ripple=""
                    :to="_item.url"
                    itemprop="item"
                    class="v-breadcrumbs__item"
                    active-class="v-breadcrumbs__item--disabled"
                    exact-path="">
                    <span itemprop="name">
                        {{ _item.title }}
                    </span>
                    <meta
                        :content="_item.position"
                        itemprop="position" />
                </nuxt-link>
            </li>
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
                const breadcrumbs = vm.$refs.breadcrumbs.$el;
                breadcrumbs.scrollLeft = breadcrumbs.scrollWidth;
            }, 0);
        }
    },
    computed: {
        positionAddedItems() {
            const vm = this;
            return [
                {
                    title: "Ana Sayfa",
                    url: "/"
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

<style lang="scss" scoped="">
.vh-breadcrumbs {
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    -webkit-overflow-scrolling: touch;
    white-space: nowrap;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    margin: -.375rem -.5rem;

    li {
        scroll-snap-align: center
    }
}

:deep(.v-breadcrumbs__item) {
    border-radius: .5rem;
    padding: .375rem .5rem;
    color: rgba(#fff, .8)
}
</style>
