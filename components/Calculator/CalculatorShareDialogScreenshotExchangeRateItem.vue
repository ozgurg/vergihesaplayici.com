<template>
    <div>
        <div class="grey--text caption">
            1 {{ currencyCode }} =
        </div>

        <template v-if="isLoading">
            <v-skeleton-loader
                class="mx-auto mb-0"
                max-height="21"
                max-width="42"
                width="100%"
                type="image" />
        </template>
        <template v-else>
            <div class="grey--text text--lighten-1">
                <template v-if="exchangeRate">
                    {{ moneyFormat(exchangeRate.rate, "TRY") }}
                </template>
                <template v-else>
                    <v-icon
                        color="red"
                        size="20">
                        {{ errorIcon }}
                    </v-icon>
                </template>
            </div>
        </template>
    </div>
</template>

<script>
import { mdiAlertCircle } from "@mdi/js";
import { moneyFormat } from "@/utils/formatter.js";

export default {
    data: () => ({
        errorIcon: mdiAlertCircle,
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
                    // To disable default error behavior
                })
                .finally(() => {
                    vm.isLoading = false;
                });
        }
    },
    mounted() {
        const vm = this;
        vm._load();
    }
};
</script>
