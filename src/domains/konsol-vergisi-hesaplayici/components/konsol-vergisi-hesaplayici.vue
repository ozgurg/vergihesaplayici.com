<template>
    <container class="calculator-container">
        <div class="calculator-result-row">
            <inner-container class="calculator-result-row-primary">
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
                                <form-label is="legend">
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
            </inner-container>
            <div class="calculator-result-row-secondary">
                <calculator-last-update-alert :date="LAST_UPDATE" />
            </div>
        </div>

        <template v-if="results !== null">
            <div>
                <heading-3 is="h3">
                    Hesaplama sonuçları
                </heading-3>

                <div class="ta-ad-first" ta-ad-container=""></div>

                <div class="calculator-result-row">
                    <inner-container class="calculator-result-row-primary">
                        <calculator-result-list
                            ref="resultsEl"
                            :items="resultList!" />
                        <affordability-alert :price="results.prices.taxAdded" />

                        <calculator-charts :charts="[
                            {
                                title: 'Konsol-Vergi',
                                props: {
                                    items: chartData!.total
                                }
                            },
                            {
                                title: 'Vergi dağılımı',
                                props: {
                                    items: chartData!.taxRates
                                }
                            }
                        ]" />

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
                        <estimated-calculation-alert />
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
        nextTick(_scrollToResults);
    }
};

const _scrollToResults = (): void => {
    resultsEl.value?.$el?.scrollIntoView({ block: "nearest", behavior: "smooth" });
};

onMounted(onSubmit);
</script>
