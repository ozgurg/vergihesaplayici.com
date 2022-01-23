<template>
    <v-card
        v-bind="$attrs"
        outlined=""
        class="px-5 py-4"
        flat="">
        <v-card-subtitle class="pa-0 ma-0 mb-1">{{ currency }}</v-card-subtitle>

        <v-skeleton-loader
            v-if="isLoading"
            class="mx-auto mb-0"
            max-height="32"
            width="100%"
            type="image" />

        <v-card-title
            v-else
            class="pa-0 ma-0">
            <template v-if="exchangeRate !== null">
                {{ $moneyFormat(exchangeRate.rate, "TRY") }}
            </template>

            <div v-else>
                <v-tooltip bottom="">
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            v-bind="attrs"
                            v-on="on"
                            color="red">
                            mdi-alert
                        </v-icon>
                    </template>
                    <span>Kur yüklenirken bir hata oluştu</span>
                </v-tooltip>
            </div>
        </v-card-title>
    </v-card>
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

            setTimeout(() => vm.isLoading = false, 100);
        }
    },
    async mounted() {
        const vm = this;
        await vm.load();
    }
};
</script>
