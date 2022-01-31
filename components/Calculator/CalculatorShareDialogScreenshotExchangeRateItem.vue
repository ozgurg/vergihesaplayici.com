<template>
    <div>
        <div class="grey--text caption">
            {{ currency }}
        </div>

        <v-skeleton-loader
            v-if="isLoading || exchangeRate === null"
            class="mx-auto mb-0"
            max-height="21"
            max-width="42"
            width="100%"
            type="image" />

        <div
            v-else
            class="pa-0 ma-0 grey--text text--lighten-1">
            {{ $moneyFormat(exchangeRate.rate, "TRY") }}
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        isLoading: false,
        exchangeRate: null
    }),
    props: {
        currency: {
            type: String,
            required: true
        }
    },
    methods: {
        async load() {
            const vm = this;

            vm.isLoading = true;

            await vm.$store.dispatch("exchange-rates/loadExchangeRateFromApi", vm.currency)
                .then(exchangeRate => {
                    vm.exchangeRate = exchangeRate;
                }).catch(() => {
                    // To disable default error behavior
                });

            setTimeout(() => {
                vm.isLoading = false;
            }, 100);
        }
    },
    async mounted() {
        const vm = this;
        await vm.load();
    }
};
</script>
