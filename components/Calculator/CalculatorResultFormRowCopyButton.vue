<template>
    <v-tooltip
        v-model="isTooltipShown"
        allow-overflow=""
        right="">
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                v-bind="attrs"
                v-on="on"
                @click="copy(value)"
                icon="">
                <v-icon :color="color">{{ icon }}</v-icon>
            </v-btn>
        </template>
        <span>Sonucu kopyala</span>
    </v-tooltip>
</template>

<script>
export default {
    data: () => ({
        copiedTimeout: null,
        isTooltipShown: false,
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
            return vm.isCopied ? "mdi-check" : "mdi-content-copy";
        },
        color() {
            const vm = this;
            return vm.isCopied ? "white" : "grey lighten-1";
        }
    }
};
</script>
