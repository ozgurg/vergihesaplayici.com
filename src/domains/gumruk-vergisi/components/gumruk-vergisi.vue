<template>
    <div
        :aria-expanded="results ? 'true' : 'false'"
        class="calculator">
        <container>
            <div class="calculator-box">
                <div class="calculator-box-left">
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
                            <gumruk-vergisi-package-options
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
                                <form-label tag="legend">
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

                    <template v-if="results !== null">
                        <hr />
                        <div class="calculator-alerts">
                            <lazy-calculator-last-update-alert :date="LAST_UPDATE" />
                        </div>
                    </template>
                </div>

                <template v-if="results !== null">
                    <transition name="calculator-results-transition">
                        <div ref="resultsEl" class="calculator-box-right">
                            <heading-3 tag="h2">
                                Hesaplama sonuçları
                            </heading-3>
                            <div class="calculator-results">
                                <lazy-calculator-result-list
                                    :items="resultList!" />

                                <lazy-calculator-charts
                                    :charts="[
                                        {
                                            title: 'Sipariş-Vergi',
                                            props: {
                                                items: chartData!.total
                                            }
                                        },
                                        {
                                            title: 'Dağılım',
                                            props: {
                                                items: chartData!.taxRates
                                            }
                                        }
                                    ]" />

                                <lazy-calculator-quick-share
                                    :url="props.calculatorPage.url"
                                    @click:other="isCalculatorShareModalOpened = true" />

                                <lazy-calculator-share-modal
                                    v-model="isCalculatorShareModalOpened"
                                    :link="{
                                        url: props.calculatorPage.url
                                    }"
                                    :screenshot="{
                                        calculatorTitle: props.calculatorPage.title,
                                        screenshotData: screenshotData!
                                    }" />
                            </div>
                        </div>
                    </transition>
                </template>
            </div>
        </container>
    </div>

    <go-to-calculator-button
        :calculator-container="formEl!"
        :results-container="resultsEl!" />
</template>

<script lang="ts" setup>
import type { CalculatorPage } from "@/types/page-def.js";
import type { ExchangeRates } from "@/types/common.js";
import type {
    CalculationResults,
    ChartData,
    Form,
    ResultList,
    ScreenshotData
} from "@/domains/gumruk-vergisi/types.js";
import { calculateResults } from "@/domains/gumruk-vergisi/utils/calculate-results.js";
import { DEFAULT_FORM, LAST_UPDATE, TAX_EXEMPTION_PRICE_LIMIT_IN_EUR } from "@/domains/gumruk-vergisi/config.js";

export type Props = {
    EXCHANGE_RATES: ExchangeRates;
    calculatorPage: CalculatorPage;
}

const props = defineProps<Props>();

const formEl = useTemplateRef<HTMLFormElement>("formEl");
const resultsEl = useTemplateRef<HTMLElement>("resultsEl");

const form = reactive<Form>(DEFAULT_FORM);
const results = ref<CalculationResults | null>(null);
const resultList = ref<ResultList | null>(null);
const screenshotData = ref<ScreenshotData | null>(null);
const chartData = ref<ChartData | null>(null);
const isCalculatorShareModalOpened = ref<boolean>(false);

const eurPrice = computed<number>(() => ({
    TRY: form.price / props.EXCHANGE_RATES.rates["EUR"],
    EUR: form.price,
    USD: form.price / props.EXCHANGE_RATES.rates["USD"]
}[form.currency] || form.price));

watch(eurPrice, newValue => {
    form.isOverTaxExemptionPriceLimit = newValue > TAX_EXEMPTION_PRICE_LIMIT_IN_EUR;
});

const calculate = (): void => {
    const {
        results: calculatedResults,
        resultList: calculatedResultList,
        screenshotData: calculatedScreenshotData,
        chartData: calculatedChartData
    } = calculateResults({
        form,
        exchangeRates: props.EXCHANGE_RATES
    });

    results.value = calculatedResults;
    resultList.value = calculatedResultList;
    screenshotData.value = calculatedScreenshotData;
    chartData.value = calculatedChartData;
};

const onSubmit = (): void => {
    const isFormValid = formEl.value?.checkValidity() ?? false;
    if (isFormValid) {
        calculate();
        setTimeout(() => _scrollToResults(), 100);
    }
};

const _scrollToResults = (): void => {
    resultsEl.value?.scrollIntoView({ block: "nearest", behavior: "smooth" });
};

onMounted(onSubmit);
</script>
