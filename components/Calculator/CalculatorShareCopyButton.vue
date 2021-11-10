<template>
    <v-tooltip
        v-model="isTooltipShown"
        allow-overflow=""
        bottom="">
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

            vm.isTooltipShown = true;
            vm.isCopied = true;

            if (vm.copiedTimeout !== null) {
                clearTimeout(vm.copiedTimeout);
            }

            vm.copiedTimeout = setTimeout(() => {
                vm.isTooltipShown = false;
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
