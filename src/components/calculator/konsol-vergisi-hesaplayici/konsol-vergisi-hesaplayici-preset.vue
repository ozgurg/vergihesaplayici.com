<template>
    <container class="calculation-container">
        <inner-container>
            <form
                ref="formEl"
                :aria-label="props.calculatorPage.title"
                @submit.prevent="onSubmit()"
                class="calculation-form">
                <form-group label="Model">
                    <form-check-group
                        v-model="optionIndex"
                        :items="PRESET_OPTIONS"
                        type="radio"
                        :required="true"
                        class="form-check-group-preset-options" />
                </form-group>
            </form>
        </inner-container>

        <template v-if="results !== null">
            <div>
                <heading-3 is="h2">
                    Hesaplama sonuçları
                </heading-3>

                <div class="calculation-result-row">
                    <inner-container>
                        <calculator-result-list
                            ref="resultsEl"
                            :items="resultList!" />
                        <affordability-alert :price="results.prices.taxAdded" />

                        <calculator-quick-share
                            :url="props.presetPage.url"
                            @click:other="isCalculatorShareModalOpened = true" />

                        <!-- 🤮 -->
                        <calculator-share-modal
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
                    </inner-container>

                    <div>
                        <calculator-last-update-alert :date="LAST_UPDATE" />

                        <transition name="fade-transition" mode="out-in">
                            <template v-if="form.currency === 'TRY'">
                                <reverse-calculation-alert />
                            </template>
                            <template v-else>
                                <estimated-calculation-alert />
                            </template>
                        </transition>
                    </div>
                </div>
            </div>
        </template>
    </container>

    <template v-if="PRESET_OPTIONS.length > 1">
        <go-to-calculator-button
            :calculator-container="formEl!"
            :results-container="resultsEl?.$el!" />
    </template>
</template>

<script lang="ts" setup>
import type { CalculatorPage, Page } from "@/types/page-def.js";
import type { Item as FormCheckGroupItem } from "@/components/common/form/form-check-group.vue";
import type {
    Brand,
    CalculationResults,
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
    }
};

const props = defineProps<Props>();

const PRESET_OPTIONS: FormCheckGroupItem[] = props.preset.options.map((_option, _index) => ({
    title: _option.title,
    // oxlint-disable-next-line no-non-null-assertion
    description: formatMoney(_option.form.price!, _option.form.currency!),
    input: {
        value: _index
    }
}));

const formEl = useTemplateRef<HTMLFormElement>("formEl");
const resultsEl = useTemplateRef<HTMLElement>("resultsEl");

const optionIndex = ref<number>(0);
const form = reactive<Form>(props.initial.form);
const results = ref<CalculationResults | null>(props.initial.results);
const resultList = ref<ResultList | null>(props.initial.resultList);
const screenshotData = ref<ScreenshotData | null>(props.initial.screenshotData);
const isCalculatorShareModalOpened = ref<boolean>(false);

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
    }
};

watch(optionIndex, () => {
    Object.assign(form, props.preset.options[optionIndex.value]?.form);
}, { immediate: true });

watch(form, onSubmit, { deep: true });
</script>

<style lang="scss" scoped>
@import "@/assets/css/calculator/konsol-vergisi-hesaplayici.scss";
</style>
