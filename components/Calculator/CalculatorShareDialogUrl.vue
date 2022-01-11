<template>
    <div id="calculatorShareDialogCopyUrl">
        <v-text-field
            :value="url"
            hide-details=""
            outlined=""
            readonly="">
            <template slot="append">
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
import querystring from "querystring";

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
            type: String
        }
    },
    computed: {
        url() {
            const vm = this;

            if (vm.includeCalculatorParams) {
                return `${process.env.APP_URL}${vm.$route.path}?${querystring.stringify(vm.data)}`;
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
