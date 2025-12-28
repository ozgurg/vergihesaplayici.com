<template>
    <div
        :style="{'--anchor-name': ANCHOR_NAME}"
        class="tab-list"
        role="tablist">
        <slot name="default" />
    </div>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_div } from "@/types/html.js";

export type Props = /* @vue-ignore */ Partial<HtmlAttrs_div>;

defineProps<Props>();

const ANCHOR_NAME = `--tab-active-item-indicator-${useId()}`;
</script>

<style lang="scss" scoped>
.tab-list {
    --_anchor-name: var(--anchor-name, --tab-active-item-indicator);
    position: relative;
    display: flex;
    flex-direction: row;
    inline-size: 100%;
    @supports (anchor-name: var(--_anchor-name)) {
        &::after {
            position: absolute;
            content: "";
            background: var(--vh-clr-primary);
            block-size: 3px;
            border-radius: var(--vh-br-normal) var(--vh-br-normal) 0 0;
            will-change: inset-inline-start, inline-size;
            transition: vh-transition(inset-inline-start inline-size, var(--vh-duration-long));
            inset-inline-start: anchor(--_anchor-name start);
            inset-block-end: 0;
            inline-size: anchor-size(--_anchor-name inline)
        }
    }
}
</style>
