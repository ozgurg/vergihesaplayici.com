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
import type { Mode } from "@/domains/kdv-hesaplayici/types.js";

export type Props = Partial<FormCheckGroupProps>;

const props = defineProps<Props>();

const ITEMS: FormCheckProps<Mode>[] = [
    {
        title: "KDV hariç tutardan KDV dahil tutarı hesapla",
        input: {
            value: "tax-free-to-tax-added"
        }
    },
    {
        title: "KDV dahil tutardan KDV hariç tutarı hesapla",
        input: {
            value: "tax-added-to-tax-free"
        }
    },
    {
        title: "KDV tutarı ile matrah (vergisiz tutar) hesapla",
        input: {
            value: "tax-to-tax-base"
        }
    }
];
</script>

<style lang="scss" scoped>
.mode {
    grid-template-columns: 1fr
}
</style>
