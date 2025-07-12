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

export type Props = Partial<FormRadioGroupProps>;

const props = defineProps<Props>();

const ITEMS: FormRadioGroupItem[] = [
    {
        title: "%1",
        input: {
            value: 1
        }
    },
    {
        title: "%10",
        input: {
            value: 10
        }
    },
    {
        title: "%20",
        input: {
            value: 20
        }
    }
];
</script>
