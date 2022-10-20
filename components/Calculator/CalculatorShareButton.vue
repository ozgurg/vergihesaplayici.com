<template>
    <div>
        <v-btn
            outlined=""
            color="primary"
            large=""
            @click="openShareDialog()">
            <v-icon left="">
                {{ icon }}
            </v-icon>
            <span>Paylaş...</span>
        </v-btn>

        <CalculatorShareDialog
            v-model="isShareDialogShown"
            v-bind="$attrs" />
    </div>
</template>

<script>
import { mdiShare } from "@mdi/js";

export default {
    data: () => ({
        icon: mdiShare,
        isShareDialogShown: false
    }),
    methods: {
        openShareDialog() {
            const vm = this;
            vm.isShareDialogShown = true;
        }
    }
};
</script>
