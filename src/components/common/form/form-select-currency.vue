<template>
    <form-select
        v-bind="props"
        v-model="modelValue"
        :items="ITEMS" />
</template>

<script lang="ts" setup>
import type { Item as FormSelectItem, Props as FormSelectProps } from "@/components/common/form/form-select.vue";
import type { CurrencyCode, ExchangeRates } from "@/types/common.js";

export type Props = {
    EXCHANGE_RATES: ExchangeRates;
} & Omit<FormSelectProps, "items">;

const props = defineProps<Props>();
const modelValue = defineModel<CurrencyCode>();

const ITEMS: FormSelectItem[] = Object.entries(props.EXCHANGE_RATES.rates).map(([_currencyCode]) => ({
    title: _currencyCode,
    value: _currencyCode
}));
</script>
