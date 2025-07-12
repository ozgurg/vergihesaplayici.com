<template>
    <div class="container">
        <slot name="default" />
    </div>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_div } from "@/types/html.js";

export type Props = /* @vue-ignore */ Partial<HtmlAttrs_div>;

defineProps<Props>();
</script>

<style lang="scss" scoped>
.container {
    box-sizing: content-box;
    margin-inline: auto;
    padding-inline: var(--container-padding-inline);
    max-inline-size: var(--container-inline-size)
}
</style>
