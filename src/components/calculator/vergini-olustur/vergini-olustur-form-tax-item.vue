<template>
    <div
        class="tax-item"
        aria-label="Vergi kalemi"
        role="group">
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

        <div class="tax-item-second-row">
            <form-group label="Oran">
                <form-control-number
                    v-model="props.taxItem.rate"
                    :required="true"
                    scale="small" />
            </form-group>

            <form-group label="Oran tipi">
                <vergini-olustur-form-tax-item-rate-type-selector
                    v-model="props.taxItem.rateType"
                    :required="true"
                    scale="small" />
            </form-group>

            <div>
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
        </div>

        <div class="tax-item-third-row">
            <form-group label="Baz alınacak tutar">
                <vergini-olustur-form-tax-item-base-amount-mode-selector
                    v-model="props.taxItem.baseAmountMode"
                    :required="true"
                    scale="small" />
            </form-group>

            <form-group aria-label="Vergi kalemi işlemleri">
                <vergini-olustur-form-tax-item-action-buttons
                    v-model:is-delete-mode="isDeleteMode"
                    @click:delete="emit('click:delete')"
                    @move:up="emit('move:up')"
                    @move:down="emit('move:down')" />
            </form-group>
        </div>

        <div
            data-sortable-hide-ghost=""
            aria-hidden="true"
            class="tax-item-count">
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

export type Events = (event: "click:delete" | "move:up" | "move:down") => void;

const isDeleteMode = defineModel<boolean>("is-delete-mode", { default: false });
const props = defineProps<Props>();
const emit = defineEmits<Events>();
</script>

<style lang="scss" scoped>
.tax-item {
    position: relative;
    counter-increment: tax-item-count;
    display: flex;
    flex-direction: column;
    gap: var(--vh-spacer);
    padding-block: var(--vh-spacer);
    padding-inline: var(--container-padding-inline);
    margin-inline: calc(var(--container-padding-inline) * -1);
    @include vh-media-breakpoint-down(sm) {
        &:nth-child(odd) {
            background-color: hsla(var(--vh-clr-white-hsl), .04)
        }
    }
    @include vh-media-breakpoint-up(sm) {
        padding-inline: var(--vh-spacer);
        padding-block: calc(var(--vh-spacer) * 1.5);
        margin-inline: calc(var(--vh-spacer) * -1);
        border-radius: calc(var(--vh-spacer) + var(--vh-br-normal));
        border: var(--vh-border-inline-size) solid hsla(var(--vh-clr-border-hsl), var(--vh-clr-border-alpha));
        &:nth-child(even) {
            background-color: hsla(var(--vh-clr-white-hsl), .02)
        }
    }
    &-second-row {
        display: flex;
        flex-direction: row;
        gap: inherit;
        & > * {
            flex: 1
        }
    }
    &-third-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
        gap: inherit
    }
    &-count {
        position: absolute;
        background: hsla(var(--vh-clr-border-hsl), var(--vh-clr-border-alpha));
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: calc(var(--vh-spacer) * 2);
        height: calc(var(--vh-spacer) * 2);
        line-height: calc(var(--vh-spacer) * 2);
        font-weight: var(--vh-fw-bold);
        font-size: var(--vh-fs-base);
        border-radius: var(--vh-br-pill);
        @include vh-text-number;
        inset-inline-end: var(--vh-spacer);
        inset-block-start: calc(var(--vh-spacer) * .25);
        @include vh-media-breakpoint-up(sm) {
            inset-block-start: calc(var(--vh-spacer) * .625)
        }
        &::before {
            content: counter(tax-item-count)
        }
    }
}
</style>
