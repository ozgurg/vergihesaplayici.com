<template>
    <div>
        <div class="grey--text caption">
            {{ currencyCode }}
        </div>

        <template v-if="isLoading">
            <v-skeleton-loader
                class="mx-auto mb-0"
                max-height="21"
                max-width="42"
                width="100%"
                type="image" />
        </template>
        <template v-else-if="exchangeRate !== null">
            <span class="grey--text text--lighten-1">
                {{ moneyFormat(exchangeRate.rate, "TRY") }}
            </span>
        </template>
        <template v-else>
            Hata 😊
        </template>
    </div>
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
            vm.exchangeRate = null;
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
