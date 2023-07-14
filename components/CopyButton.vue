<template>
    <v-btn
        :aria-checked="isCopied ? 'true' : 'false'"
        :aria-label="ariaLabel"
        title="Kopyala"
        class="vh-copy-button mx-n2"
        icon=""
        @click="copy()">
        <span class="vh-copy-button__copy-icon">
            <v-icon
                size="20"
                class="grey--text lighten-3">
                {{ icons.mdiContentCopy }}
            </v-icon>
        </span>
        <span class="vh-copy-button__check-icon">
            <v-icon
                size="24"
                color="primary">
                {{ icons.mdiCheck }}
            </v-icon>
        </span>
    </v-btn>
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

            // Prevent multiple copying
            if (vm.isCopied) return;

            vm._copyValue();

            if (vm.copiedTimeout !== null) {
                clearTimeout(vm.copiedTimeout);
            }

            vm.isCopied = true;

            vm.copiedTimeout = setTimeout(() => {
                vm.isCopied = false;
            }, 1200); // 1000 + $secondary-transition's duration
        },
        _copyValue() {
            const vm = this;

            if (vm.containerSelector !== null) {
                vm.$copyText(vm.valueToCopy, document.querySelector(vm.containerSelector));
            } else {
                vm.$copyText(vm.valueToCopy);
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
        clearTimeout(vm.copiedTimeout);
    }
};
</script>

<style lang="scss" scoped="">
@import "~vuetify/src/styles/settings/_variables.scss";

.vh-copy-button {
    $self: &;
    min-width: unset !important;
    &[aria-checked="true"] {
        #{$self}__copy-icon {
            opacity: 0
        }
        #{$self}__check-icon {
            opacity: 1
        }
    }
    &__check-icon {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        flex-flow: column wrap;
        justify-content: center;
        opacity: 0
    }
    &__copy-icon,
    &__check-icon {
        transition: opacity $secondary-transition
    }
}
</style>
