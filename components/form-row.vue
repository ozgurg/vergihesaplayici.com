<template>
    <div
        :class="{
            'horizontal': props.direction === 'horizontal',
            'highlighted': isHighlighted
        }"
        class="form-row">
        <div>
            <template v-if="props.label !== null">
                <label>
                    {{ props.label }}
                </label>
            </template>
        </div>

        <div>
            <slot v-if="$slots.default" />
        </div>
    </div>
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
    },
    isHighlighted: {
        type: Boolean,
        default: false
    }
});
</script>

<style lang="scss" scoped="">
@import "~vuetify/src/components/VTextField/_variables.scss";

.form-row {
    --vh-form-row-label-col-width: 100%;
    --vh-form-row-label-justify-content: flex-start;
    display: flex;
    flex-flow: column nowrap;
    gap: .375rem;
    &.horizontal {
        flex-direction: column;
        @media #{map-get($display-breakpoints, "sm-and-up")} {
            --vh-form-row-label-col-width: 170px; // Optimized for "TRT bandrolü (€20,00)" text
            --vh-form-row-label-justify-content: flex-end;
            flex-direction: row;
            gap: 1rem
        }
    }
    &.highlighted {
        label {
            font-weight: 700;
            color: $vh-color-primary
        }
    }
    & > div:first-child {
        flex: 0 0 var(--vh-form-row-label-col-width);
        max-width: var(--vh-form-row-label-col-width);
        label {
            height: min(#{$text-field-filled-full-width-outlined-slot-min-height}, 100%);
            display: flex;
            align-items: center;
            justify-content: var(--vh-form-row-label-justify-content)
        }
    }
    & > div:last-child {
        flex: 1;
        width: 100%
    }
}
</style>
