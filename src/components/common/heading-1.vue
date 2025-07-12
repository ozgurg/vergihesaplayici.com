<template>
    <component
        :is="props.is"
        class="heading-1">
        <slot name="default" />
    </component>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_h1 } from "@/types/html.js";

export type Props = {
    is?: `h${number}`;
} & /* @vue-ignore */ Partial<HtmlAttrs_h1>;

const props = withDefaults(defineProps<Props>(), {
    is: "h1"
});
</script>

<style lang="scss" scoped>
.heading-1 {
    font-size: clamp(var(--vh-fs-base), calc(4.5vw + var(--vh-spacer)), var(--vh-fs-xxl));
    font-weight: var(--vh-fw-bold);
    line-height: var(--vh-lh-sm);
    color: var(--vh-clr-primary);
    padding-block-end: calc(var(--vh-spacer) * .5);
    @include vh-media-breakpoint-down(md) {
        text-align: center
    }
}
</style>
