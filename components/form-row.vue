<template>
    <v-row
        :class="{'vh-form-row--horizontal': props.label === 'horizontal'}"
        no-gutters=""
        class="vh-form-row flex-column flex-sm-row">
        <v-col class="vh-form-row__label-col">
            <template v-if="props.label">
                <label>
                    {{ props.label }}
                </label>
            </template>
        </v-col>

        <v-col>
            <slot />
        </v-col>
    </v-row>
</template>

<script setup="">
const props = defineProps({
    label: {
        type: String,
        default: null
    },
    direction: {
        type: String,
        default: "vertical"
    }
});
</script>

<style lang="scss" scoped="">
@import "~vuetify/src/components/VTextField/_variables.scss";

.vh-form-row {
    $self: &;
    gap: var(--vh-form-row-gap);
    --vh-form-row-gap: .375rem;
    --vh-form-row-label-col-width: 100%;
    --vh-form-row-label-justify-content: flex-start;
    &--horizontal {
        @media #{map-get($display-breakpoints, "sm-and-up")} {
            --vh-form-row-gap: 1rem;
            --vh-form-row-label-col-width: 170px; // Optimized for "TRT bandrolü (€20,00)" text
            --vh-form-row-label-justify-content: flex-end
        }
    }
    &__label-col {
        flex: 0 0 var(--vh-form-row-label-col-width);
        max-width: var(--vh-form-row-label-col-width);
        label {
            height: min(#{$text-field-filled-full-width-outlined-slot-min-height}, 100%);
            display: flex;
            align-items: center;
            justify-content: var(--vh-form-row-label-justify-content)
        }
    }
    :deep(.v-input__append-outer) {
        margin-block-start: 0 !important
    }
}
</style>
