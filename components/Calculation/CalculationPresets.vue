<template>
    <div class="vh-calculation-presets">
        <div>
            <CalculationPresetBrandCardItem :brand="brand" />
        </div>

        <template v-for="_preset in presets">
            <div :key="_preset.id">
                <CalculationPresetCardItem
                    :preset="_preset"
                    :brand="brand" />
            </div>
        </template>
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
    --vh-calculation-presets-negative-margin-x: #{$spacer * 6};
    --vh-calculation-presets-padding-x: var(--vh-calculation-presets-negative-margin-x);
    display: flex;
    flex-flow: row nowrap;
    -webkit-overflow-scrolling: touch;
    white-space: nowrap;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 1rem;
    scroll-padding-inline: var(--vh-calculation-presets-negative-margin-x);
    margin: 0 calc(var(--vh-calculation-presets-negative-margin-x) * -1);
    padding-block-end: .5rem;
    @media #{map-get($display-breakpoints, "sm-and-up")} {
        --vh-calculation-presets-negative-margin-x: #{$spacer * 8}
    }
    @media #{map-get($display-breakpoints, "md-and-up")} {
        --vh-calculation-presets-negative-margin-x: 0
    }
    > div {
        scroll-snap-align: start;
        &:first-child {
            padding-inline-start: var(--vh-calculation-presets-negative-margin-x)
        }
        &:last-child {
            padding-inline-end: var(--vh-calculation-presets-negative-margin-x)
        }
    }
}
</style>
