<template>
    <v-btn
        :aria-label="ariaLabel"
        title="Kopyala"
        class="mx-n2"
        icon=""
        @click="copy()">
        <v-scroll-y-transition
            origin="center"
            mode="out-in">
            <template v-if="!isCopied">
                <v-icon
                    key="copy"
                    size="20"
                    class="grey--text lighten-3">
                    {{ icons.mdiContentCopy }}
                </v-icon>
            </template>
            <template v-else>
                <v-icon
                    key="copied"
                    size="24"
                    color="primary">
                    {{ icons.mdiCheckCircle }}
                </v-icon>
            </template>
        </v-scroll-y-transition>
    </v-btn>
</template>

<script>
import { mdiCheckCircle, mdiContentCopy } from "@mdi/js";

export default {
    data: () => ({
        icons: {
            mdiCheckCircle,
            mdiContentCopy
        },
        copiedTimeout: null,
        isCopied: false
    }),
    props: {
        valueToCopy: {
            type: String,
            required: true
        },
        containerSelector: {
            type: String,
            default: null
        }
    },
    methods: {
        copy() {
            const vm = this;

            if (vm.isCopied) return;

            vm._copyValue();
            vm._destroyTimeout();

            vm.isCopied = true;
            vm.copiedTimeout = setTimeout(() => {
                vm.isCopied = false;
            }, 1000);
        },
        _copyValue() {
            const vm = this;

            // DO NOT pass "null" as the default value.
            // When "null" is used instead of "false", "$copyText" doesn't behave as expected.
            const container = vm.containerSelector ? document.querySelector(vm.containerSelector) : false;
            vm.$copyText(vm.valueToCopy, container);
        },
        _destroyTimeout() {
            const vm = this;

            if (vm.copiedTimeout !== null) {
                clearTimeout(vm.copiedTimeout);
                vm.copiedTimeout = null;
            }
        }
    },
    computed: {
        ariaLabel() {
            const vm = this;
            return vm.isCopied ? "Kopyalandı" : "Kopyala";
        }
    },
    destroyed() {
        const vm = this;
        vm._destroyTimeout();
    }
};
</script>
