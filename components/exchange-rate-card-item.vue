<template>
    <v-card
        elevation="0"
        class="pa-4">
        <v-card-text class="pa-0">
            {{ currencyCode }}
        </v-card-text>

        <template v-if="isLoading">
            <v-skeleton-loader
                class="mb-0"
                max-width="68"
                max-height="32"
                width="100%"
                type="image" />
        </template>
        <template v-else>
            <v-card-title class="pa-0">
                <template v-if="exchangeRate">
                    <span class="tabular-nums">
                        {{ moneyFormat(exchangeRate.rate, "TRY") }}
                    </span>
                </template>
                <template v-else>
                    <!--
                    Wrapping with "div" makes height same as "v-skeleton-loader".
                    This prevents layout shifting.
                    -->
                    <div class="red--text">
                        Hata 😊
                    </div>
                </template>
            </v-card-title>
        </template>
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
        _load() {
            const vm = this;
            vm.$store.dispatch("exchange-rates/loadExchangeRateFromApi", vm.currencyCode)
                .then(exchangeRate => {
                    vm.exchangeRate = exchangeRate;
                })
                .catch(() => {
                    vm.exchangeRate = null;
                })
                .finally(() => {
                    setTimeout(() => {
                        vm.isLoading = false;
                    }, 195);
                });
        }
    },
    mounted() {
        const vm = this;
        vm._load();
    }
};
</script>
