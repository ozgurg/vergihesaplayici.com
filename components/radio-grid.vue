<template>
    <div
        class="radio-grid"
        role="radiogroup">
        <template v-for="_item in props.items">
            <v-card
                :key="_item.title"
                :aria-checked="isItemChecked(_item) ? 'true' : 'false'"
                role="radio"
                outlined=""
                class="py-2"
                @click="emitInput(_item)">
                <v-card-title class="subtitle-1 font-weight-bold">
                    {{ _item.title }}
                </v-card-title>

                <v-card-subtitle :class="{'tabular-nums': _item.price !== undefined}">
                    {{ _item.description || _item.price }}
                </v-card-subtitle>
            </v-card>
        </template>
    </div>
</template>

<script setup="">
const props = defineProps({
    value: {
        type: [String, Object],
        default: null
    },
    items: {
        type: Array,
        required: true
    }
});
const emit = defineEmits(["input"]);

const isItemChecked = item => item.value === props.value;
const emitInput = item => emit("input", item.value);
</script>

<style lang="scss" scoped="">
@import "~vuetify/src/styles/styles.sass";

$optimal-width: 144px;

.radio-grid {
    display: grid;
    grid-gap: .75rem;
    grid-auto-rows: 1fr;
    &:has(> .v-card:nth-child(1)) {
        grid-template-columns: repeat(auto-fill, minmax(#{$optimal-width}, 1fr))
    }
    &:has(> .v-card:nth-child(2)) {
        grid-template-columns: repeat(2, 1fr)
    }
    &:has(> .v-card:nth-child(3)) {
        grid-template-columns: repeat(2, 1fr);
        @media #{map-get($display-breakpoints, "sm-and-up")} {
            grid-template-columns: repeat(auto-fill, minmax(#{$optimal-width}, 1fr))
        }
    }
    &:has(> .v-card:nth-child(4)) {
        grid-template-columns: repeat(2, 1fr);
        @media #{map-get($display-breakpoints, "sm-and-up")} {
            grid-template-columns: repeat(4, 1fr)
        }
    }
    .v-card {
        background: 0 !important;
        &[aria-checked="true"] {
            border-color: $vh-color-primary;
            background: $vh-color-primary;
            color: $vh-color-primary;
            &::before {
                opacity: $vh-card-hover-opacity
            }
            .v-card__subtitle {
                color: rgba($vh-color-primary, .8)
            }
        }
    }
}
</style>
