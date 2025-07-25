<template>
    <container class="calculation-container">
        <inner-container>
            <form
                ref="formEl"
                :aria-label="props.calculatorPage.title"
                @submit.prevent="onSubmit()"
                class="calculation-form">
                <form-group label="Hesaplama modu">
                    <kdv-hesaplayici-mode
                        v-model="form.mode"
                        :required="true"
                        class="form-radio-group-mode" />
                </form-group>

                <form-group>
                    <template #label>
                        <transition name="fade-transition" mode="out-in">
                            <form-label
                                :key="priceLabel"
                                is="legend">
                                {{ priceLabel }}
                            </form-label>
                        </transition>
                    </template>
                    <form-control-number
                        v-model="form.price"
                        :required="true" />
                </form-group>

                <form-group label="KDV oranı">
                    <form-control-number
                        v-model="form.rate"
                        :required="true" />
                    <kdv-hesaplayici-rate-presets
                        v-model="form.rate"
                        scale="small"
                        class="form-radio-group-rate-presets" />
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

                <div class="calculation-result-row">
                    <inner-container>
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
import type { CalculationResults, Form, ResultList, ScreenshotData } from "@/domains/kdv-hesaplayici/types.js";
import { Mode } from "@/domains/kdv-hesaplayici/types.js";
import { calculateResults } from "@/domains/kdv-hesaplayici/utils/calculate-results.js";
import { DEFAULT_MODE, DEFAULT_RATE } from "@/domains/kdv-hesaplayici/config.js";

export type Props = {
    calculatorPage: CalculatorPage;
}

const props = defineProps<Props>();

const formEl = useTemplateRef<HTMLFormElement>("formEl");
const resultsEl = useTemplateRef<HTMLElement>("resultsEl");

const form = reactive<Form>({
    mode: DEFAULT_MODE,
    price: 0,
    rate: DEFAULT_RATE
});
const results = ref<CalculationResults | null>(null);
const resultList = ref<ResultList | null>(null);
const screenshotData = ref<ScreenshotData | null>(null);
const isCalculatorShareModalOpened = ref<boolean>(false);

const priceLabel = computed<string>(() => {
    return {
        [Mode.TAX_FREE_TO_TAX_ADDED]: "KDV hariç tutar",
        [Mode.TAX_ADDED_TO_TAX_FREE]: "KDV dahil tutar",
        [Mode.TAX_TO_TAX_BASE]: "KDV tutarı"
    }[form.mode];
});

const calculate = (): void => {
    const {
        results: calculatedResults,
        resultList: calculatedResultList,
        screenshotData: calculatedScreenshotData
    } = calculateResults({
        form
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

<style lang="scss" scoped>
@import "@/assets/css/calculator/kdv-hesaplayici.scss";
</style>
