<template>
    <header class="modal-header">
        <slot name="default" />
    </header>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_header } from "@/types/html.js";

export type Props = /* @vue-ignore */ Partial<HtmlAttrs_header>;

defineProps<Props>();
</script>

<style lang="scss" scoped>
.modal-header {
    position: absolute;
    z-index: 2;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    background: hsla(var(--vh-clr-white-hsl), .04);
    inline-size: 100%;
    inset-block-start: 0;
    inset-inline: 0;
    @include vh-backdrop-blur(1rem);
    &:last-of-type {
        border-block-end: var(--vh-border-inline-size) solid hsla(var(--vh-clr-border-hsl), var(--vh-clr-border-alpha))
    }
    & > :deep(div) {
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
        block-size: var(--modal-header-block-size)
    }
}
</style>
