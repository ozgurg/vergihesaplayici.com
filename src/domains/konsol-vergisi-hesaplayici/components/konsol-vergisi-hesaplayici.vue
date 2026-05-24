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
                        <form-group label="Hesaplama modu">
                            <konsol-vergisi-hesaplayici-mode v-model="form.mode" />
                        </form-group>

                        <div class="calculator-pricing-row">
                            <form-group>
                                <template #label>
                                    <form-label tag="legend">
                                        <string-carousel :text="priceLabel" />
                                    </form-label>
                                </template>
                                <form-control-number
                                    v-model="form.price"
                                    :required="true" />
                            </form-group>

                            <form-group label="Para birimi">
                                <form-select-currency
                                    v-model="form.currency"
                                    :EXCHANGE_RATES="props.EXCHANGE_RATES"
                                    :required="true" />
                            </form-group>
                        </div>

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
                            <lazy-estimated-calculation-alert />
                        </div>
                    </template>
                </div>

                <template v-if="results !== null">
                    <transition name="calculator-results-transition">
                        <div class="calculator-box-right">
                            <heading-3 tag="h2">
                                Hesaplama sonuçları
                            </heading-3>
                            <div class="calculator-results">
                                <lazy-calculator-result-list
                                    :items="resultList!" />

                                <lazy-affordability-alert
                                    :price="results.prices.taxAdded" />

                                <lazy-calculator-charts
                                    :charts="[
                                        {
                                            title: 'Konsol-Vergi',
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
import type {
    CalculationResults,
    ChartData,
    Form,
    ResultList,
    ScreenshotData
} from "@/domains/konsol-vergisi-hesaplayici/types.js";
import type { ExchangeRates } from "@/types/common.js";
import { calculateResults } from "@/domains/konsol-vergisi-hesaplayici/utils/calculate-results.js";
import { DEFAULT_FORM, LAST_UPDATE, PRICE_LABEL_BY_MODE } from "@/domains/konsol-vergisi-hesaplayici/config.js";

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

const priceLabel = computed<string>(() => PRICE_LABEL_BY_MODE[form.mode]);

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
