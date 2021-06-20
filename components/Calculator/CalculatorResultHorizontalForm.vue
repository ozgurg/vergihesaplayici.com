<template>
    <CalculatorHorizontalForm
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
                <CalculatorResultHorizontalFormCopyButton :value="value" />
            </template>
        </v-text-field>
    </CalculatorHorizontalForm>
</template>

<script>
export default {
    name: "CalculatorResultHorizontalForm",
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
    margin-top: 2px !important
}

/deep/ .v-input__slot {
    padding-right: 4px !important
}
</style>
