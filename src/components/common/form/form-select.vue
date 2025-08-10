<template>
    <div :class="CLASSES">
        <select
            v-bind="$attrs"
            v-model="modelValue"
            :aria-labelledby="ARIA_LABELLEDBY">
            <option
                :disabled="true"
                :selected="true">
                Seçin…
            </option>
            <template v-for="_item in props.items">
                <!--
                Since I use v-model on the `<select />`,
                the `selected` attr on individual `<option />` elements is technically unnecessary.
                However, setting it can prevent issues where the initially rendered value ("Seçin…")
                briefly shows before being replaced by the correct value after hydration.
                -->
                <option
                    :disabled="_item.disabled"
                    :value="_item.value">
                    {{ _item.title }}
                </option>
            </template>
        </select>

        <!--
        I prefer using `<svg-icon />` for the chevron instead of
        setting a `background-image` to take advantage of our SVG cache.
        It's also easier to change the color.
        -->
        <svg-icon :icon="icon_chevronDown" />
    </div>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_option, HtmlAttrs_select } from "@/types/html.js";
import { icon_chevronDown } from "@/utils/icons.js";

type Scale = "small" | "medium" | "large";

export type Item<V = HtmlAttrs_option["value"]> = {
    title: string;
    value?: V;
} & /* @vue-ignore */ Partial<HtmlAttrs_option>;

export type Props = {
    items: Item[];
    scale?: Scale;
} & /* @vue-ignore */ Partial<HtmlAttrs_select>;

defineOptions({ inheritAttrs: false });
const props = withDefaults(defineProps<Props>(), {
    scale: "large"
});
const attrs = useAttrs() as Props;
const modelValue = defineModel<string | number>();
const formGroupId = inject("form-group.id", null);

const ARIA_LABELLEDBY = attrs["aria-labelledby"] || formGroupId;

const CLASSES = [
    "form-select",
    `form-select-scale-${props.scale}`
];
</script>

<style lang="scss" scoped>
$_default-block-size: 3.125rem;

$_scales: (
    "small": (
        --padding-inline: calc(var(--vh-spacer) * .75),
        --block-size: 2.5rem,
        --border-radius: var(--vh-br-small)
    ),
    "medium": (
        --padding-inline: var(--vh-spacer),
        --block-size: 2.75rem,
        --border-radius: var(--vh-br-small)
    ),
    "large": (
        --padding-inline: var(--vh-spacer),
        --block-size: #{$_default-block-size},
        --border-radius: var(--vh-br-normal)
    )
);

.form-select {
    --_padding-inline: var(--padding-inline);
    --_block-size: var(--block-size);
    --_border-radius: var(--border-radius);
    --_icon-size: calc(var(--vh-spacer) * 1.25);
    position: relative;
    display: flex;
    align-items: center;
    flex: 1;
    flex-flow: row nowrap;
    transition: vh-transition(background-color box-shadow border-color, var(--vh-duration-short));
    gap: calc(var(--vh-spacer) * .5);
    block-size: var(--_block-size);
    @include vh-card($hover: true);
    @each $__scale, $__properties in $_scales {
        &-scale-#{$__scale} {
            @include vh-map-to-properties($__properties)
        }
    }
    &:has(select:disabled) {
        cursor: not-allowed;
        opacity: .75;
        border-color: transparent
    }
    &:has(select:focus-visible) {
        border-color: var(--vh-clr-primary);
        box-shadow: 0 0 0 1px var(--vh-clr-primary)
    }
    &:has(input:user-invalid) {
        border-color: var(--vh-clr-danger);
        box-shadow: 0 0 0 1px var(--vh-clr-danger)
    }
    select {
        @include vh-reset-select;
        flex: 1;
        inline-size: 100%;
        block-size: 100%;
        padding-inline-start: var(--_padding-inline);
        padding-inline-end: calc(var(--_padding-inline) + var(--_icon-size) + var(--_padding-inline));
        &:focus-visible {
            @include vh-clear-focus-appearance
        }
    }
    .svg-icon {
        --size: var(--_icon-size);
        position: absolute;
        pointer-events: none;
        inset-block: auto;
        inset-inline-end: var(--_padding-inline)
    }
}
</style>
