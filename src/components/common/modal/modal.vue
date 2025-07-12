<template>
    <dialog
        ref="dialogEl"
        :aria-hidden="modelValue ? 'false' : 'true'"
        :aria-modal="modelValue ? 'true' : undefined"
        @click="closeOnBackdropClick($event)"
        @close="close()"
        class="modal"
        role="dialog"
        tabindex="-1">
        <div class="modal-content">
            <slot name="default" />
        </div>
    </dialog>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_dialog } from "@/types/html.js";

export type Props = /* @vue-ignore */ Partial<HtmlAttrs_dialog>;

defineProps<Props>();
const modelValue = defineModel<boolean>();

const dialogEl = useTemplateRef<HTMLDialogElement>("dialogEl");

const _toggle = (): void => {
    if (modelValue.value) {
        dialogEl.value?.showModal();
    } else {
        dialogEl.value?.close();
    }
};

const closeOnBackdropClick = (event: MouseEvent): void => {
    if (event.target === event.currentTarget) {
        close();
    }
};

const close = (): void => {
    modelValue.value = false;
};

watch(modelValue, _toggle);

// Calling `_toggle` with an immediate watcher works functionally,
// but I can't manage to test whether `_toggle` is called when the component is mounted.
onMounted(_toggle);
</script>

<style lang="scss" scoped>
// To make the backdrop of the `<modal-header />` work without the rubber band effect,
// I set it to `position: absolute`. However, this caused the `<modal-body />` to stay under the `<modal-header />`.
// To fix this, I manually set the `padding-block-start` for the `<modal-body />` to create more space.
// This requires defining a maximum `<modal-header />` count.
// Once we can read the child count and use that count in a `calc()` function, this workaround can be safely removed.
// https://css-tricks.com/almanac/functions/s/sibling-count/
$_maximum-modal-headers: 2;

.modal {
    $self: &;
    --modal-header-block-size: calc(var(--vh-spacer) * 3);
    display: none;
    overflow: hidden;
    align-items: flex-end;
    justify-content: center;
    transition: vh-transition(opacity transform, var(--vh-duration-long)), display var(--vh-duration-long) allow-discrete, overlay var(--vh-duration-long) allow-discrete;
    transform: translateY(100%);
    will-change: opacity, transform, display, overlay;
    block-size: 100%;
    inline-size: 100%;
    max-inline-size: 100%;
    max-block-size: 100%;
    padding-block-start: calc(var(--vh-spacer) * 2);
    @include vh-media-breakpoint-up(md) {
        align-items: center;
        transform: scale(0);
        opacity: 0;
        padding-block: var(--vh-spacer)
    }
    &-content {
        position: relative;
        display: flex;
        overflow: hidden;
        flex-direction: column;
        border: var(--vh-border-inline-size) solid hsla(var(--vh-clr-border-hsl), var(--vh-clr-border-alpha));
        border-radius: var(--vh-br-normal) var(--vh-br-normal) 0 0;
        background: hsl(var(--vh-clr-primary-h), 8%, 10%);
        inline-size: 38rem;
        max-inline-size: 100%;
        max-block-size: 100%;
        min-block-size: 60vh;
        @include vh-media-breakpoint-up(md) {
            border-radius: var(--vh-br-normal);
            max-block-size: 85vh;
            min-block-size: unset
        }
    }
    @for $i from 1 through $_maximum-modal-headers {
        &:has(#{$self}-header > div:nth-child(#{$i})) {
            --modal-header-count: #{$i}
        }
    }
    &[open] {
        display: flex;
        transform: translateY(0);
        opacity: 1;
        @include vh-media-breakpoint-up(md) {
            transform: scale(1)
        }
        @starting-style {
            display: flex;
            opacity: 1;
            transform: translateY(100%);
            @include vh-media-breakpoint-up(md) {
                transform: scale(0)
            }
        }
        &::backdrop {
            opacity: 1;
            @starting-style {
                opacity: 0
            }
        }
    }
    &::backdrop {
        transition: vh-transition(opacity, var(--vh-duration-short));
        opacity: 0;
        background: hsla(var(--vh-clr-black-hsl), .5);
        @include vh-backdrop-filter(blur(1px))
    }
}

:global(html:has(.modal[open]) body) {
    overflow: hidden
}
</style>
