<template>
    <component
        :is="props.is"
        class="heading-2">
        <slot name="default" />
    </component>
</template>

<script lang="ts" setup>
import type { Heading } from "@/types/common.js";
import type { HtmlAttrs_h2 } from "@/types/html.js";

export type Props = {
    is?: Heading;
} & /* @vue-ignore */ Partial<HtmlAttrs_h2>;

const props = withDefaults(defineProps<Props>(), {
    is: "h2"
});
</script>

<style lang="scss" scoped>
.heading-2 {
    @include vh-heading-2;
    margin-block-end: calc(var(--vh-spacer) * 1.25);
    @include vh-hover {
        :deep(a) {
            transition: vh-transition(color, var(--vh-duration-short));
            &:hover {
                color: var(--vh-clr-primary)
            }
        }
    }
}
</style>
