<template>
    <div
        v-bind="$attrs"
        class="vh-form-row row align-center no-gutters flex-column flex-lg-row">
        <div class="vh-form-row__label-col col">
            <label v-if="label">
                {{ label }}
            </label>
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

<style lang="scss">
.vh-form-row {
    gap: 8px;
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
}
</style>

<style scoped="">
:deep(.v-input__append-outer) {
    margin-top: 0 !important
}
</style>
