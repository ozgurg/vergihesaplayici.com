<template>
    <label
        :for="ID"
        :class="CLASSES">
        <svg-icon
            :icon="icon_radioChecked"
            class="form-radio-group-item-icon checked-icon" />
        <svg-icon
            :icon="icon_radioUnchecked"
            class="form-radio-group-item-icon unchecked-icon" />
        <input
            v-bind="$attrs"
            v-model="formRadioGroupModelValue"
            :id="ID"
            class="form-radio-group-item-icon"
            type="radio" />
        <slot name="default" />
    </label>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_input } from "@/types/html.js";
import { icon_radioChecked, icon_radioUnchecked } from "@/utils/icons.js";

type Scale = "small" | "medium" | "large";

export type Props = {
    scale?: Scale;
} & /* @vue-ignore */ Omit<HtmlAttrs_input, "type">;

defineOptions({ inheritAttrs: false });
const props = defineProps<Props>();
const formRadioGroupModelValue = inject("form-radio-group.modelValue", ref());

const ID = `form-radio-group-item-${useId()}`;
const CLASSES = [
    "form-radio-group-item",
    `form-radio-group-item-scale-${props.scale}`
];
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

// Checked state is managed in `<form-radio-group />`
.form-radio-group-item {
    --_min-block-size: var(--min-block-size);
    --_border-radius: var(--border-radius);
    position: relative;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    min-block-size: var(--_min-block-size);
    padding-inline-start: var(--vh-spacer);
    padding-inline-end: calc(var(--vh-spacer) + (var(--vh-spacer) * .75));
    @include vh-card($hover: true, $active: true);
    cursor: pointer;
    transition: vh-transition(color background-color, var(--vh-duration-short));
    @each $__scale, $__properties in $_scales {
        &-scale-#{$__scale} {
            @include vh-map-to-properties($__properties)
        }
    }
    &-icon {
        --size: calc(var(--vh-spacer) * 1.25);
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
