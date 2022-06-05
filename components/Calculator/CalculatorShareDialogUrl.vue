<template>
    <div id="calculatorShareDialogCopyUrl">
        <v-text-field
            :value="url"
            hide-details=""
            outlined=""
            readonly="">
            <template #append>
                <CopyButton
                    :value="url"
                    container-id="calculatorShareDialogCopyUrl" />
            </template>
        </v-text-field>

        <v-checkbox
            v-model="includeCalculatorParams"
            hide-details=""
            label="Hesaplayıcı parametrelerini dahil et" />
    </div>
</template>

<script>
import objectToQueryString from "@/utils/object-to-query-string";

export default {
    data: () => ({
        includeCalculatorParams: true
    }),
    props: {
        data: {
            type: Object,
            required: true
        },
        container: {
            type: String,
            default: null
        }
    },
    computed: {
        url() {
            const vm = this;

            if (vm.includeCalculatorParams) {
                return `${process.env.APP_URL}${vm.$route.path}?${objectToQueryString(vm.data)}`;
            }

            return `${process.env.APP_URL}${vm.$route.path}`;
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
