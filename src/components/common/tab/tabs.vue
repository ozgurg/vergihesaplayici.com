<template>
    <slot name="default" />
</template>

<script lang="ts" setup>
const modelValue = defineModel<string>();

const ID = `tabs-${useId()}`;

provide("tabs.modelValue", modelValue);
provide("tabs.id", ID);
</script>
