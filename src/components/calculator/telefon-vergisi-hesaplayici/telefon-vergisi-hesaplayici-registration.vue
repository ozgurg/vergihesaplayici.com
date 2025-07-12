<template>
    <form-radio-group
        v-bind="props"
        :items="ITEMS" />
</template>

<script lang="ts" setup>
import type {
    Item as FormRadioGroupItem,
    Props as FormRadioGroupProps
} from "@/components/common/form/form-radio-group.vue";
import { Registration } from "@/domains/telefon-vergisi-hesaplayici/types.js";

export type Props = Partial<FormRadioGroupProps>;

const props = defineProps<Props>();

const ITEMS: FormRadioGroupItem[] = [
    {
        title: "İthalat ile",
        description: "İthalatçıların getirip sattığı ürünlerdir.",
        input: {
            value: Registration.IMPORT
        }
    },
    {
        title: "Pasaport ile",
        description: "Yurt dışından kişinin getirdiği ürünlerdir.",
        input: {
            value: Registration.PASSPORT
        }
    }
];
</script>
