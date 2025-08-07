<template>
    <form-check-group
        v-bind="props"
        :items="ITEMS"
        type="radio"
        class="telefon-vergisi-hesaplayici-registration" />
</template>

<script lang="ts" setup>
import type {
    Item as FormCheckProps,
    Props as FormCheckGroupProps
} from "@/components/common/form/form-check-group.vue";
import { Registration } from "@/domains/telefon-vergisi-hesaplayici/types.js";

export type Props = Partial<FormCheckGroupProps>;

const props = defineProps<Props>();

const ITEMS: FormCheckProps[] = [
    {
        title: "İthalat ile",
        description: "İthalatçıların getirip sattığı ürünlerdir",
        input: {
            value: Registration.IMPORT
        }
    },
    {
        title: "Pasaport ile",
        description: "Yurt dışından kişinin getirdiği ürünlerdir",
        input: {
            value: Registration.PASSPORT
        }
    }
];
</script>

<style lang="scss" scoped>
.telefon-vergisi-hesaplayici-registration {
    grid-template-columns: repeat(2, 1fr)
}
</style>
