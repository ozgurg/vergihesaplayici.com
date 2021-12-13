<template>
    <v-btn
        v-bind="$attrs"
        v-ripple="false"
        plain
        text
        tile
        @click="copy(value)">
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
        text() {
            const vm = this;
            return vm.isCopied ? "Kopyalandı" : "Kopyala";
        }
    }
};
</script>
