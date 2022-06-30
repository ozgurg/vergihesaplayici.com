<template>
    <v-tooltip
        v-bind="$attrs"
        v-model="isTooltipShown"
        allow-overflow=""
        bottom="">
        <template #activator="{ on, attrs }">
            <v-btn
                @click="copy(value)"
                v-on="on"
                v-bind="attrs">
                <v-icon :color="color">
                    {{ icon }}
                </v-icon>
            </v-btn>
        </template>
        <span>Sayfa bağlantısını kopyala</span>
    </v-tooltip>
</template>

<script>
import { mdiCheck, mdiContentCopy } from "@mdi/js";

export default {
    data: () => ({
        icons: {
            mdiCheck,
            mdiContentCopy
        },
        copiedTimeout: null,
        isTooltipShown: false,
        isCopied: false
    }),
    props: {
        value: {
            type: String,
            default: null
        }
    },
    methods: {
        copy(text) {
            const vm = this;

            vm.$copyText(text);

            vm.isTooltipShown = false;
            vm.isCopied = true;

            if (vm.copiedTimeout !== null) {
                clearTimeout(vm.copiedTimeout);
            }

            vm.copiedTimeout = setTimeout(() => {
                vm.isCopied = false;
            }, 1000);
        }
    },
    computed: {
        icon() {
            const vm = this;
            return vm.isCopied ? mdiCheck : mdiContentCopy;
        },
        color() {
            const vm = this;
            return vm.isCopied ? "white" : "grey lighten-1";
        }
    }
};
</script>
