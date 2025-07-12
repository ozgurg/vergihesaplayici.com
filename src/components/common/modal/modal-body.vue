<template>
    <transition name="tab-transition" mode="out-in">
        <main
            :key="tabsModelValue"
            class="modal-body">
            <slot name="default" />
        </main>
    </transition>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_main } from "@/types/html.js";

export type Props = /* @vue-ignore */ Partial<HtmlAttrs_main>;

defineProps<Props>();

const tabsModelValue = inject("tabs.modelValue", ref());
</script>

<style lang="scss" scoped>
.modal-body {
    --_padding-inline: var(--vh-spacer);
    --_padding-block: calc(var(--vh-spacer) * 2.5);
    --_total-block-size-of-modal-headers: calc(var(--modal-header-count) * var(--modal-header-block-size));
    position: relative;
    z-index: 1;
    overflow-y: auto;
    flex: 1;
    padding-block-start: calc(var(--_padding-block) + var(--_total-block-size-of-modal-headers));
    padding-block-end: var(--_padding-block);
    padding-inline: var(--_padding-inline)
}

.tab-transition {
    &-enter-active,
    &-leave-active {
        transition: vh-transition(transform opacity, var(--vh-duration-long))
    }
    &-enter-from,
    &-leave-to {
        transform: translateY(var(--vh-spacer));
        opacity: 0
    }
    &-active {
        position: absolute
    }
}
</style>
