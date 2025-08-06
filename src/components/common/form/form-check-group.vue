<template>
    <div
        :aria-labelledby="ARIA_LABELLEDBY"
        :style="{'--anchor-name': ANCHOR_NAME}"
        :class="CLASSES"
        role="radiogroup">
        <template v-if="props.items && props.type">
            <template v-for="_item in props.items" :key="_item.input.value">
                <form-check
                    v-bind="_item.input"
                    v-model="modelValue"
                    :value="_item.input.value"
                    :name="NAME"
                    :required="props.required"
                    :scale="props.scale"
                    :type="props.type">
                    <template v-if="_item.icon">
                        <svg-icon :icon="_item.icon" />
                    </template>
                    <b>{{ _item.title }}</b>
                    <template v-if="_item.description">
                        <small>{{ _item.description }}</small>
                    </template>
                </form-check>
            </template>
        </template>
        <template v-else>
            <slot name="default" />
        </template>
    </div>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_div, HtmlAttrs_input } from "@/types/html.js";
import type { Props as FormCheckProps } from "@/components/common/form/form-check.vue";

export type Item = {
    title: string;
    description?: string;
    icon?: string;

    // I omit some properties to prevent duplicate definition
    input: Omit<Partial<HtmlAttrs_input>, "type" | "required" | "name">
}

export type Props = {
    items?: Item[];
    type?: FormCheckProps["type"];
    scale?: FormCheckProps["scale"];

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

const ANCHOR_NAME = `--form-check-group-checked-indicator-${useId()}`;
const ARIA_LABELLEDBY = attrs["aria-labelledby"] || formGroupId;
const CLASSES = [
    "form-check-group",
    `form-check-group-scale-${props.scale}`,
    props.type ? `form-check-group-type-${props.type}` : undefined
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

.form-check-group {
    --_anchor-name: var(--anchor-name, --form-check-group-checked-indicator);
    display: grid;
    grid-template-columns: 1fr;
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
    // To enable using it with `<transition-group />`
    & > :deep(div:only-child) {
        display: contents
    }
    &:has(input:user-invalid) {
        border-radius: var(--vh-br-normal);
        box-shadow: 0 0 0 1px var(--vh-clr-danger)
    }
    &-type-radio {
        // Since the checked indicator depends on the anchor name,
        // I manage the checked state styling of its child `<form-check-group-item />` here
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
}
</style>
