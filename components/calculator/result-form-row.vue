<template>
    <form-row
        :label="props.label"
        :is-highlighted="props.isHighlighted"
        direction="horizontal">
        <v-text-field
            :value="props.value"
            :aria-label="props.label"
            dense=""
            class="tabular-nums"
            hide-details=""
            outlined=""
            readonly="">
            <template #append>
                <v-divider
                    class="my-2 me-3"
                    vertical="" />
                <copy-button :value-to-copy="props.value" />
            </template>
        </v-text-field>
    </form-row>
</template>

<script setup="">
const props = defineProps({
    label: {
        type: String,
        default: null
    },
    value: {
        type: String,
        default: null
    },
    isHighlighted: {
        type: Boolean,
        default: false
    }
});
</script>

<style lang="scss" scoped="">
:deep(.v-input__append-inner) {
    padding-inline-start: .75rem !important;
    margin-block: auto !important
}
</style>
