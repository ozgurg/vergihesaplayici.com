<template>
    <button
        aria-label="Kapat"
        class="modal-close-button"
        tabindex="0"
        type="button">
        <span>
            <svg-icon :icon="icon_close" />
        </span>
    </button>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_button } from "@/types/html.js";
import { icon_close } from "@/utils/icons.js";

export type Props = /* @vue-ignore */ Partial<HtmlAttrs_button>;

defineProps<Props>();
</script>

<style lang="scss" scoped>
.modal-close-button {
    --_bg-hsl: var(--vh-clr-white-hsl);
    @include vh-reset-button;
    block-size: 100%;
    padding-inline: calc(var(--vh-spacer) * .375);
    &:focus-visible {
        @include vh-clear-focus-appearance;
        span {
            @include vh-focus-appearance
        }
    }
    @include vh-hover {
        &:hover span {
            background-color: hsla(var(--_bg-hsl), .12)
        }
        &:active span {
            background-color: hsla(var(--_bg-hsl), .16)
        }
    }
    span {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        block-size: calc(var(--vh-spacer) * 2.5);
        inline-size: calc(var(--vh-spacer) * 2.5);
        border-radius: var(--vh-br-pill);
        @include vh-hover {
            transition: vh-transition(background-color, var(--vh-duration-short))
        }
        :deep(.svg-icon) {
            --size: 1.875rem
        }
    }
}
</style>
