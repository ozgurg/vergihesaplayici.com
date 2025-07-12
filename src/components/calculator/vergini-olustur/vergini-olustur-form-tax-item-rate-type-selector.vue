<template>
    <form-select
        v-bind="props"
        :items="ITEMS" />
</template>

<script lang="ts" setup>
import type { Props as FormSelectProps } from "@/components/common/form/form-select.vue";
import { RateType } from "@/domains/vergini-olustur/types.js";

export type Props = Omit<FormSelectProps, "items">;

const props = defineProps<Props>();

const ITEMS = [
    {
        title: "Yüzde",
        value: RateType.PERCENT
    },
    {
        title: "Birim",
        value: RateType.UNIT
    }
];
</script>
