<template>
    <div
        :aria-expanded="results ? 'true' : 'false'"
        class="calculator">
        <container>
            <template v-if="preset.disclaimerNote">
                <alert>
                    {{ preset.disclaimerNote }}
                </alert>
                <hr />
            </template>

            <div class="calculator-box">
                <div class="calculator-box-left">
                    <form
                        ref="formEl"
                        :aria-label="props.calculatorPage.title"
                        @submit.prevent="onSubmit()"
                        class="calculator-form">
                        <form-group label="Model">
                            <form-check-group
                                v-model="optionIndex"
                                :items="PRESET_OPTIONS"
                                type="radio"
                                :required="true"
                                class="preset-options" />
                        </form-group>
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
                        <div ref="resultsEl" class="calculator-box-right">
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
                                                items: chartData.total
                                            }
                                        },
                                        {
                                            title: 'Dağılım',
                                            props: {
                                                items: chartData.taxRates
                                            }
                                        }
                                    ]" />

                                <lazy-calculator-quick-share
                                    :url="props.presetPage.url"
                                    @click:other="isCalculatorShareModalOpened = true" />

                                <lazy-calculator-share-modal
                                    v-model="isCalculatorShareModalOpened"
                                    :link="{
                                        url: props.presetPage.url
                                    }"
                                    :screenshot="{
                                        calculatorTitle: props.calculatorPage.title,
                                        screenshotData: screenshotData!,
                                        brandTitle: brand.title,
                                        presetTitle: preset.title,
                                        optionTitle: props.preset.options[optionIndex]?.title,
                                    }" />
                            </div>
                        </div>
                    </transition>
                </template>
            </div>
        </container>
    </div>

    <template v-if="PRESET_OPTIONS.length > 1">
        <go-to-calculator-button
            :calculator-container="formEl!"
            :results-container="resultsEl!" />
    </template>
</template>

<script lang="ts" setup>
import type { CalculatorPage, Page } from "@/types/page-def.js";
import type { Item as FormCheckGroupItem } from "@/components/common/form/form-check-group.vue";
import type {
    Brand,
    CalculationResults,
    ChartData,
    Form,
    Preset,
    ResultList,
    ScreenshotData
} from "@/domains/konsol-vergisi-hesaplayici/types.js";
import type { ExchangeRates } from "@/types/common.js";
import { calculateResults } from "@/domains/konsol-vergisi-hesaplayici/utils/calculate-results.js";
import { LAST_UPDATE } from "@/domains/konsol-vergisi-hesaplayici/config.js";

export type Props = {
    EXCHANGE_RATES: ExchangeRates;
    calculatorPage: CalculatorPage;
    presetPage: Page;
    brand: Brand;
    preset: Preset;
    initial: {
        form: Form;
        results: CalculationResults;
        resultList: ResultList;
        screenshotData: ScreenshotData;
        chartData: ChartData;
    }
};

const props = defineProps<Props>();

const PRESET_OPTIONS: FormCheckGroupItem[] = props.preset.options.map((_option, _index) => ({
    title: _option.title,
    description: formatMoney(_option.form.price, _option.form.currency),
    input: {
        value: _index
    }
}));

const formEl = useTemplateRef<HTMLFormElement>("formEl");
const resultsEl = useTemplateRef<HTMLElement>("resultsEl");

const optionIndex = ref<number>(0);
const form = reactive<Form>(props.initial.form);
const results = ref<CalculationResults>(props.initial.results);
const resultList = ref<ResultList>(props.initial.resultList);
const screenshotData = ref<ScreenshotData>(props.initial.screenshotData);
const chartData = ref<ChartData>(props.initial.chartData);
const isCalculatorShareModalOpened = ref<boolean>(false);

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
    }
};

watch(optionIndex, () => {
    Object.assign(form, props.preset.options[optionIndex.value]?.form);
}, { immediate: true });

watch(form, onSubmit, { deep: true });
</script>

<style lang="scss" scoped>
.preset-options {
    &:has(> *:nth-child(1)),
    &:has(> *:nth-child(2)),
    &:has(> *:nth-child(3)) {
        grid-template-columns: repeat(auto-fill, minmax(144px, 1fr))
    }
    &:has(> *:nth-child(4)) {
        grid-template-columns: repeat(3, 1fr);
        @include vh-media-breakpoint-up(md) {
            grid-template-columns: repeat(4, 1fr)
        }
    }
    :deep(small) {
        font-weight: var(--vh-fw-semibold);
        @include vh-text-number
    }
}
</style>
