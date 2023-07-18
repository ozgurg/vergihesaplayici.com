<template>
    <v-card
        :to="preset.url"
        outlined=""
        class="vh-calculation-preset-item px-4 py-6 px-lg-6 py-lg-8">
        <v-card-title class="pa-0 mb-4">
            {{ preset.title }}
        </v-card-title>

        <v-card-subtitle class="pa-0 mb-8">
            {{ brand.title }} • {{ preset.releaseDate.getFullYear() }}
        </v-card-subtitle>

        <div>
            <img
                :src="require(`@/calculators/${preset.thumbnail}`)"
                :alt="preset.title"
                class="vh-calculation-preset-item__thumb d-inline-block valign-middle rounded pa-2 white"
                width="auto"
                height="96"
                loading="lazy"
                decoding="async"
                draggable="false" />
        </div>
    </v-card>
</template>

<script>
export default {
    props: {
        preset: {
            type: Object,
            required: true
        },
        brand: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped="">
@import "~vuetify/src/styles/settings/_variables.scss";

.vh-calculation-preset-item {
    flex-grow: 0;
    flex-shrink: 0;
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    min-width: 204px;
    flex-basis: 204px;
    @media #{map-get($display-breakpoints, "md-and-up")} {
        min-width: 236px;
        flex-basis: 236px
    }
    &__thumb {
        height: 96px;
        width: auto;
        max-width: 96px;
        object-fit: contain
    }
}
</style>
