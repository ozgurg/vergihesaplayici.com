<template>
    <div>
        <AppBreadcrumbs :items="page.breadcrumbs" />

        <Heading1>
            {{ page.title }}
        </Heading1>

        <template v-if="$vuetify.breakpoint.lgAndUp">
            <AdsterraBanner728x90 :order="0" class="d-flex mx-auto" />
        </template>
        <template v-else-if="$vuetify.breakpoint.mdAndDown">
            <AdsterraBanner300x250 :order="0" class="d-flex mx-auto" />
        </template>
        <v-divider class="mt-4 mb-12" />

        <InnerContainer>
            <template v-if="slug === 'apple-vision-pro'">
                <v-alert
                    class="mb-10"
                    type="info">
                    Bu ürünün hangi ürün kategorisinden vergilendirileceğini henüz bilmiyoruz. Bu sayfa sadece bilgi vermek amacıyla hazırlanmıştır.
                </v-alert>
            </template>

            <FormRow
                class="mb-10"
                label="Kapasite">
                <RadioGrid
                    v-model="form.option"
                    :items="ui.options" />
            </FormRow>

            <FormRow
                class="mb-10"
                label="Kayıt yolu">
                <RadioGrid
                    v-model="form.registration"
                    :items="ui.registration"
                    style="--vh-radio-grid-optimal-width:224px" />
            </FormRow>

            <template v-if="shouldShowResults">
                <FormRow>
                    <EstimatedCalculationAlert />
                </FormRow>

                <CalculatorResultList
                    :items="resultList"
                    class="mb-4" />

                <FormRow class="mb-10">
                    <MinimumWageAlert :price="results.prices.taxAdded" />
                </FormRow>

                <div
                    v-if="form.option.retailPrice"
                    class="mb-10">
                    <CalculatorResultFormRow
                        :value="moneyFormat(form.option.retailPrice.value, 'TRY')"
                        class="mb-2"
                        label="Piyasa fiyatı" />

                    <FormRow>
                        <RetailPriceUpdateInfo
                            :last-updated-date="form.option.retailPrice.lastUpdatedDate"
                            :source-url="form.option.retailPrice.sourceUrl" />
                    </FormRow>
                </div>

                <FormRow>
                    <CalculatorShareButton
                        :screenshot-input="screenshotInput"
                        :screenshot-output="resultList"
                        :form="form"
                        :calculator-title="page.calculatorTitle"
                        :preset-title="page.preset.title"
                        :preset-option-title="form.option.title" />
                </FormRow>

                <FormRow>
                    <v-divider class="mb-2 mt-12" />
                    <template v-if="$vuetify.breakpoint.lgAndUp">
                        <AdsterraBanner468x60 :order="1" class="d-flex mx-auto" />
                    </template>
                    <template v-else-if="$vuetify.breakpoint.mdAndDown">
                        <AdsterraBanner320x50 :order="1" class="d-flex mx-auto" />
                    </template>
                    <v-divider class="mt-2 mb-12" />
                </FormRow>

                <v-divider class="my-12" />

                <div class="d-flex flex-column gap-16">
                    <template v-for="_item in presetsGroupedByBrand">
                        <div :key="_item.title">
                            <Heading2 class="mb-2">
                                {{ _item.title }}
                            </Heading2>
                            <CalculatorPresets :presets="_item.presets" />
                        </div>
                    </template>
                </div>
            </template>

            <v-divider class="mb-2 mt-16" />
            <AdsterraNative
                :order="2"
                ad-key="18d820d42a43bbb54b363d01dc952cf3"
                class="mt-4" />
        </InnerContainer>
    </div>
</template>

<script>
import page, { presets } from "@/data/pages/telefon-vergisi-hesaplayici/telefon-vergisi-hesaplayici-slug.page.js";
import { registrationOptions } from "@/data/pages/telefon-vergisi-hesaplayici/telefon-vergisi-hesaplayici.page.js";
import {
    buildResultList,
    buildScreenshotInput,
    shouldShowResults
} from "@/data/pages/telefon-vergisi-hesaplayici/telefon-vergisi-hesaplayici.utils.js";
import Calculator from "@/data/pages/telefon-vergisi-hesaplayici/telefon-vergisi-hesaplayici.calculator.js";
import { moneyFormat } from "@/utils/formatter.js";

export default {
    head() {
        return this.page.head;
    },
    data: () => ({
        slug: null,
        page: null,
        preset: null,
        ui: {},
        form: {},
        results: {}
    }),
    methods: {
        moneyFormat,
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
                const { brand, ...rest } = preset;
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
            immediate: true,
            handler() {
                const vm = this;
                vm._calculate();
            }
        },
        "form.option"() {
            const vm = this;
            Object.assign(vm.form, vm.form.option.form);
        }
    },
    async asyncData({
        store,
        error,
        params: { slug }
    }) {
        const presetPage = page(slug);
        if (!presetPage) {
            return error({ statusCode: 404 });
        }

        // For correct calculation, we need to fetch the exchange rate of the preset.
        // The result will be calculated during the build process and the calculation will be incorrect if the exchange rate changes.
        // In the front-end, the exchange rate will be re-fetched and the calculation will be correct.
        await store.dispatch("exchange-rates/loadExchangeRateFromApi", presetPage.preset.options[0].form.currency);

        const options = presetPage.preset.options.map(option => ({
            title: option.title,
            value: option,
            price: moneyFormat(option.form.price, option.form.currency)
        }));

        const form = {
            option: presetPage.preset.options[0],
            currency: "USD",
            price: "",
            registration: registrationOptions[0].value,
            ...presetPage.preset.options[0].form
        };

        const otherPresets = presets.filter(preset => preset.slug !== slug);

        return {
            slug,
            page: presetPage,
            ui: {
                options,
                registration: registrationOptions,
                presets: otherPresets
            },
            form
        };
    }
};
</script>
