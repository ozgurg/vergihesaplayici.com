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
import type { Mode } from "@/domains/konsol-vergisi-hesaplayici/types.js";

export type Props = Partial<FormCheckGroupProps>;

const props = defineProps<Props>();

const ITEMS: FormCheckProps<Mode>[] = [
    {
        title: "Vergili fiyattan vergisiz fiyatı hesapla",
        input: {
            value: "tax-added-to-tax-free"
        }
    },
    {
        title: "Vergisiz fiyattan vergili fiyatı hesapla",
        input: {
            value: "tax-free-to-tax-added"
        }
    }
];
</script>

<style lang="scss" scoped>
.mode {
    grid-template-columns: repeat(1, 1fr);
    @include vh-media-breakpoint-up(sm) {
        grid-template-columns: repeat(2, 1fr)
    }
}
</style>
