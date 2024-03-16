<template>
    <v-breadcrumbs
        ref="breadcrumbs"
        :items="positionAddedItems"
        class="vh-breadcrumbs mb-6 py-4 px-0 pa-md-0"
        itemscope=""
        itemtype="https://schema.org/BreadcrumbList">
        <template #divider>
            <v-icon
                color="grey lighten-2"
                size="12">
                {{ icons.mdiChevronRight }}
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
        icons: {
            mdiChevronRight
        }
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
            }, 100);
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
@import "~vuetify/src/styles/settings/_variables.scss";

$vh-breadcrumbs-item-padding-y: .5rem;
$vh-breadcrumbs-item-padding-x: .375rem;

// "AppBreadcrumbs" will always be in "main-container" and "main-container" has different padding-x for different resolutions.
// I want "AppBreadcrumbs" to be full width, and I do this using negative margin-x.
// I update the negative margin-x to be the same as the padding-x of the "main-container".
// And I also include the padding-x of ".v-breadcrumbs__item" in this calculation as I want the content of "AppBreadcrumbs" to align with "main-container".
.vh-breadcrumbs {
    --vh-breadcrumbs-negative-margin-y: 0px; // Removing "px" causes "calc(0 * -1)" calculation error
    --vh-breadcrumbs-negative-margin-x: #{$spacer * 5};
    --vh-breadcrumbs-padding-x: calc(var(--vh-breadcrumbs-negative-margin-x) - #{$vh-breadcrumbs-item-padding-x});
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    -webkit-overflow-scrolling: touch;
    white-space: nowrap;
    background: rgba(#fff, .04);
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    margin: calc(var(--vh-breadcrumbs-negative-margin-y) * -1) calc(var(--vh-breadcrumbs-negative-margin-x) * -1);
    @media #{map-get($display-breakpoints, "md-and-up")} {
        --vh-breadcrumbs-negative-margin-y: #{$vh-breadcrumbs-item-padding-y};
        --vh-breadcrumbs-negative-margin-x: #{$spacer * 12};
        background: 0
    }
    li {
        scroll-snap-align: center;
        &:first-child {
            padding-inline-start: var(--vh-breadcrumbs-padding-x)
        }
        &:last-child {
            padding-inline-end: var(--vh-breadcrumbs-padding-x)
        }
        a {
            border-radius: .5rem;
            padding: $vh-breadcrumbs-item-padding-y $vh-breadcrumbs-item-padding-x;
            color: rgba(#fff, .8)
        }
    }
}
</style>
