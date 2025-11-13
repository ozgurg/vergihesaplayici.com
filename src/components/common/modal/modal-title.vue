<template>
    <component
        :is="props.is"
        class="modal-title">
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
.modal-title {
    font-weight: var(--vh-fw-semibold);
    margin-inline-start: var(--vh-spacer)
}
</style>
