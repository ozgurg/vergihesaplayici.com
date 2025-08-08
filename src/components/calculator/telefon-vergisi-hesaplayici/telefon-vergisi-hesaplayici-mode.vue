<template>
    <form-check-group
        v-bind="props"
        :items="ITEMS"
        type="radio"
        class="telefon-vergisi-hesaplayici-mode" />
</template>

<script lang="ts" setup>
import type {
    Item as FormCheckProps,
    Props as FormCheckGroupProps
} from "@/components/common/form/form-check-group.vue";
import { Mode } from "@/domains/telefon-vergisi-hesaplayici/types.js";

export type Props = Partial<FormCheckGroupProps>;

const props = defineProps<Props>();

const ITEMS: FormCheckProps[] = [
    {
        title: "Vergili fiyattan vergisiz fiyatı hesapla",
        input: {
            value: Mode.TAX_ADDED_TO_TAX_FREE
        }
    },
    {
        title: "Vergisiz fiyattan vergili fiyatı hesapla",
        input: {
            value: Mode.TAX_FREE_TO_TAX_ADDED
        }
    }
];
</script>

<style lang="scss" scoped>
.telefon-vergisi-hesaplayici-mode {
    grid-template-columns: repeat(1, 1fr);
    @include vh-media-breakpoint-up(sm) {
        grid-template-columns: repeat(2, 1fr)
    }
}
</style>
