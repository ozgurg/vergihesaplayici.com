<template>
    <div class="inner-container">
        <slot name="default" />
    </div>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_div } from "@/types/html.js";

export type Props = /* @vue-ignore */ Partial<HtmlAttrs_div>;

defineProps<Props>();
</script>

<style lang="scss" scoped>
.inner-container {
    flex-shrink: 0;
    inline-size: 100%;
    @include vh-media-breakpoint-up(md) {
        max-inline-size: 34rem
    }
}
</style>
