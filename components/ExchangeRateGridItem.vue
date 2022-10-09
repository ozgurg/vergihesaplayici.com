<template>
    <v-col
        v-bind="$attrs"
        cols="6">
        <v-card
            elevation="0"
            class="px-4 py-3">
            <v-card-subtitle class="pa-0 ma-0 mb-1">
                1 {{ currencyCode }} =
            </v-card-subtitle>

            <template v-if="isLoading">
                <v-skeleton-loader
                    class="mb-0 rounded w-100"
                    max-height="32"
                    width="100%"
                    type="image" />
            </template>
            <template v-else>
                <v-card-title class="pa-0 ma-0">
                    <template v-if="exchangeRate">
                        {{ moneyFormat(exchangeRate.rate, "TRY") }}
                    </template>
                    <template v-else>
                        <!--
                        Wrapping with "div" makes height same as "v-skeleton loader".
                        This prevents layout shifting.
                        -->
                        <div>
                            <v-icon color="red">
                                {{ icons.mdiAlertCircle }}
                            </v-icon>
                        </div>
                    </template>
                </v-card-title>
            </template>
        </v-card>
    </v-col>
</template>

<script>
import { mdiAlertCircle } from "@mdi/js";
import { moneyFormat } from "@/utils/formatter.js";

export default {
    data: () => ({
        icons: {
            mdiAlertCircle
        },
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

            vm.isLoading = true;

            await vm.$store.dispatch("exchange-rates/loadExchangeRateFromApi", vm.currencyCode)
                .then(exchangeRate => {
                    vm.exchangeRate = exchangeRate;
                }).catch(() => {
                    // To disable default error behavior
                });

            vm.isLoading = false;
        }
    },
    async mounted() {
        const vm = this;
        await vm._load();
    }
};
</script>
