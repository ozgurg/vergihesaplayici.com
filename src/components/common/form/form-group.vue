<template>
    <fieldset class="form-group">
        <template v-if="props.label !== undefined">
            <form-label is="legend">
                {{ props.label }}
            </form-label>
        </template>
        <template v-else>
            <slot name="label" />
        </template>

        <div class="form-group-content">
            <slot name="default" />
        </div>
    </fieldset>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_fieldset } from "@/types/html.js";

export type Props = {
    label?: string;
} & /* @vue-ignore */ Partial<HtmlAttrs_fieldset>;

const props = defineProps<Props>();

const ID = `form-group-${useId()}`;

provide("form-group.id", ID);
</script>

<style lang="scss" scoped>
.form-group {
    :deep(legend, label) {
        min-block-size: 1lh;
        margin-block-end: calc(var(--vh-spacer) * .25)
    }
    &-content {
        flex: 1
    }
}
</style>
