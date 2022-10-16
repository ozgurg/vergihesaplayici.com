<template>
    <v-btn
        v-ripple="false"
        :class="{'vh-copy-button--copied': isCopied}"
        :aria-label="ariaLabel"
        title="Kopyala"
        class="vh-copy-button ps-4 pe-1"
        plain=""
        @click="copy()">
        <span class="vh-copy-button__icon-1">
            <v-icon size="20">
                {{ icons.mdiContentCopy }}
            </v-icon>
        </span>

        <span class="vh-copy-button__icon-2">
            <v-icon size="24">
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
            }, 1300); // 1000 + transition-duration
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
    }
};
</script>

<style lang="scss">
@import "~vuetify/src/styles/settings/_variables.scss";

.vh-copy-button {
    $self: &;
    &.v-btn {
        min-width: unset !important
    }
    &--copied {
        // TODO: Make the icon white
        .v-btn__content {
            opacity: 1 !important;
        }
        #{$self}__icon-1 {
            opacity: 0
        }
        #{$self}__icon-2 {
            opacity: 1
        }
    }
    &__icon-2 {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: flex;
        place-items: center;
        opacity: 0
    }
    &__icon-1, &__icon-2 {
        @media (prefers-reduced-motion: no-preference) {
            transition: $primary-transition
        }
    }
}
</style>
