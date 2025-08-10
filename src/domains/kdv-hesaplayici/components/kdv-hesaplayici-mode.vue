<template>
    <form-check-group
        v-bind="props"
        :items="ITEMS"
        type="radio"
        class="mode" />
</template>

<script lang="ts" setup>
import type {
    Item as FormCheckProps,
    Props as FormCheckGroupProps
} from "@/components/common/form/form-check-group.vue";
import { Mode } from "@/domains/kdv-hesaplayici/types.js";

export type Props = Partial<FormCheckGroupProps>;

const props = defineProps<Props>();

const ITEMS: FormCheckProps[] = [
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

<style lang="scss" scoped>
.mode {
    grid-template-columns: 1fr
}
</style>
