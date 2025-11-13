<template>
    <component
        :is="props.is"
        class="heading-3">
        <slot name="default" />
    </component>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_h3 } from "@/types/html.js";

export type Props = {
    is?: `h${number}` | string;
} & /* @vue-ignore */ Partial<HtmlAttrs_h3>;

const props = withDefaults(defineProps<Props>(), {
    is: "h3"
});
</script>

<style lang="scss" scoped>
.heading-3 {
    @include vh-heading-3;
    margin-block-end: var(--vh-spacer)
}
</style>
