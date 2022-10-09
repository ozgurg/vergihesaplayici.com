<template>
    <v-btn
        v-ripple="false"
        @click="copy()"
        v-bind="$attrs"
        :class="{'pointer-events-none': isCopied}"
        plain=""
        text=""
        tile="">
        {{ text }}
    </v-btn>
</template>

<script>
export default {
    data: () => ({
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

            vm._copyText();

            if (vm.copiedTimeout !== null) {
                clearTimeout(vm.copiedTimeout);
            }

            vm.isCopied = true;

            vm.copiedTimeout = setTimeout(() => {
                vm.isCopied = false;
            }, 1000);
        },
        _copyText() {
            const vm = this;

            if (vm.containerId !== null) {
                vm.$copyText(vm.valueToCopy, document.getElementById(vm.containerId));
            } else {
                vm.$copyText(vm.valueToCopy);
            }
        }
    },
    computed: {
        text() {
            const vm = this;
            return vm.isCopied ? "Kopyalandı" : "Kopyala";
        }
    }
};
</script>
