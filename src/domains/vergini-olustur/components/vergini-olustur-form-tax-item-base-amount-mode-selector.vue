<template>
    <form-select
        v-bind="props"
        :items="ITEMS" />
</template>

<script lang="ts" setup>
import type { Item as FormSelectItem, Props as FormSelectProps } from "@/components/common/form/form-select.vue";
import type { BaseAmountMode } from "@/domains/vergini-olustur/types.js";

export type Props = Omit<FormSelectProps, "items">;

const props = defineProps<Props>();

const ITEMS: FormSelectItem<BaseAmountMode>[] = [
    {
        title: "Vergisiz tutar",
        value: "base-amount"
    },
    {
        title: "Önceki tutar",
        value: "previous-amount"
    }
];
</script>
