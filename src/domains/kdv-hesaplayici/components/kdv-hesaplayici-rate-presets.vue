<template>
    <form-check-group
        v-bind="props"
        :items="ITEMS"
        type="radio"
        class="kdv-hesaplayici-rate-presets" />
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

<style lang="scss" scoped>
.kdv-hesaplayici-rate-presets {
    grid-template-columns: repeat(3, 1fr);
    margin-block-start: var(--vh-spacer);
    :deep(.form-check) {
        background-image: none
    }
    :deep(b) {
        font-weight: var(--vh-fw-semibold);
        @include vh-text-number
    }
}
</style>
