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
                <Heading2>
                    Hazır hesaplamalar
                </Heading2>

                <div class="d-flex flex-column gap-16">
                    <template v-for="_item in presetsGroupedByBrand">
                        <div :key="_item.title">
                            <Heading3 class="mb-2">
                                {{ _item.title }}
                            </Heading3>
                            <CalculatorPresets :presets="_item.presets" />
                        </div>
                    </template>
                </div>

                <div class="my-12">
                    <template v-if="$vuetify.breakpoint.lgAndUp">
                        <AdsterraBanner728x90 :order="1" />
                    </template>
                    <template v-else-if="$vuetify.breakpoint.mdAndDown">
                        <AdsterraBanner300x250 :order="1" />
                    </template>
                </div>

                <Heading2>
                    Kendiniz hesaplayın
                </Heading2>
            </FormRow>
        </InnerContainer>

        <CalculatorInnerContainer>
            <FormRow
                class="mb-10"
                label="Telefon fiyatı">
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
                            aria-label="Telefon fiyatı" />
                    </v-col>
                    <v-col
                        cols="4"
                        md="3">
                        <CurrencySelector v-model="form.currency" />
                    </v-col>
                </v-row>
            </FormRow>

            <FormRow
                class="mb-10"
                label="Kayıt yolu">
                <RadioGrid
                    v-model="form.registration"
                    :items="ui.registration" />
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

                <FormRow direction="horizontal">
                    <CalculatorShareButton
                        :screenshot-input="screenshotInput"
                        :screenshot-output="resultList"
                        :form="form"
                        :calculator-title="page.title" />
                </FormRow>
            </template>
        </CalculatorInnerContainer>

        <AdsterraNative
            :order="2"
            class="mt-16" />
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
            registration: registrationOptions
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
        },
        presetsGroupedByBrand() { // FIXME: Make it utility function and write unit test
            const vm = this;

            const output = {};

            vm.ui.presets.forEach(preset => {
                const {
                    brand,
                    ...rest
                } = preset;
                if (!output[brand]) {
                    output[brand] = {
                        title: brand,
                        presets: []
                    };
                }
                output[brand].presets.push({
                    brand, ...rest
                });
            });

            return Object.values(output);
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
