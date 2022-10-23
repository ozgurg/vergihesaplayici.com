<template>
    <div>
        <AppBreadcrumbs :items="breadcrumbItems" />

        <PageTitle>
            {{ head.title }}
        </PageTitle>

        <InnerContainer>
            <FormRow class="mb-5">
                <CalculatorPresets
                    :value="matchingPresetIds"
                    :presets="ui.presets"
                    @click="choosePreset($event)" />
            </FormRow>

            <FormRow
                class="mb-10"
                label="Telefon fiyatı">
                <v-text-field
                    v-model.number="form.price"
                    :prefix="selectedCurrency.sign"
                    hide-details=""
                    hide-spin-buttons=""
                    filled=""
                    outlined=""
                    step="any"
                    min="1"
                    inputmode="decimal"
                    type="number"
                    aria-label="Telefon fiyatı">
                    <template #append-outer>
                        <CurrencySelector
                            v-model="form.currency"
                            style="width:96px" />
                    </template>
                </v-text-field>
            </FormRow>

            <FormRow
                class="mb-10"
                label="Kayıt yolu">
                <RadioGrid
                    v-model="form.registration"
                    :items="ui.registration"
                    cols="6"
                    md="5"
                    lg="4" />
            </FormRow>

            <CalculatorResultTabs
                v-model="ui.tab"
                :should-show-results="shouldShowResults">
                <template v-if="shouldShowResults">
                    <template v-if="form.currency === 'TRY'">
                        <ReverseCalculationAlert />
                    </template>
                    <template v-else>
                        <EstimatedCalculationAlert />
                    </template>

                    <CalculatorResultList
                        :items="resultList"
                        class="mb-5" />

                    <FormRow>
                        <MinimumWageAlert
                            :price="results.prices.taxAdded"
                            class="mb-10" />

                        <CalculatorShareButton
                            :screenshot-input="screenshotInput"
                            :screenshot-output="screenshotOutput"
                            :form="form"
                            :calculator-title="head.title"
                            :preset-title="matchingPresetTitles" />
                    </FormRow>
                </template>
            </CalculatorResultTabs>
        </InnerContainer>
    </div>
</template>

<script>
import PhoneTaxCalculator, { Registration } from "@/calculators/PhoneTaxCalculator.js";
import { PhoneTaxCalculator as calculator } from "@/data/calculators.js";
import {
    createCalculatorMatchingPresetIds,
    createCalculatorMatchingPresetTitles,
    findCalculatorMatchingPresets
} from "@/utils/find-calculator-matching-presets.js";
import { moneyFormat } from "@/utils/formatter.js";
import { buildHeadTags } from "@/utils/build-head-tags.js";
import { handleQuery, shouldShowResults } from "@/utils/calculator/phone-tax-calculator.js";

export default {
    head() {
        return this.head;
    },
    data: () => ({
        head: buildHeadTags({
            title: calculator.title,
            description: calculator.description,
            ogImageName: "telefon-vergisi-hesaplayici.jpg"
        }),
        ui: {
            presets: calculator.presets,
            registration: [
                {
                    title: "İthalat ile",
                    description: "İthalatçıların ithal edip sattığı ürünlerdir. \"Resmi\" olarak da bilinir.",
                    value: Registration.Import
                },
                {
                    title: "Pasaport ile",
                    description: "Yurt dışına giden kişinin yanında getirip kayıt ettirdiği ürünlerdir.",
                    value: Registration.Passport
                }
            ],
            tab: 1
        },
        form: {
            currency: "USD",
            price: "",
            registration: Registration.Import
        },
        results: {}
    }),
    methods: {
        choosePreset(preset) {
            const vm = this;
            Object.assign(vm.form, preset.form);
        },
        _calculate() {
            const vm = this;

            const calculator = new PhoneTaxCalculator({
                price: vm.priceMultipliedExchangeRate,
                registration: vm.form.registration,
                eurToTryCurrency: vm.$store.getters["exchange-rates/currencies"].EUR.rate
            }, {
                calculateFromTaxAddedPrice: vm.form.currency === "TRY"
            });

            vm.results = calculator.calculate();
        },
        _handleQuery() {
            const vm = this;

            const handledQuery = handleQuery(vm.$route.query, {
                availableCurrencies: vm.$store.getters["exchange-rates/availableCurrencies"],
                registration: vm.ui.registration
            });
            if (handledQuery) {
                Object.assign(vm.form, handledQuery);
            }
        }
    },
    computed: {
        shouldShowResults() {
            return shouldShowResults(this.form);
        },
        resultList() {
            const vm = this;
            return [
                {
                    key: "Vergisiz fiyat",
                    value: moneyFormat(vm.results.prices.taxFree, "TRY")
                },
                ...(() => {
                    if (vm.form.registration === Registration.Import) {
                        return [
                            {
                                key: `Kültür Bakanlığı (%${vm.results.taxRates.ministryOfCulture})`,
                                value: moneyFormat(vm.results.taxFees.ministryOfCulture, "TRY")
                            },
                            {
                                key: `TRT bandrolü (%${vm.results.taxRates.trtImport})`,
                                value: moneyFormat(vm.results.taxFees.trtImport, "TRY")
                            },
                            {
                                key: `ÖTV (%${vm.results.taxRates.specialConsumptionTax})`,
                                value: moneyFormat(vm.results.taxFees.specialConsumptionTax, "TRY")
                            },
                            {
                                key: `KDV (%${vm.results.taxRates.valueAddedTax})`,
                                value: moneyFormat(vm.results.taxFees.valueAddedTax, "TRY")
                            }
                        ];
                    } else {
                        return [
                            {
                                key: `TRT bandrolü (${moneyFormat(vm.results.taxRates.trtPassport, "EUR")})`,
                                value: moneyFormat(vm.results.taxFees.trtPassport, "TRY")
                            },
                            {
                                key: "Kayıt ücreti",
                                value: moneyFormat(vm.results.taxFees.registration, "TRY")
                            }
                        ];
                    }
                })(),
                {
                    key: `Toplam vergi (%${vm.results.taxRates.total})`,
                    value: moneyFormat(vm.results.taxFees.total, "TRY")
                },
                {
                    key: "Tahmini satış fiyatı",
                    value: moneyFormat(vm.results.prices.taxAdded, "TRY")
                }
            ];
        },
        screenshotInput() {
            const vm = this;
            return [
                {
                    key: "Telefon fiyatı",
                    value: moneyFormat(vm.form.price, vm.form.currency)
                },
                {
                    key: "Kayıt yolu",
                    value: vm.ui.registration.find(item => item.value === vm.form.registration).title
                }
            ];
        },
        screenshotOutput() {
            const vm = this;
            return vm.resultList;
        },
        matchingPresets() {
            const vm = this;
            return findCalculatorMatchingPresets(vm.ui.presets, {
                price: vm.form.price,
                currency: vm.form.currency
            });
        },
        matchingPresetIds() {
            const vm = this;
            return createCalculatorMatchingPresetIds(vm.matchingPresets);
        },
        matchingPresetTitles() {
            const vm = this;
            return createCalculatorMatchingPresetTitles(vm.matchingPresets).join(" / ");
        },
        selectedCurrency() {
            const vm = this;
            return vm.$store.getters["exchange-rates/currencies"][vm.form.currency];
        },
        priceMultipliedExchangeRate() {
            const vm = this;
            return vm.form.price * vm.selectedCurrency.rate;
        },
        breadcrumbItems() {
            return [
                {
                    title: "Hesaplayıcılar",
                    url: "/hesaplayicilar/"
                },
                {
                    title: calculator.title,
                    url: calculator.url
                }
            ];
        }
    },
    watch: {
        shouldShowResults(current, previous) {
            const vm = this;

            if (!current && previous && vm.ui.tab === 0) {
                vm.ui.tab = 1;
            }
        },
        form: {
            deep: true,
            handler() {
                const vm = this;

                if (!vm.shouldShowResults) return;

                vm._calculate();

                // Show results tab when calculated
                vm.ui.tab = 0;

                vm.$router.push({ query: vm.form });
            }
        },
        "form.price"() {
            const vm = this;

            if (vm.form.price >= 999999) {
                vm.$nextTick(() => {
                    vm.form.price = 999999;
                });
            }
        }
    },
    mounted() {
        const vm = this;

        vm.$nextTick(() => {
            setTimeout(() => vm._handleQuery(), 100);
        });
    }
};
</script>
