<template>
    <v-card
        outlined=""
        class="px-2 py-6 px-lg-4 py-lg-8 h-100">
        <v-avatar
            size="32"
            color="white">
            <vh-icon
                :icon="brand.icon"
                :color="brand.color" />
        </v-avatar>

        <v-card-title class="pa-0 my-4">
            {{ brand.title }}
        </v-card-title>

        <v-icon>
            {{ icons.mdiArrowRight }}
        </v-icon>
    </v-card>
</template>

<script>
import { mdiArrowRight } from "@mdi/js";
import { isCustomIcon, loadCustomIconAsHtml } from "@/utils/custom-icon.js";

export default {
    data: () => ({
        icons: {
            mdiArrowRight
        }
    }),
    methods: {
        loadCustomIconAsHtml(brand) {
            return loadCustomIconAsHtml(brand.icon);
        },
        isCustomIcon(brand) {
            return isCustomIcon(brand.icon);
        }
    },
    props: {
        brand: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped="">
@import "~vuetify/src/styles/settings/_variables.scss";

.v-card {
    flex-grow: 0;
    flex-shrink: 0;
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;
    min-width: max-content;
    border-color: v-bind("brand.color");
    overflow: hidden;
    width: 110px;
    @media #{map-get($display-breakpoints, "md-and-up")} {
        width: 144px
    }
    & > * {
        position: relative;
        z-index: 2
    }
    &::before {
        position: absolute;
        z-index: 1;
        inset: 0;
        opacity: .4;
        background: v-bind("brand.color");
        pointer-events: none;
        content: ""
    }
}
</style>
