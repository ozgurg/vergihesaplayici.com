<template>
    <v-card
        v-bind="$attrs"
        class="text-center"
        elevation="0">
        <v-card-subtitle class="pb-0 pt-2">{{ currency }}</v-card-subtitle>

        <v-card-title class="justify-center pt-0 pb-2 px-0">
            <div class="mx-auto">
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
    methods: {
        async load() {
            const vm = this;

            vm.isLoaded = false;

            vm.exchangeRate = await vm.$store.dispatch("exchange-rates/loadExchangeRateFromApi", vm.currency);

            vm.isLoaded = true;
        }
    },
    async mounted() {
        const vm = this;
        await vm.load();
    }
};
</script>
