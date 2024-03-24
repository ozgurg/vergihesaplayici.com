<template>
    <div class="vh-calculation-presets">
        <div>
            <calculation-preset-brand-card-item :brand="brand" />
        </div>
        <calculation-preset-card-item
            v-for="_preset in presets"
            :key="_preset.id"
            :preset="_preset"
            :brand="brand" />
    </div>
</template>

<script>
export default {
    props: {
        brand: {
            type: Object,
            required: true
        },
        presets: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped="">
@import "~vuetify/src/styles/settings/_variables.scss";

.vh-calculation-presets {
    --vh-calculation-presets-negative-margin-x: #{$spacer * 5};
    --vh-calculation-presets-padding-x: var(--vh-calculation-presets-negative-margin-x);
    display: flex;
    flex-flow: row nowrap;
    -webkit-overflow-scrolling: touch;
    white-space: nowrap;
    overflow-x: auto;
    scroll-padding-inline: var(--vh-calculation-presets-negative-margin-x);
    margin: 0 calc(var(--vh-calculation-presets-negative-margin-x) * -1);
    padding-block-end: .5rem;
    gap: .5rem;
    @media #{map-get($display-breakpoints, "md-and-up")} {
        --vh-calculation-presets-negative-margin-x: 0;
        gap: 1rem
    }
    > div {
        &:first-child {
            padding-inline-start: var(--vh-calculation-presets-negative-margin-x)
        }
        &:last-child {
            padding-inline-end: var(--vh-calculation-presets-negative-margin-x)
        }
    }
}
</style>
