<template>
    <component
        :is="props.is"
        class="heading-2">
        <slot name="default" />
    </component>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_h2 } from "@/types/html.js";

export type Props = {
    is?: `h${number}`;
} & /* @vue-ignore */ Partial<HtmlAttrs_h2>;

const props = withDefaults(defineProps<Props>(), {
    is: "h2"
});
</script>

<style lang="scss" scoped>
.heading-2 {
    --_gap: calc(var(--vh-spacer) * .75);
    --_border-inline-size: calc(var(--vh-spacer) * .25);
    font-size: var(--vh-fs-lg);
    font-weight: var(--vh-fw-bold);
    display: flex;
    align-items: center;
    gap: var(--_gap);
    margin-block-end: calc(var(--vh-spacer) * 1.25);
    @include vh-media-breakpoint-down(sm) {
        margin-inline-start: calc((var(--_gap) + var(--_border-inline-size)) * -1)
    }
    @include vh-hover {
        :deep(a) {
            transition: vh-transition(color, var(--vh-duration-short));
            &:hover {
                color: var(--vh-clr-primary)
            }
        }
    }
    &::before {
        display: inline-block;
        content: "";
        border-radius: 0 var(--vh-br-normal) var(--vh-br-normal) 0;
        background: var(--vh-clr-primary);
        block-size: calc(var(--vh-spacer) * 1.5);
        inline-size: var(--_border-inline-size);
        @include vh-media-breakpoint-up(sm) {
            border-radius: var(--vh-br-normal)
        }
    }
}
</style>
