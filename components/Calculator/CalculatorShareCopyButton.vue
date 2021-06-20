<template>
    <v-tooltip right="">
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                v-bind="attrs"
                v-on="on"
                @click="copy(value)">
                <v-icon color="primary">{{ icon }}</v-icon>
            </v-btn>
        </template>
        <span>{{ title }}</span>
    </v-tooltip>
</template>

<script>
export default {
    name: "CalculatorShareCopyButton",
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
            return vm.isCopied ? "Kopyalandı!" : "Sayfa bağlantısını kopyala";
        },
        icon() {
            const vm = this;
            return vm.isCopied ? "mdi-check" : "mdi-link";
        }
    }
};
</script>
