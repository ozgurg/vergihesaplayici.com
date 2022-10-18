<template>
    <div class="vh-form-row row no-gutters align-center flex-column flex-lg-row">
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
.vh-form-row {
    gap: 6px;
    @media(min-width: 1264px) {
        gap: 24px
    }
    &__label-col {
        @media(min-width: 1264px) {
            text-align: right;
            flex: 0 0 200px;
            max-width: 200px
        }
    }
    .v-input__append-outer {
        margin-top: 0 !important
    }
}
</style>
