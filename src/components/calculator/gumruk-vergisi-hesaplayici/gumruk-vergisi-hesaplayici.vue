<template>
    <container class="calculator-container">
        <inner-container>
            <form
                ref="formEl"
                :aria-label="props.calculatorPage.title"
                @submit.prevent="onSubmit()"
                class="calculator-form">
                <div class="calculator-pricing-row">
                    <form-group label="Sipariş tutarı (TRY)">
                        <form-control-number
                            v-model="form.price"
                            :required="true" />
                    </form-group>

                    <!-- TODO
                    <form-group label="Para birimi">
                        <form-select-currency
                            v-model="form.currency"
                            :EXCHANGE_RATES="props.EXCHANGE_RATES"
                            :required="true" />
                    </form-group>
                    -->
                </div>

                <form-group label="Paket özellikleri">
                    <gumruk-vergisi-hesaplayici-package-options
                        :eur-price="eurPrice"
                        v-model:isOverTaxExemptionWeightLimit="form.isOverTaxExemptionWeightLimit"
                        v-model:isOverTaxExemptionPriceLimit="form.isOverTaxExemptionPriceLimit"
                        v-model:isPrintedOnly="form.isPrintedOnly"
                        v-model:isSpecialConsumptionTaxed="form.isSpecialConsumptionTaxed"
                        v-model:isFromEU="form.isFromEU"
                        v-model:isShippingIncluded="form.isShippingIncluded" />
                </form-group>

                <form-group>
                    <template #label>
                        <form-label is="legend">
                            İlave gümrük vergisi (Yüzde)<small>&nbsp;–&nbsp;isteğe bağlı</small>
                        </form-label>
                    </template>
                    <form-control-number v-model="form.extraCustomTaxPercent" />
                </form-group>

                <form-button
                    class="w-100"
                    type="submit">
                    Hesapla
                </form-button>
            </form>
        </inner-container>

        <template v-if="results !== null">
            <div>
                <heading-3 is="h2">
                    Hesaplama sonuçları
                </heading-3>

                <div class="calculator-result-row">
                    <inner-container class="calculator-result-row-primary">
                        <calculator-result-list
                            ref="resultsEl"
                            :items="resultList!" />

                        <calculator-quick-share
                            :url="props.calculatorPage.url"
                            @click:other="isCalculatorShareModalOpened = true" />

                        <!-- 🤮 -->
                        <calculator-share-modal
                            v-model="isCalculatorShareModalOpened"
                            :link="{
                                url: props.calculatorPage.url
                            }"
                            :screenshot="{
                                calculatorTitle: props.calculatorPage.title,
                                screenshotData: screenshotData!
                            }" />
                    </inner-container>

                    <div class="calculator-result-row-secondary">
                        <calculator-last-update-alert :date="LAST_UPDATE" />
                    </div>
                </div>
            </div>
        </template>
    </container>

    <go-to-calculator-button
        :calculator-container="formEl!"
        :results-container="resultsEl?.$el!" />
</template>

<script lang="ts" setup>
import type { CalculatorPage } from "@/types/page-def.js";
import type { ExchangeRates } from "@/types/common.js";
import type {
    CalculationResults,
    Form,
    ResultList,
    ScreenshotData
} from "@/domains/gumruk-vergisi-hesaplayici/types.js";
import { calculateResults } from "@/domains/gumruk-vergisi-hesaplayici/utils/calculate-results.js";
import {
    DEFAULT_CURRENCY,
    LAST_UPDATE,
    TAX_EXEMPTION_PRICE_LIMIT_IN_EUR
} from "@/domains/gumruk-vergisi-hesaplayici/config.js";

export type Props = {
    EXCHANGE_RATES: ExchangeRates;
    calculatorPage: CalculatorPage;
}

const props = defineProps<Props>();

const formEl = useTemplateRef<HTMLFormElement>("formEl");
const resultsEl = useTemplateRef<HTMLElement>("resultsEl");

const form = reactive<Form>({
    price: 0,
    currency: DEFAULT_CURRENCY,
    isOverTaxExemptionWeightLimit: false,
    isOverTaxExemptionPriceLimit: false,
    isPrintedOnly: false,
    isSpecialConsumptionTaxed: false,
    isFromEU: false,
    isShippingIncluded: true,
    extraCustomTaxPercent: 0
});
const results = ref<CalculationResults | null>(null);
const resultList = ref<ResultList | null>(null);
const screenshotData = ref<ScreenshotData | null>(null);
const isCalculatorShareModalOpened = ref<boolean>(false);

const eurPrice = computed<number>(() => {
    if (form.currency === "TRY") {
        return form.price / props.EXCHANGE_RATES.rates["EUR"];
    }
    if (form.currency === "EUR") {
        return form.price;
    }
    if (form.currency === "USD") {
        // TODO
        return form.price / props.EXCHANGE_RATES.rates["USD"];
    }
});

watch(eurPrice, newValue => {
    form.isOverTaxExemptionPriceLimit = newValue > TAX_EXEMPTION_PRICE_LIMIT_IN_EUR;
});

const calculate = (): void => {
    const {
        results: calculatedResults,
        resultList: calculatedResultList,
        screenshotData: calculatedScreenshotData
    } = calculateResults({
        form,
        exchangeRates: props.EXCHANGE_RATES
    });

    results.value = calculatedResults;
    resultList.value = calculatedResultList;
    screenshotData.value = calculatedScreenshotData;
};

const onSubmit = (): void => {
    const isFormValid = formEl.value?.checkValidity() ?? false;
    if (isFormValid) {
        calculate();
        nextTick(_scrollToResults);
    }
};

const _scrollToResults = (): void => {
    resultsEl.value?.scrollIntoView({ block: "nearest", behavior: "smooth" });
};

onMounted(onSubmit);
</script>
