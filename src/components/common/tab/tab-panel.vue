<template>
    <div
        :id="ID"
        :aria-labelledby="ARIA_LABELLEDBY"
        :hidden="isSelected ? undefined : ''"
        role="tabpanel"
        tabindex="0">
        <slot name="default" />
    </div>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_div } from "@/types/html.js";

export type Props = {
    value: string;
} & /* @vue-ignore */ Partial<HtmlAttrs_div>;

const props = defineProps<Props>();
const tabsModelValue = inject("tabs.modelValue", ref());
const tabsId = inject("tabs.id", null);

const ID = props["id"] || `${tabsId}-tab-panel-${props.value}`;
const ARIA_LABELLEDBY = props["aria-labelledby"] || `${tabsId}-tab-${props.value}`;

const isSelected = computed<boolean>(() => {
    return tabsModelValue.value === props.value;
});

onBeforeMount(() => {
    if (!tabsId) {
        throw new Error("`<tab-panel />` components must be nested within a `<tabs />`.");
    }
});
</script>
