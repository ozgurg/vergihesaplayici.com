<template>
    <main class="app-body">
        <slot name="default" />
    </main>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_main } from "@/types/html.js";

export type Props = /* @vue-ignore */ Partial<HtmlAttrs_main>;

defineProps<Props>();
</script>

<style lang="scss" scoped>
.app-body {
    flex: 1;
    padding-block-end: calc(var(--vh-spacer) * 2);
    @include vh-media-breakpoint-up(md) {
        padding-block-end: calc(var(--vh-spacer) * 4)
    }
}
</style>
