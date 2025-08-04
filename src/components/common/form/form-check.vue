<template>
    <label
        :for="ID"
        :class="CLASSES">
        <svg-icon
            :icon="checkedIcon"
            class="form-check-icon checked-icon" />
        <svg-icon
            :icon="uncheckedIcon"
            class="form-check-icon unchecked-icon" />
        <input
            v-bind="$attrs"
            :id="ID"
            :type="props.type"
            :value="props.value"
            :checked="isChecked"
            @change="onChange($event)"
            class="form-check-icon" />
        <slot name="default" />
    </label>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_input } from "@/types/html.js";
import { icon_checkboxChecked, icon_checkboxUnchecked, icon_radioChecked, icon_radioUnchecked } from "@/utils/icons.js";

const DEFAULT_UNCHECKED_VALUE = false;

type Scale = "small" | "medium" | "large";

export type Props = {
    type: "radio" | "checkbox";
    value: HtmlAttrs_input["value"];
    uncheckedValue?: HtmlAttrs_input["value"];
    scale?: Scale;
} & /* @vue-ignore */ Omit<HtmlAttrs_input, "type">;

defineOptions({ inheritAttrs: false });
const props = defineProps<Props>();
const modelValue = defineModel<HtmlAttrs_input["value"] | HtmlAttrs_input["value"][]>();

const ID = `form-check-${useId()}`;
const CLASSES = [
    "form-check",
    `form-check-scale-${props.scale}`
];

const checkedIcon = {
    radio: icon_radioChecked,
    checkbox: icon_checkboxChecked
}[props.type];

const uncheckedIcon = {
    radio: icon_radioUnchecked,
    checkbox: icon_checkboxUnchecked
}[props.type];

const isArray = computed<boolean>(() => Array.isArray(modelValue.value));

const isChecked = computed<boolean>(() => {
    if (props.type === "radio") {
        return modelValue.value === props.value;
    }

    return isArray.value
        ? modelValue.value.includes(props.value)
        : modelValue.value === props.value;
});

const onChange = (event: Event): void => {
    const input = event.target as HTMLInputElement;

    if (props.type === "radio") {
        modelValue.value = props.value;
        return;
    }

    // checkbox
    if (isArray.value) {
        const newValue = new Set(modelValue.value);
        if (input.checked) {
            newValue.add(props.value);
        } else {
            newValue.delete(props.value);
        }
        modelValue.value = [...newValue];
    } else {
        modelValue.value = input.checked ? props.value : props.uncheckedValue ?? DEFAULT_UNCHECKED_VALUE;
    }
};
</script>

<style lang="scss" scoped>
$_default-block-size: 3.125rem;

$_scales: (
    "small": (
        --min-block-size: 2.5rem,
        --border-radius: var(--vh-br-small)
    ),
    "medium": (
        --min-block-size: 2.75rem,
        --border-radius: var(--vh-br-small)
    ),
    "large": (
        --min-block-size: #{$_default-block-size},
        --border-radius: var(--vh-br-normal)
    )
);

@mixin icon-hidden-state {
    transform: scale(0);
    opacity: 1
}

@mixin icon-shown-state {
    transform: scale(1);
    opacity: 1
}

// Checked state is managed in `<form-check-group />`
.form-check {
    --_min-block-size: var(--min-block-size);
    --_border-radius: var(--border-radius);
    --_icon-size: calc(var(--vh-spacer) * 1.25);
    --_padding-inline: var(--vh-spacer);
    position: relative;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    min-block-size: var(--_min-block-size);
    padding-block: calc(var(--vh-spacer) * .75);
    padding-inline-start: var(--_padding-inline);
    padding-inline-end: calc(var(--_padding-inline) + var(--_icon-size));
    @include vh-card($hover: true, $active: true);
    cursor: pointer;
    transition: vh-transition(color background-color border-color, var(--vh-duration-short));
    @each $__scale, $__properties in $_scales {
        &-scale-#{$__scale} {
            @include vh-map-to-properties($__properties)
        }
    }
    &:has(input:disabled) {
        cursor: not-allowed;
        opacity: .75;
        border-color: transparent;
        :deep(small) {
            // Avoid over-opacity
            opacity: 1
        }
    }
    &-icon {
        --size: var(--_icon-size);
        position: absolute;
        transition: vh-transition(opacity transform, var(--vh-duration-long), var(--vh-timing-spring));
        inset-inline-end: calc(var(--vh-spacer) * .5);
        inset-block-start: calc(50% - (var(--size) / 2))
    }
    .unchecked-icon {
        @include icon-shown-state;
        opacity: .5
    }
    .checked-icon {
        @include icon-hidden-state;
        opacity: 1
    }
    input {
        // I prefer not to move the input to the outer screen to hide it,
        // because when it's required, the browser's tooltip message points to it, which feels more native
        pointer-events: none;
        opacity: 0;
        block-size: var(--size);
        inline-size: var(--size)
    }
    &:has(input[type="checkbox"]:checked) {
        border-color: var(--vh-clr-primary);
        box-shadow: 0 0 0 var(--vh-border-inline-size) var(--vh-clr-primary)
    }
    &:has(input:checked) {
        color: var(--vh-clr-primary);
        .unchecked-icon {
            @include icon-hidden-state
        }
        .checked-icon {
            @include icon-shown-state
        }
    }
    &:has(input:focus-visible) {
        @include vh-focus-appearance
    }
    &:has(small) {
        padding-block: var(--vh-spacer)
    }
    :deep(b) {
        font-size: var(--vh-fs-base);
        font-weight: var(--vh-fw-bold);
        display: block
    }
    :deep(small) {
        font-size: var(--vh-fs-sm);
        display: block;
        opacity: .75;
        margin-block-start: calc(var(--vh-spacer) * .25)
    }
}
</style>
