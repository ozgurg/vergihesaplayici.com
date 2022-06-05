<template>
	<v-select
        @change="emit($event)"
        v-bind="$attrs"
        :value="value"
        :items="currencies"
        hide-details=""
        outlined=""
        aria-label="Para birimi" />
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
