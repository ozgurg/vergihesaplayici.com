<template>
    <div class="vh-form-row row no-gutters flex-column flex-sm-row">
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
        }
    }
};
</script>

<!-- Be careful while using "scoped" -->
<style lang="scss">
@import "~vuetify/src/components/VTextField/_variables.scss";
@import "~vuetify/src/styles/styles.sass";

.vh-form-row {
    gap: 6px;
    @media #{map-get($display-breakpoints, "sm-and-up")} {
        gap: 24px
    }

    &__label-col {
        @media #{map-get($display-breakpoints, "sm-and-up")} {
            $width: 170px; // Optimized for "TRT bandrolü (€20,00)" label
            text-align: right;
            flex: 0 0 $width;
            max-width: $width;
            label {
                height: min(#{$text-field-filled-full-width-outlined-slot-min-height}, 100%);
                display: flex;
                align-items: center;
                justify-content: flex-end
            }
        }
    }

    .v-input__append-outer {
        margin-top: 0 !important
    }
}
</style>
