<template>
    <div
        :class="className"
        class="vh-form-row row no-gutters flex-column flex-sm-row">
        <div class="vh-form-row__label-col col">
            <template v-if="label">
                <label>
                    {{ label }}
                </label>
            </template>
        </div>

        <div class="col">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: null
        },
        isHorizontal: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        className() {
            const vm = this;
            return {
                "vh-form-row--horizontal": vm.isHorizontal,
                "vh-form-row--vertical": !vm.isHorizontal
            };
        }
    }
};
</script>

<!-- Be careful while using "scoped" -->
<style lang="scss">
@import "~vuetify/src/components/VTextField/_variables.scss";
@import "~vuetify/src/styles/styles.sass";

.vh-form-row {
    $self: &;
    gap: var(--vh-form-row-gap);

    &--vertical {
        --vh-form-row-gap: .5rem;
        --vh-form-row-label-col-width: 100%;
        --vh-form-row-label-justify-content: flex-start
    }

    &--horizontal {
        --vh-form-row-gap: .5rem;
        --vh-form-row-label-col-width: 100%;
        --vh-form-row-label-justify-content: flex-start;

        @media #{map-get($display-breakpoints, "sm-and-up")} {
            --vh-form-row-gap: 1.5rem;
            --vh-form-row-label-col-width: 170px; // Optimized for "TRT bandrolü (€20,00)" text
            --vh-form-row-label-justify-content: flex-end
        }
    }

    &__label-col {
        text-align: right;
        flex: 0 0 var(--vh-form-row-label-col-width);
        max-width: var(--vh-form-row-label-col-width);

        label {
            height: min(#{$text-field-filled-full-width-outlined-slot-min-height}, 100%);
            display: flex;
            align-items: center;
            justify-content: var(--vh-form-row-label-justify-content)
        }
    }

    .v-input__append-outer {
        margin-top: 0 !important
    }
}
</style>
