<template>
    <div>
        <AppBreadcrumbs :items="page.breadcrumbs" />

        <Heading1>
            {{ page.title }}
        </Heading1>

        <CalculatorInnerContainer>
            <template v-if="preset.slug === 'apple-vision-pro'">
                <vh-alert
                    type="info"
                    class="mb-10">
                    Bu ürünün hangi ürün kategorisinden vergilendirileceğini henüz bilmiyoruz. Bu sayfa sadece bilgi
                    vermek amacıyla hazırlanmıştır.
                </vh-alert>
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
                    :items="ui.registration" />
            </FormRow>

            <template v-if="shouldShowResults">
                <FormRow>
                    <estimated-calculation-alert />
                </FormRow>

                <CalculatorResultList
                    :items="resultList"
                    class="mb-4" />

                <FormRow class="mb-10">
                    <affordability-alert :price="results.prices.taxAdded" />
                </FormRow>

                <div
                    v-if="form.option.retailPrice"
                    class="mb-10">
                    <CalculatorResultFormRow
                        :value="moneyFormat(form.option.retailPrice.value, 'TRY')"
                        class="mb-2"
                        label="Piyasa fiyatı" />

                    <FormRow direction="horizontal">
                        <retail-price-update-info
                            :last-updated-date="form.option.retailPrice.lastUpdatedDate"
                            :source-url="form.option.retailPrice.sourceUrl" />
                    </FormRow>
                </div>

                <FormRow direction="horizontal">
                    <CalculatorShareButton
                        :screenshot-input="screenshotInput"
                        :screenshot-output="resultList"
                        :form="form"
                        :calculator-title="page.calculatorTitle"
                        :preset-title="preset.title"
                        :preset-option-title="form.option.title" />
                </FormRow>
            </template>
        </CalculatorInnerContainer>

        <v-divider class="my-16" />

        <InnerContainer>
            <Heading2>
                Diğer hesaplamalar
            </Heading2>
            <div class="d-flex flex-column gap-12">
                <template v-for="_calculation in ui.otherCalculations">
                    <CalculationPresets
                        :key="_calculation.brand.id"
                        :presets="_calculation.presets"
                        :brand="_calculation.brand" />
                </template>
            </div>
        </InnerContainer>
    </div>
</template>

<script>
import { registrationOptions } from "@/domain/telefon-vergisi-hesaplayici/registration-options.js";
import {
    buildResultList,
    buildScreenshotInput,
    shouldShowResults
} from "@/domain/telefon-vergisi-hesaplayici/utils.js";
import Calculator from "@/domain/telefon-vergisi-hesaplayici/calculator.js";
import { moneyFormat } from "@/utils/formatter.js";
import { TelefonVergisiHesaplayiciSlugPageDef } from "@/domain/telefon-vergisi-hesaplayici/slug.page-def.js";
import { findCalculatorPresetBySlug } from "@/utils/find-calculator-preset-by-slug.js";
import {
    buildCalculations,
    findBrandById,
    findPresetOptionsByPresetId,
    presets
} from "@/domain/telefon-vergisi-hesaplayici/db/_index.js";

export default {
    head() {
        return this.page.head;
    },
    data: () => ({
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

            const selectedCurrencyRate = vm.$store.getters["exchange-rates/currencies"][vm.form.currency].rate;
            const eurToTryCurrencyRate = vm.$store.getters["exchange-rates/currencies"].EUR.rate;
            const calculateFromTaxAddedPrice = vm.form.currency === "TRY";

            const calculator = new Calculator(
                {
                    price: vm.form.price * selectedCurrencyRate,
                    registration: vm.form.registration,
                    eurToTryCurrency: eurToTryCurrencyRate
                },
                {
                    calculateFromTaxAddedPrice
                }
            );

            vm.results = calculator.calculate();
        }
    },
    computed: {
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
        const preset = findCalculatorPresetBySlug(slug, presets);
        const presetOptions = preset ? findPresetOptionsByPresetId(preset.id) : false;
        const brand = preset && presetOptions ? findBrandById(preset.brandId) : false;
        if (!preset || !presetOptions || !brand) {
            return error({ statusCode: 404 });
        }

        const page = TelefonVergisiHesaplayiciSlugPageDef({
            preset,
            brand
        });
        if (!page) {
            return error({ statusCode: 404 });
        }

        const initialPresetOption = presetOptions[0];

        await store.dispatch("exchange-rates/loadExchangeRateFromApi", initialPresetOption.form.currency);

        const options = presetOptions.map(_option => ({
            title: _option.title,
            value: _option,
            price: moneyFormat(_option.form.price, _option.form.currency)
        }));

        const form = {
            option: initialPresetOption,
            currency: "USD",
            price: "",
            registration: registrationOptions[0].value,
            ...initialPresetOption.form
        };

        const otherCalculations = buildCalculations().filter(_calculation => _calculation.brand.id === preset.brandId);

        return {
            page,
            preset,
            ui: {
                options,
                otherCalculations,
                registration: registrationOptions
            },
            form
        };
    }
};
</script>
