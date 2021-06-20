<template>
    <v-card
        v-bind="$attrs"
        class="text-center">
        <v-card-subtitle class="pb-0 pt-2">{{ currencyTitle }}</v-card-subtitle>

        <v-card-title class="justify-center pt-0 pb-2 px-0">
            <div class="w-100 mx-auto">
				<span
                    v-if="isLoaded"
                    class="d-block">
                    {{ $moneyFormat(exchangeRate.rate, "TRY") }}
                </span>

                <v-skeleton-loader
                    v-else
                    class="mx-auto"
                    max-height="32"
                    max-width="64"
                    type="image" />
            </div>
        </v-card-title>
    </v-card>
</template>

<script>
export default {
    name: "ExchangeRateItem",
    data: () => ({
        isLoaded: false,
        exchangeRate: {}
    }),
    props: {
        currency: {
            type: String,
            required: true
        }
    },
    computed: {
        currencyTitle() {
            const vm = this;
            return vm.$store.get(`exchangeRates/currencies@${vm.currency}.title`);
        }
    },
    mounted() {
        const vm = this;
        vm.$store.dispatch("exchangeRates/loadExchangeRateFromApi", vm.currency)
            .then(() => {
                vm.exchangeRate = vm.$store.get(`exchangeRates/currencies@${vm.currency}`);
                vm.isLoaded = true;
            });
    }
};
</script>

<style lang="scss" scoped="">
span {
	line-height: 32px
}
</style>
