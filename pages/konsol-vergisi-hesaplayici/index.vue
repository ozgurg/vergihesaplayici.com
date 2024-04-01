<template>
    <div>
        <app-breadcrumbs :items="page.breadcrumbs" />

        <heading-1>
            {{ page.title }}
        </heading-1>

        <div class="d-flex flex-column gap-16">
            <div>
                <inner-container>
                    <form-row>
                        <heading-2>
                            Hazır hesaplamalar
                        </heading-2>
                        <div class="d-flex flex-column gap-12">
                            <template v-for="_calculation in ui.calculations">
                                <div :key="_calculation.brand.id">
                                    <calculation-presets
                                        :presets="_calculation.presets"
                                        :brand="_calculation.brand" />
                                </div>
                            </template>
                        </div>
                    </form-row>
                </inner-container>
            </div>

            <div>
                <heading-2>
                    Kendiniz hesaplayın
                </heading-2>
                <calculator-inner-container>
                    <form-row
                        class="mb-10"
                        label="Konsol fiyatı">
                        <v-row>
                            <v-col>
                                <v-text-field
                                    v-model.number="form.price"
                                    v-number=""
                                    :prefix="selectedCurrency.sign"
                                    class="tabular-nums"
                                    hide-details=""
                                    hide-spin-buttons=""
                                    filled=""
                                    outlined=""
                                    min="1"
                                    inputmode="decimal"
                                    type="number"
                                    aria-label="Konsol fiyatı" />
                            </v-col>
                            <v-col
                                cols="4"
                                md="3">
                                <currency-selector v-model="form.currency" />
                            </v-col>
                        </v-row>
                    </form-row>

                    <template v-if="shouldShowResults">
                        <form-row>
                            <template v-if="form.currency === 'TRY'">
                                <reverse-calculation-alert />
                            </template>
                            <template v-else>
                                <estimated-calculation-alert />
                            </template>
                        </form-row>

                        <CalculatorResultList
                            :items="resultList"
                            class="mb-5" />

                        <form-row>
                            <affordability-alert
                                :price="results.prices.taxAdded"
                                class="mb-10" />
                        </form-row>

                        <form-row
                            label="Sonuçları paylaş"
                            direction="horizontal">
                            <calculator-quick-share
                                :query-string="form"
                                @click:other="showShareDialog()" />
                            <calculator-share-dialog
                                v-model="ui.isShareDialogShown"
                                :screenshot-input="screenshotInput"
                                :screenshot-output="resultList"
                                :form="form"
                                :calculator-title="page.title" />
                        </form-row>
                    </template>
                </calculator-inner-container>
            </div>
        </div>
    </div>
</template>

<script>
import Calculator from "@/domain/konsol-vergisi-hesaplayici/calculator.js";
import { KonsolVergisiHesaplayiciPageDef } from "@/domain/konsol-vergisi-hesaplayici/index.page-def.js";
import {
    buildResultList,
    buildScreenshotInput,
    handleQuery,
    shouldShowResults
} from "@/domain/konsol-vergisi-hesaplayici/utils.js";
import { buildCalculations } from "@/domain/konsol-vergisi-hesaplayici/db/_index.js";

const konsolVergisiHesaplayiciPage = KonsolVergisiHesaplayiciPageDef();

export default {
    head() {
        return this.page.head;
    },
    data: () => ({
        page: konsolVergisiHesaplayiciPage,
        ui: {
            calculations: buildCalculations(),
            isShareDialogShown: false
        },
        form: {
            currency: "USD",
            price: ""
        },
        results: {}
    }),
    methods: {
        showShareDialog() {
            const vm = this;
            vm.ui.isShareDialogShown = true;
        },
        _calculate() {
            const vm = this;

            const calculator = new Calculator({
                price: vm.form.price * vm.selectedCurrency.rate
            }, {
                calculateFromTaxAddedPrice: vm.form.currency === "TRY"
            });

            vm.results = calculator.calculate();
        },
        _handleQuery() {
            const vm = this;

            const query = handleQuery(vm.$route.query, {
                availableCurrencies: vm.$store.getters["exchange-rates/availableCurrencies"]
            });
            if (query) {
                Object.assign(vm.form, query);
            }
        }
    },
    computed: {
        selectedCurrency() {
            const vm = this;
            return vm.$store.getters["exchange-rates/currencies"][vm.form.currency];
        },
        shouldShowResults() {
            const vm = this;
            return shouldShowResults(vm.form);
        },
        resultList() {
            const vm = this;
            return buildResultList(vm.results);
        },
        screenshotInput() {
            const vm = this;
            return buildScreenshotInput({
                price: vm.form.price,
                currency: vm.form.currency
            });
        }
    },
    watch: {
        form: {
            deep: true,
            handler() {
                const vm = this;

                if (!vm.shouldShowResults) return;

                vm._calculate();

                vm.$router.push({ query: vm.form });
            }
        }
    },
    mounted() {
        const vm = this;
        vm.$nextTick(() => vm._handleQuery());
    }
};
</script>
