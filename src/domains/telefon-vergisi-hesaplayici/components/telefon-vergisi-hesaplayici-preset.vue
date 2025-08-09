<template>
    <container class="calculator-container">
        <inner-container>
            <form
                ref="formEl"
                :aria-label="props.calculatorPage.title"
                @submit.prevent="onSubmit()"
                class="calculator-form">
                <form-group label="Kapasite">
                    <form-check-group
                        v-model="optionIndex"
                        :items="PRESET_OPTIONS"
                        type="radio"
                        :required="true"
                        class="telefon-vergisi-hesaplayici-preset-options" />
                </form-group>

                <form-group label="Kayıt yolu">
                    <telefon-vergisi-hesaplayici-registration
                        v-model="form.registration"
                        :required="true" />
                </form-group>
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

                    <div class="calculator-result-row-secondary">
                        <calculator-last-update-alert
                            :date="LAST_UPDATE"
                            :align-to-label="false" />
                        <estimated-calculation-alert />
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
} from "@/domains/telefon-vergisi-hesaplayici/types.js";
import type { ExchangeRates } from "@/types/common.js";
import { calculateResults } from "@/domains/telefon-vergisi-hesaplayici/utils/calculate-results.js";
import { LAST_UPDATE } from "@/domains/telefon-vergisi-hesaplayici/config.js";

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
.telefon-vergisi-hesaplayici-preset-options {
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
