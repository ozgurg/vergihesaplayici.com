<template>
    <CalculatorFormRow
        v-bind="$attrs"
        :label="label">
        <v-text-field
            :value="value"
            :aria-label="label"
            dense=""
            hide-details=""
            outlined=""
            readonly="">
            <template slot="append">
                <CopyButton :value="value" />
            </template>
        </v-text-field>
    </CalculatorFormRow>
</template>

<script>
export default {
    props: {
        label: {
            type: String
        },
        value: {
            type: String
        }
    }
};
</script>

<style scoped="">
/deep/ .v-input__append-inner {
    padding-left: 12px !important;
    margin-top: auto !important;
    margin-bottom: auto !important
}

/deep/ .v-input__slot {
    padding-right: 0 !important
}
</style>
