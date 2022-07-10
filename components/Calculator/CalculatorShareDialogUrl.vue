<template>
    <div
        v-bind="$attrs"
        id="calculatorShareDialogCopyUrl">
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
            v-model="willIncludeParams"
            hide-details=""
            label="Hesaplayıcı parametrelerini dahil et" />
    </div>
</template>

<script>
import { createShareUrlOfCalculator } from "@/utils/create-share-url-of-calculator";

export default {
    data: () => ({
        willIncludeParams: true
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
            return createShareUrlOfCalculator(
                vm.$route.path,
                vm.data,
                vm.willIncludeParams
            );
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
