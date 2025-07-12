<template>
    <container class="calculation-container">
        <inner-container>
            <form
                ref="formEl"
                :aria-label="props.calculatorPage.title"
                @submit.prevent="onSubmit()"
                class="calculation-form">
                <div class="calculation-pricing-row">
                    <form-group label="Telefon fiyatı">
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

                <form-group label="Kayıt yolu">
                    <telefon-vergisi-hesaplayici-registration
                        v-model="form.registration"
                        :required="true" />
                </form-group>

                <form-button
                    class="w-100"
                    type="submit">
                    Hesapla
                </form-button>
            </form>
        </inner-container>

        <template v-if="results !== null">
            <div ref="resultsEl">
                <heading-3>
                    Hesaplama sonuçları
                </heading-3>

                <div class="calculation-result-row">
                    <inner-container>
                        <calculator-result-list :items="resultList!" />
                        <affordability-alert :price="results.prices.taxAdded" />

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
        </template>
    </container>

    <go-to-calculator-button
        :calculator-container="formEl!"
        :results-container="resultsEl!" />
</template>

<script lang="ts" setup>
import type { CalculatorPage } from "@/types/page-def.js";
import type {
    CalculationResults,
    Form,
    ResultList,
    ScreenshotData
} from "@/domains/telefon-vergisi-hesaplayici/types.js";
import type { ExchangeRates } from "@/types/common.js";
import { calculateResults } from "@/domains/telefon-vergisi-hesaplayici/utils/calculate-results.js";
import { DEFAULT_CURRENCY, DEFAULT_REGISTRATION } from "@/domains/telefon-vergisi-hesaplayici/config.js";

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
    registration: DEFAULT_REGISTRATION
});
const results = ref<CalculationResults | null>(null);
const resultList = ref<ResultList | null>(null);
const screenshotData = ref<ScreenshotData | null>(null);
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
        nextTick(_scrollToResults);
    }
};

const _scrollToResults = (): void => {
    resultsEl.value?.scrollIntoView({ block: "nearest", behavior: "smooth" });
};

onMounted(onSubmit);
</script>

<style lang="scss" scoped>
@import "@/assets/css/calculator/telefon-vergisi-hesaplayici.scss";
</style>
