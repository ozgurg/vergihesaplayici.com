<template>
    <v-tooltip right="">
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                v-bind="attrs"
                v-on="on"
                @click="copy(value)"
                :color="color"
                icon="">
                <v-icon>{{ icon }}</v-icon>
            </v-btn>
        </template>
        <span>{{ title }}</span>
    </v-tooltip>
</template>

<script>
export default {
    name: "CalculatorResultHorizontalFormCopyButton",
    data: () => ({
        copiedTimeout: null,
        isCopied: false
    }),
    props: {
        value: {
            type: String
        }
    },
    methods: {
        copy(text) {
            const vm = this;

            vm.$copyText(text);

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
        title() {
            const vm = this;
            return vm.isCopied ? "Kopyalandı!" : "Kopyala";
        },
        icon() {
            const vm = this;
            return vm.isCopied ? "mdi-clipboard-check" : "mdi-clipboard-outline";
        },
        color() {
            const vm = this;
            return vm.isCopied ? "white" : "grey lighten-1";
        }
    }
};
</script>
