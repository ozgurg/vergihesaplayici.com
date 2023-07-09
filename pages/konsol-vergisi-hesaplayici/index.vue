<template>
    <div>
        <AppBreadcrumbs :items="page.breadcrumbs" />

        <Heading1>
            {{ page.title }}
        </Heading1>

        <div class="mb-12">
            <template v-if="$vuetify.breakpoint.lgAndUp">
                <AdsterraBanner728x90 :order="0" />
            </template>
            <template v-else-if="$vuetify.breakpoint.mdAndDown">
                <AdsterraBanner300x250 :order="0" />
            </template>
        </div>

        <InnerContainer>
            <FormRow>
                <Heading2 class="mb-4">
                    Hazır hesaplamalar
                </Heading2>

                <CalculatorPresets :presets="ui.presets" />

                <v-divider class="my-12" />

                <Heading2 class="mb-4">
                    Kendiniz hesaplayın
                </Heading2>
            </FormRow>
        </InnerContainer>

        <CalculatorInnerContainer>
            <FormRow
                class="mb-10"
                label="Konsol fiyatı">
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
                    aria-label="Konsol fiyatı">
                    <template #append-outer>
                        <CurrencySelector
                            v-model="form.currency"
                            style="width:96px" />
                    </template>
                </v-text-field>
            </FormRow>

            <template v-if="shouldShowResults">
                <FormRow>
                    <template v-if="form.currency === 'TRY'">
                        <ReverseCalculationAlert />
                    </template>
                    <template v-else>
                        <EstimatedCalculationAlert />
                    </template>
                </FormRow>

                <CalculatorResultList
                    :items="resultList"
                    class="mb-5" />

                <FormRow>
                    <MinimumWageAlert
                        :price="results.prices.taxAdded"
                        class="mb-10" />
                </FormRow>

                <FormRow :is-horizontal="true">
                    <CalculatorShareButton
                        :screenshot-input="screenshotInput"
                        :screenshot-output="resultList"
                        :form="form"
                        :calculator-title="page.title" />
                </FormRow>
            </template>
        </CalculatorInnerContainer>

        <v-divider class="my-16" />

        <template v-if="$vuetify.breakpoint.lgAndUp">
            <AdsterraBanner468x60 :order="1" />
        </template>
        <template v-else-if="$vuetify.breakpoint.mdAndDown">
            <AdsterraBanner320x50 :order="1" />
        </template>
        <AdsterraNative
            :order="2"
            class="mt-8" />
    </div>
</template>

<script>
import Calculator from "@/data/pages/konsol-vergisi-hesaplayici/konsol-vergisi-hesaplayici.calculator.js";
import page from "@/data/pages/konsol-vergisi-hesaplayici/konsol-vergisi-hesaplayici.page.js";
import { presets } from "@/data/pages/konsol-vergisi-hesaplayici/konsol-vergisi-hesaplayici-slug.page.js";
import {
    buildResultList,
    buildScreenshotInput,
    handleQuery,
    shouldShowResults
} from "@/data/pages/konsol-vergisi-hesaplayici/konsol-vergisi-hesaplayici.utils.js";

export default {
    head() {
        return this.page.head;
    },
    data: () => ({
        page,
        ui: {
            presets
        },
        form: {
            currency: "USD",
            price: ""
        },
        results: {}
    }),
    methods: {
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
