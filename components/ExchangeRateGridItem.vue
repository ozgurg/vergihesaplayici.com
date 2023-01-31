<template>
    <v-col cols="6">
        <v-card
            color="grey darken-4"
            elevation="0"
            class="pa-4">
            <div class="text-body-2 text--secondary mb-1">
                {{ currencyCode }}
            </div>

            <template v-if="isLoading">
                <v-skeleton-loader
                    class="mb-0"
                    max-width="56"
                    max-height="24"
                    width="100%"
                    type="image" />
            </template>
            <template v-else>
                <vdiv class="text-body-1 tabular-nums font-weight-medium">
                    <template v-if="exchangeRate">
                        {{ moneyFormat(exchangeRate.rate, "TRY") }}
                    </template>
                    <template v-else>
                        <!--
                        Wrapping with "div" makes height same as "v-skeleton-loader".
                        This prevents layout shifting.
                        -->
                        <div>
                            <v-icon color="red">
                                {{ errorIcon }}
                            </v-icon>
                        </div>
                    </template>
                </vdiv>
            </template>
        </v-card>
    </v-col>
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
                    vm.exchangeRate = null;
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
