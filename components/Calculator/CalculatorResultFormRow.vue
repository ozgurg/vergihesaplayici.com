<template>
    <FormRow
        :label="label"
        direction="horizontal">
        <v-text-field
            :value="value"
            :aria-label="label"
            dense=""
            class="tabular-nums"
            hide-details=""
            outlined=""
            readonly="">
            <template #append>
                <v-divider
                    class="my-2 me-3"
                    vertical="" />
                <copy-icon-button :value-to-copy="value" />
            </template>
        </v-text-field>
    </FormRow>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: null
        },
        value: {
            type: String,
            default: null
        }
    }
};
</script>

<style scoped="">
:deep(.v-input__append-inner) {
    padding-inline-start: .75rem !important;
    margin-block: auto !important
}
</style>
