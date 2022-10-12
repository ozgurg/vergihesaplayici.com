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
                <div class="py-2">
                    <v-divider vertical="" />
                </div>
                <CopyButton
                    :value-to-copy="url"
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
import { createShareUrlOfCalculator } from "@/utils/create-share-url-of-calculator.js";

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
:deep(.v-input__append-inner) {
    padding-left: 12px !important;
    margin-top: auto !important;
    margin-bottom: auto !important
}
</style>
