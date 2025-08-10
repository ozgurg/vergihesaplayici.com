<template>
    <form-check-group class="package-options">
        <form-check
            v-model="isOverTaxExemptionWeightLimit"
            :value="true"
            type="checkbox">
            <b>Paketin ağırlığı {{ TAX_EXEMPTION_WEIGHT_LIMIT_IN_KG }} kg'ı aşıyor</b>
        </form-check>

        <form-check
            v-model="isPrintedOnly"
            :disabled="isOverTaxExemptionWeightLimit || isOverTaxExemptionPriceLimit"
            :value="true"
            type="checkbox">
            <b>Yalnızca ticari olmayan kitap veya benzeri basılı yayın içeriyor</b>

            <!-- 🤮 -->
            <template v-if="isOverTaxExemptionWeightLimit && isOverTaxExemptionPriceLimit">
                <small>
                    {{ TAX_EXEMPTION_WEIGHT_LIMIT_IN_KG }} kg veya <span
                    class="text-number">{{ formatMoney(TAX_EXEMPTION_PRICE_LIMIT_IN_EUR, "EUR") }}</span> üzeri
                    paketlerde kitap veya benzeri basılı yayın muafiyeti geçerli değildir
                </small>
                <small>
                    Sipariş tutarı: <span class="text-number">{{ formatMoney(props.eurPrice, "EUR") }}</span>
                </small>
            </template>
            <template v-else-if="isOverTaxExemptionWeightLimit">
                <small>
                    {{ TAX_EXEMPTION_WEIGHT_LIMIT_IN_KG }} kg üzeri paketlerde kitap veya benzeri basılı yayın muafiyeti
                    geçerli değildir
                </small>
            </template>
            <template v-else-if="isOverTaxExemptionPriceLimit">
                <small>
                    <span class="text-number">{{ formatMoney(TAX_EXEMPTION_PRICE_LIMIT_IN_EUR, "EUR") }}</span> üzeri
                    paketlerde kitap veya benzeri basılı yayın muafiyeti geçerli değildir
                </small>
                <small>
                    Sipariş tutarı: <span class="text-number">{{ formatMoney(props.eurPrice, "EUR") }}</span>
                </small>
            </template>
        </form-check>

        <form-check
            v-model="isSpecialConsumptionTaxed"
            :disabled="isPrintedOnly"
            :value="true"
            type="checkbox">
            <b>ÖTV'ye tabi ürün içeriyor</b>
            <template v-if="isPrintedOnly">
                <small>Kitap veya benzeri basılı yayınlar ÖTV'den muaftır</small>
            </template>
        </form-check>

        <form-check
            v-model="isFromEU"
            :disabled="isPrintedOnly"
            :value="true"
            type="checkbox">
            <b>Avrupa Birliği üyesi bir ülkeden geliyor</b>
            <template v-if="isPrintedOnly">
                <small>Kitap veya benzeri basılı yayınlar menşei farkı gözetmeksizin gümrük vergisinden muaftır</small>
            </template>
        </form-check>

        <form-check
            v-model="isShippingIncluded"
            :value="true"
            type="checkbox">
            <b>Kargo tutarı, faturada ayrı gösteriliyor</b>
            <template v-if="!isShippingIncluded">
                <small>Kargo tutarı, faturada ayrı gösterilmediği durumda <span
                    class="text-number">{{ formatMoney(SHIPPING_PRICE_IN_EUR, "EUR") }}</span> emsal navlun
                    gideri eklenir</small>
            </template>
        </form-check>
    </form-check-group>
</template>

<script lang="ts" setup>
import { formatMoney } from "@/utils/formatter.js";
import { TAX_EXEMPTION_PRICE_LIMIT_IN_EUR, TAX_EXEMPTION_WEIGHT_LIMIT_IN_KG } from "@/domains/gumruk-vergisi/config.js";
import { SHIPPING_PRICE_IN_EUR } from "@/domains/gumruk-vergisi/calculator.js";

export type Props = {
    eurPrice: number;
};

const props = defineProps<Props>();

const isOverTaxExemptionWeightLimit = defineModel<boolean>("isOverTaxExemptionWeightLimit");
const isOverTaxExemptionPriceLimit = defineModel<boolean>("isOverTaxExemptionPriceLimit");
const isPrintedOnly = defineModel<boolean>("isPrintedOnly");
const isSpecialConsumptionTaxed = defineModel<boolean>("isSpecialConsumptionTaxed");
const isFromEU = defineModel<boolean>("isFromEU");
const isShippingIncluded = defineModel<boolean>("isShippingIncluded");

watch([isOverTaxExemptionWeightLimit, isOverTaxExemptionPriceLimit], ([weightLimit, priceLimit]) => {
    if (weightLimit || priceLimit) {
        isPrintedOnly.value = false;
    }
});

watch(isPrintedOnly, (newValue) => {
    if (newValue) {
        isSpecialConsumptionTaxed.value = false;
        isFromEU.value = false;
    }
});
</script>

<style lang="scss" scoped>
.package-options {
    grid-template-columns: 1fr
}
</style>
