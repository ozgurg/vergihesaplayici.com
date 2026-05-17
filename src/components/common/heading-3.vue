<template>
    <component
        :is="props.tag"
        class="heading-3">
        <slot name="default" />
    </component>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_h3 } from "@/types/html.js";

export type Props = {
    tag?: string;
} & /* @vue-ignore */ Partial<HtmlAttrs_h3>;

const props = withDefaults(defineProps<Props>(), {
    tag: "h3"
});
</script>

<style lang="scss" scoped>
.heading-3 {
    @include vh-heading-3;
    margin-block-end: var(--vh-spacer)
}
</style>
