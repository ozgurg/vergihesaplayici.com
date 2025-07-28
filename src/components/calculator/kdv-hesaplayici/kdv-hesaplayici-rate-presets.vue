<template>
    <form-check-group
        v-bind="props"
        :items="ITEMS"
        type="radio"
        class="form-check-group-presets" />
</template>

<script lang="ts" setup>
import type {
    Item as FormCheckProps,
    Props as FormCheckGroupProps
} from "@/components/common/form/form-check-group.vue";

export type Props = Partial<FormCheckGroupProps>;

const props = defineProps<Props>();

const ITEMS: FormCheckProps[] = [
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
