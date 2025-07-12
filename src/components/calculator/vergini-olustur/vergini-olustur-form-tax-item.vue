<template>
    <div class="tax-item">
        <div class="tax-item-name">
            <form-group>
                <template #label>
                    <form-label is="legend">
                        Vergi adı<small>&nbsp;–&nbsp;isteğe bağlı</small>
                    </form-label>
                </template>
                <form-control
                    v-model="props.taxItem.name"
                    :placeholder="props.taxItem.placeholder"
                    scale="small" />
            </form-group>
        </div>

        <div class="tax-item-rate">
            <form-group label="Oran">
                <form-control-number
                    v-model="props.taxItem.rate"
                    :required="true"
                    scale="small" />
            </form-group>
        </div>

        <div class="tax-item-rate-type">
            <form-group label="Oran tipi">
                <vergini-olustur-form-tax-item-rate-type-selector
                    v-model="props.taxItem.rateType"
                    :required="true"
                    scale="small" />
            </form-group>
        </div>

        <div class="tax-item-rate-type-unit-currency">
            <transition name="fade-transition" mode="out-in">
                <template v-if="props.taxItem.rateType === RateType.UNIT">
                    <form-group label="Para birimi">
                        <form-select-currency
                            v-model="props.taxItem.rateTypeUnitCurrency"
                            :EXCHANGE_RATES="props.EXCHANGE_RATES"
                            :required="true"
                            scale="small" />
                    </form-group>
                </template>
            </transition>
        </div>

        <div class="tax-item-base-amount-mode">
            <form-group label="Baz alınacak tutar">
                <vergini-olustur-form-tax-item-base-amount-mode-selector
                    v-model="props.taxItem.baseAmountMode"
                    :required="true"
                    scale="small" />
            </form-group>
        </div>

        <div class="tax-item-actions">
            <form-group label="">
                <vergini-olustur-form-tax-item-action-buttons
                    v-model:is-delete-mode="isDeleteMode"
                    @click:delete="emit('click:delete')" />
            </form-group>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { UITaxItem } from "@/components/calculator/vergini-olustur/vergini-olustur.vue";
import type { ExchangeRates } from "@/types/common.js";
import { RateType } from "@/domains/vergini-olustur/types.js";

export type Props = {
    taxItem: UITaxItem;
    EXCHANGE_RATES: ExchangeRates;
}

export type Events = (event: "click:delete") => void;

const isDeleteMode = defineModel<boolean>("is-delete-mode", { default: false });
const props = defineProps<Props>();
const emit = defineEmits<Events>();
</script>

<style lang="scss" scoped>
.tax-item {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: var(--vh-spacer);
    grid-template-areas:
        "name name name"
        "rate rate-type rate-type-unit-currency"
        "base-amount-mode actions actions";
    padding: var(--vh-spacer);
    padding-block-start: calc(var(--vh-spacer) * 1.25);
    border-radius: calc(var(--vh-spacer) + var(--vh-br-normal));
    margin-inline: calc(var(--vh-spacer) * -1);
    border: var(--vh-border-inline-size) solid hsla(var(--vh-clr-border-hsl), var(--vh-clr-border-alpha));
    &-name {
        grid-area: name
    }
    &-rate {
        grid-area: rate
    }
    &-rate-type {
        grid-area: rate-type
    }
    &-rate-type-unit-currency {
        grid-area: rate-type-unit-currency
    }
    &-base-amount-mode {
        grid-area: base-amount-mode
    }
    &-actions {
        grid-area: actions;
        text-align: end
    }
}
</style>
