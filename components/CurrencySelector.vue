<template>
    <v-select
        :value="value"
        :items="currencies"
        hide-details=""
        filled=""
        outlined=""
        aria-label="Para birimi"
        @change="emit($event)" />
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            required: true
        }
    },
    methods: {
        emit(value) {
            const vm = this;
            vm.$emit("input", value);
        }
    },
    computed: {
        currencies() {
            const vm = this;
            return vm.$store.getters["exchange-rates/availableCurrencies"];
        }
    }
};
</script>
