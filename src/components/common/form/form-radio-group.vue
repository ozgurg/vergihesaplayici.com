<template>
    <div
        :aria-labelledby="ARIA_LABELLEDBY"
        :style="{'--anchor-name': ANCHOR_NAME}"
        :class="CLASSES"
        role="radiogroup">
        <template v-for="_item in props.items" :key="_item.input.value">
            <form-radio-group-item
                v-bind="_item.input"
                :name="NAME"
                :required="props.required"
                :scale="props.scale">
                <b>{{ _item.title }}</b>
                <template v-if="_item.description">
                    <small>{{ _item.description }}</small>
                </template>
            </form-radio-group-item>
        </template>
    </div>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_div, HtmlAttrs_input } from "@/types/html.js";
import type { Props as FormRadioGroupItemProps } from "@/components/common/form/form-radio-group-item.vue";

export type Item = {
    // Since this is a "radio group",
    // I omit some properties to prevent duplicate definition
    input: Omit<Partial<HtmlAttrs_input>, "type" | "required" | "name">;
    title: string;
    description?: string;
}

export type Props = {
    items: Item[];
    scale?: FormRadioGroupItemProps["scale"];

    // These two belong to the input;
    // I moved them to the props to prevent duplicate definition
    required?: HtmlAttrs_input["required"];
    name?: HtmlAttrs_input["name"];
} & /* @vue-ignore */ Partial<HtmlAttrs_div>;

const props = withDefaults(defineProps<Props>(), {
    scale: "large"
});
const attrs = useAttrs() as Props;
const modelValue = defineModel<Item["input"]["value"]>();
const formGroupId = inject("form-group.id", null);

provide("form-radio-group.modelValue", modelValue);

const ANCHOR_NAME = `--form-radio-group-checked-indicator-${useId()}`;
const ARIA_LABELLEDBY = attrs["aria-labelledby"] || formGroupId;
const CLASSES = [
    "form-radio-group",
    `form-radio-group-scale-${props.scale}`
];

// A `name` is required for multiple radios to work properly;
// Setting a default with `withDefaults` does not work when the value contains `useId()`
const NAME = props["name"] || `UNUSED-PLACEHOLDER-NAME-${useId()}`;
</script>

<style lang="scss" scoped>
$_scales: (
    "small": (
        border-radius: var(--vh-br-small)
    ),
    "medium": (
        border-radius: var(--vh-br-small)
    ),
    "large": (
        border-radius: var(--vh-br-normal)
    )
);

@mixin checked-state-before {
    position: absolute;
    z-index: 0;
    content: "";
    box-shadow: 0 0 0 1px var(--vh-clr-primary);
    border-color: var(--vh-clr-primary);
    background: hsla(var(--vh-clr-primary-hsl), .04)
}

.form-radio-group {
    --_anchor-name: var(--anchor-name, --form-radio-group-checked-indicator);
    display: grid;
    grid-auto-rows: 1fr;
    gap: calc(var(--vh-spacer) * .5);
    @each $__scale, $__properties in $_scales {
        &-scale-#{$__scale} {
            @supports (anchor-name: var(--_anchor-name)) {
                &::before {
                    @include vh-map-to-properties($__properties)
                }
            }
            @supports (not(anchor-name: var(--_anchor-name))) {
                & > * {
                    &::before {
                        @include vh-map-to-properties($__properties)
                    }
                }
            }
        }
    }
    &:has(input:user-invalid) {
        border-radius: var(--vh-br-normal);
        box-shadow: 0 0 0 1px var(--vh-clr-danger)
    }
    &:has(> *:nth-child(1)) {
        grid-template-columns: repeat(auto-fill, minmax(144px, 1fr))
    }
    &:has(> *:nth-child(2)) {
        grid-template-columns: repeat(2, 1fr)
    }
    &:has(> *:nth-child(3)) {
        grid-template-columns: repeat(auto-fill, minmax(144px, 1fr))
    }
    &:has(> *:nth-child(4)) {
        grid-template-columns: repeat(2, 1fr);
        @include vh-media-breakpoint-up(md) {
            grid-template-columns: repeat(4, 1fr)
        }
    }

    // Since the checked indicator depends on the anchor name,
    // I manage the checked state styling of its child `<form-radio-group-item />` here
    @supports (anchor-name: var(--_anchor-name)) {
        & > *:has(input:checked) {
            anchor-name: var(--_anchor-name)
        }
        &::before {
            @include checked-state-before;
            transform: scale(0);
            opacity: 0;
            transition: vh-transition(inset-inline inset-block inline-size block-size transform opacity, var(--vh-duration-long));
            inset-inline: anchor(var(--_anchor-name) start) anchor(var(--_anchor-name) end);
            inset-block: anchor(var(--_anchor-name) top) anchor(var(--_anchor-name) bottom);
            inline-size: anchor-size(var(--_anchor-name) inline);
            block-size: anchor-size(var(--_anchor-name) block)
        }
        &:has(input:checked)::before {
            opacity: 1;
            transform: scale(1)
        }
    }
    @supports (not(anchor-name: var(--_anchor-name))) {
        & > * {
            &::before {
                @include checked-state-before;
                opacity: 0;
                transition: vh-transition(opacity, var(--vh-duration-short));
                inset: 0;
                inline-size: 100%;
                block-size: 100%
            }
            &:has(input:checked)::before {
                opacity: 1
            }
        }
    }
}
</style>
