<template>
    <rich-text
        :class="CLASSES"
        role="alert">
        <slot name="default" />
    </rich-text>
</template>

<script lang="ts" setup>
import type { Props as RichTextProps } from "@/components/common/rich-text.vue";

export type Props = {
    color?: "warning" | "info";
} & RichTextProps;

const props = defineProps<Props>();

const CLASSES = [
    "alert",
    `alert-color-${props.color}`
];
</script>

<style lang="scss" scoped>
$_colors: (
    "warning": (
        --bg-hsl: var(--vh-clr-warning-hsl),
        --text-hsl: var(--vh-clr-warning-hsl)
    ),
    "info": (
        --bg-hsl: var(--vh-clr-info-hsl),
        --text-hsl: var(--vh-clr-info-hsl)
    )
);

.alert {
    --_bg-hsl: var(--bg-hsl, var(--vh-clr-white-hsl));
    --_text-hsl: var(--text-hsl, var(--vh-clr-white-hsl));
    --link-color: hsl(var(--_text-hsl));
    padding: calc(var(--vh-spacer) * .75) var(--vh-spacer);
    text-wrap: pretty;
    color: hsl(var(--_text-hsl));
    border-radius: var(--vh-br-normal);
    background: linear-gradient(to top, hsla(var(--_bg-hsl), .08), hsla(var(--_bg-hsl), .16));
    @each $__color, $__properties in $_colors {
        &-color-#{$__color} {
            @include vh-map-to-properties($__properties)
        }
    }
}
</style>
