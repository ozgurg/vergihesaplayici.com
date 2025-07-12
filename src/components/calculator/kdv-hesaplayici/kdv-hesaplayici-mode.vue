<template>
    <form-radio-group
        v-bind="props"
        :items="MODE_OPTIONS" />
</template>

<script lang="ts" setup>
import type {
    Item as FormRadioGroupItem,
    Props as FormRadioGroupProps
} from "@/components/common/form/form-radio-group.vue";
import { Mode } from "@/domains/kdv-hesaplayici/types.js";

export type Props = Partial<FormRadioGroupProps>;

const props = defineProps<Props>();

const MODE_OPTIONS: FormRadioGroupItem[] = [
    {
        title: "KDV hariç tutardan KDV dahil tutarı hesapla",
        input: {
            value: Mode.TAX_FREE_TO_TAX_ADDED
        }
    },
    {
        title: "KDV dahil tutardan KDV hariç tutarı hesapla",
        input: {
            value: Mode.TAX_ADDED_TO_TAX_FREE
        }
    },
    {
        title: "KDV tutarı ile matrah (vergisiz tutar) hesapla",
        input: {
            value: Mode.TAX_TO_TAX_BASE
        }
    }
];
</script>
