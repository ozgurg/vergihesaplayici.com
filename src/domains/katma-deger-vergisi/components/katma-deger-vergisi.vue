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
                            <katma-deger-vergisi-mode
                                v-model="form.mode"
                                :required="true" />
                        </form-group>

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

                        <form-group label="KDV oranı">
                            <form-control-number
                                v-model="form.rate"
                                :required="true" />
                            <katma-deger-vergisi-rate-presets
                                v-model="form.rate"
                                scale="small" />
                        </form-group>

                        <form-button
                            class="w-100"
                            type="submit">
                            Hesapla
                        </form-button>
                    </form>
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
import type { CalculationResults, Form, ResultList, ScreenshotData } from "@/domains/katma-deger-vergisi/types.js";
import { calculateResults } from "@/domains/katma-deger-vergisi/utils/calculate-results.js";
import { DEFAULT_FORM } from "@/domains/katma-deger-vergisi/config.js";

export type Props = {
    calculatorPage: CalculatorPage;
}

const props = defineProps<Props>();

const formEl = useTemplateRef<HTMLFormElement>("formEl");
const resultsEl = useTemplateRef<HTMLElement>("resultsEl");

const form = reactive<Form>(DEFAULT_FORM);
const results = ref<CalculationResults | null>(null);
const resultList = ref<ResultList | null>(null);
const screenshotData = ref<ScreenshotData | null>(null);
const isCalculatorShareModalOpened = ref<boolean>(false);

const priceLabel = computed<string>(() => {
    return {
        "tax-free-to-tax-added": "KDV hariç tutar",
        "tax-added-to-tax-free": "KDV dahil tutar",
        "tax-to-tax-base": "KDV tutarı"
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
        setTimeout(() => _scrollToResults(), 100);
    }
};

const _scrollToResults = (): void => {
    resultsEl.value?.scrollIntoView({ block: "nearest", behavior: "smooth" });
};

onMounted(onSubmit);
</script>
