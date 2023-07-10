<template>
    <FormRow
        :label="label"
        :is-horizontal="true">
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
                <CopyButton :value-to-copy="value" />
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
    padding-left: 12px !important;
    margin-top: auto !important;
    margin-bottom: auto !important
}
</style>
