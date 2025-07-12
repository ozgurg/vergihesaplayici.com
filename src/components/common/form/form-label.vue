<template>
    <component
        :is="props.is"
        :id="ID"
        class="form-label">
        <slot name="default" />
    </component>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_label, HtmlAttrs_legend } from "@/types/html.js";

export type Props = {
    is?: "label" | "legend";
} & /* @vue-ignore */ Partial<HtmlAttrs_label | HtmlAttrs_legend>;

const props = withDefaults(defineProps<Props>(), {
    is: "label"
});
const formGroupId = inject("form-group.id", null);

const ID = props["id"] || formGroupId;
</script>

<style lang="scss" scoped>
.form-label {
    :deep(small) {
        opacity: .75;
        font-size: .875em
    }
}
</style>
