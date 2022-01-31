<template>
    <v-btn
        v-ripple="false"
        @click="copy(value)"
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
        value: {
            type: String,
            default: null
        },
        containerId: {
            type: String,
            default: null
        }
    },
    methods: {
        copy(text) {
            const vm = this;

            if (vm.containerId !== null) {
                vm.$copyText(text, document.getElementById(vm.containerId));
            } else {
                vm.$copyText(text);
            }

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
        text() {
            const vm = this;
            return vm.isCopied ? "Kopyalandı" : "Kopyala";
        }
    }
};
</script>
