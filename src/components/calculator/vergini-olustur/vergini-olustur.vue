<template>
    <container class="calculation-container">
        <inner-container>
            <form
                ref="formEl"
                :aria-label="props.calculatorPage.title"
                @submit.prevent="onSubmit()"
                class="calculation-form">
                <form-group label="Vergisiz tutar">
                    <form-control-number
                        v-model="form.basePrice"
                        :required="true" />
                </form-group>

                <div>
                    <form-group label="Vergi kalemleri">
                        <transition-group
                            name="list-transition"
                            tag="div"
                            class="tax-items">
                            <template v-for="[_id, _taxItem] in form.taxItems" :key="_id">
                                <vergini-olustur-form-tax-item
                                    v-model:is-delete-mode="isDeleteMode"
                                    @click:delete="deleteTaxItem(_id)"
                                    :tax-item="_taxItem"
                                    :EXCHANGE_RATES="props.EXCHANGE_RATES" />
                            </template>
                        </transition-group>
                    </form-group>
                    <form-button
                        @click="addTaxItem()"
                        scale="small"
                        type="button"
                        class="w-100"
                        variant="outlined">
                        Yeni kalem ekle
                    </form-button>
                </div>

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

                        <calculator-quick-share
                            :url="props.calculatorPage.url"
                            @click:other="isCalculatorShareModalOpened = true" />
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
</template>

<script lang="ts" setup>
import type { CalculatorPage } from "@/types/page-def.js";
import type { ExchangeRates } from "@/types/common.js";
import type { CalculationResults, Form, ResultList, ScreenshotData, TaxItem } from "@/domains/vergini-olustur/types.js";
import { BaseAmountMode, RateType } from "@/domains/vergini-olustur/types.js";
import { calculateResults } from "@/domains/vergini-olustur/utils/calculate-results.js";
import { pickRandomPlaceholder } from "@/domains/vergini-olustur/utils/pick-random-placeholder.js";

let id = 0;

export type Props = {
    EXCHANGE_RATES: ExchangeRates;
    calculatorPage: CalculatorPage;
}

export type UITaxItem = TaxItem & {
    placeholder: string;
};

const props = defineProps<Props>();

const formEl = useTemplateRef<HTMLFormElement>("formEl");
const resultsEl = useTemplateRef<HTMLElement>("resultsEl");

const form = reactive<Form<UITaxItem>>({
    basePrice: 0,
    taxItems: new Map([
        [id, {
            name: "",
            rate: 0,
            rateType: RateType.PERCENT,
            rateTypeUnitCurrency: "TRY",
            baseAmountMode: BaseAmountMode.BASE_AMOUNT,
            placeholder: pickRandomPlaceholder()
        }]
    ])
});
const results = ref<CalculationResults | null>(null);
const resultList = ref<ResultList | null>(null);
const screenshotData = ref<ScreenshotData | null>(null);
const isCalculatorShareModalOpened = ref<boolean>(false);
const isDeleteMode = ref<boolean>(false);

const addTaxItem = (): void => {
    form.taxItems.set(++id, {
        name: "",
        rate: 0,
        rateType: RateType.PERCENT,
        rateTypeUnitCurrency: "TRY",
        baseAmountMode: BaseAmountMode.PREVIOUS_AMOUNT,
        placeholder: pickRandomPlaceholder()
    });
};

const deleteTaxItem = (id: number): void => {
    form.taxItems.delete(id);
    if (form.taxItems.size === 0) {
        isDeleteMode.value = false;
    }
};

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

onMounted(() => {
    const handleKeydown = (_event: KeyboardEvent): void => {
        if (isDeleteMode.value && _event.code === "Escape") {
            isDeleteMode.value = false;
        }
    };

    document.addEventListener("keydown", handleKeydown);

    onUnmounted(() => {
        document.removeEventListener("keydown", handleKeydown);
    });
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/calculator/vergini-olustur.scss";
</style>
