<template>
    <div>
        <AppBreadcrumbs :items="page.breadcrumbs" />

        <PageTitle>
            {{ page.title }}
        </PageTitle>

        <InnerContainer>
            <FormRow>
                <PageSubtitle class="mb-4">
                    Bir telefon seçin…
                </PageSubtitle>

                <CalculatorPresets :presets="ui.presets" />

                <v-divider class="my-12" />

                <PageSubtitle class="mb-4">
                    …veya kendiniz hesaplayın
                </PageSubtitle>
            </FormRow>

            <FormRow
                class="mb-10"
                label="Telefon fiyatı">
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
                    cols="12"
                    sm="5"
                    md="4" />
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
                            :screenshot-output="resultList"
                            :form="form"
                            :calculator-title="page.title" />
                    </FormRow>
                </template>
            </CalculatorResultTabs>
        </InnerContainer>
    </div>
</template>

<script>
import Calculator from "@/data/pages/telefon-vergisi-hesaplayici/telefon-vergisi-hesaplayici.calculator.js";
import page, {
    registrationOptions
} from "@/data/pages/telefon-vergisi-hesaplayici/telefon-vergisi-hesaplayici.page.js";
import {
    buildResultList,
    buildScreenshotInput,
    handleQuery,
    shouldShowResults
} from "@/data/pages/telefon-vergisi-hesaplayici/telefon-vergisi-hesaplayici.utils.js";
import { presets } from "@/data/pages/telefon-vergisi-hesaplayici/telefon-vergisi-hesaplayici-slug.page.js";

export default {
    head() {
        return this.page.head;
    },
    data: () => ({
        page,
        ui: {
            presets,
            registration: registrationOptions,
            tab: 1
        },
        form: {
            currency: "USD",
            price: "",
            registration: registrationOptions[0].value
        },
        results: {}
    }),
    methods: {
        _calculate() {
            const vm = this;

            const calculator = new Calculator({
                price: vm.form.price * vm.selectedCurrency.rate,
                registration: vm.form.registration,
                eurToTryCurrency: vm.$store.getters["exchange-rates/currencies"].EUR.rate
            }, {
                calculateFromTaxAddedPrice: vm.form.currency === "TRY"
            });

            vm.results = calculator.calculate();
        },
        _handleQuery() {
            const vm = this;

            const query = handleQuery(vm.$route.query, {
                availableCurrencies: vm.$store.getters["exchange-rates/availableCurrencies"],
                registration: vm.ui.registration
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
            return buildResultList(vm.results, vm.form.registration);
        },
        screenshotInput() {
            const vm = this;
            return buildScreenshotInput({
                price: vm.form.price,
                currency: vm.form.currency,
                registrationTitle: vm.ui.registration.find(item => item.value === vm.form.registration).title
            });
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

                vm.ui.tab = 0;

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
