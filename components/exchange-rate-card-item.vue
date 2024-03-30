<template>
    <v-card elevation="0">
        <v-card-subtitle class="pb-0">
            {{ currencyCode }}
        </v-card-subtitle>

        <v-card-title class="pt-0">
            <template v-if="isLoading">
                <v-skeleton-loader
                    class="mb-0"
                    max-width="68"
                    max-height="32"
                    width="100%"
                    type="image" />
            </template>
            <template v-else-if="exchangeRate !== null">
                <span class="tabular-nums">
                    {{ moneyFormat(exchangeRate.rate, "TRY") }}
                </span>
            </template>
            <template v-else>
                Hata 😊
            </template>
        </v-card-title>
    </v-card>
</template>

<script>
import { moneyFormat } from "@/utils/formatter.js";

export default {
    data: () => ({
        isLoading: true,
        exchangeRate: null
    }),
    props: {
        currencyCode: {
            type: String,
            required: true
        }
    },
    methods: {
        moneyFormat,
        async _load() {
            const vm = this;
            try {
                vm.exchangeRate = await vm.$store.dispatch("exchange-rates/loadExchangeRateFromApi", vm.currencyCode);
            } catch (error) {
                vm.exchangeRate = null;
            } finally {
                vm.isLoading = false;
            }
        }
    },
    mounted() {
        const vm = this;
        vm._load();
    }
};
</script>
