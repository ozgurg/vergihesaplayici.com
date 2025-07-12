<template>
    <hgroup class="page-header">
        <slot name="default" />
    </hgroup>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_hgroup } from "@/types/html.js";

export type Props = /* @vue-ignore */ Partial<HtmlAttrs_hgroup>;

defineProps<Props>();
</script>

<style lang="scss" scoped>
.page-header {
    background: linear-gradient(to top, transparent, hsla(var(--vh-clr-primary-hsl), .04));
    padding-block-end: calc(var(--vh-spacer) * 2);
    @include vh-media-breakpoint-down(md) {
        padding-block-start: calc((var(--header-down-md-block-size) - (var(--breadcrumbs-block-size) - var(--breadcrumbs-item-block-size))) + var(--vh-spacer))
    }
    @include vh-media-breakpoint-up(md) {
        @supports (not(animation-timeline: scroll())) {
            padding-block-start: calc(var(--vh-spacer) * 2)
        }
    }
}
</style>
