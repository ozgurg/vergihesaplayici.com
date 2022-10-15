<template>
    <v-btn
        v-ripple="false"
        v-bind="$attrs"
        :class="{'vh-copy-button--copied': isCopied}"
        :aria-label="titleByCopyState"
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
        containerId: {
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
            }, 1375); // 1000 + $transition-duration
        },
        _copyValue() {
            const vm = this;

            if (vm.containerId !== null) {
                vm.$copyText(vm.valueToCopy, document.getElementById(vm.containerId));
            } else {
                vm.$copyText(vm.valueToCopy);
            }
        }
    },
    computed: {
        titleByCopyState() {
            const vm = this;
            return vm.isCopied ? "Kopyalandı" : "Kopyala";
        }
    }
};
</script>

<style lang="scss" scoped="">
@import "~vuetify/src/styles/styles.sass";

.vh-copy-button {
    $self: &;
    &.v-btn {
        min-width: unset !important
    }
    &--copied {
        // TODO: Make icon white
        #{$self}__icon-1 {
            opacity: 0
        }
        #{$self}__icon-2 {
            opacity: 1
        }
    }
    &__icon-2 {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: center;
        color: #fff !important;
        opacity: 0
    }
    &__icon-1, &__icon-2 {
        transition: $primary-transition;
        @media (prefers-reduced-motion) {
            transition: none
        }
    }
}
</style>
