<template>
    <div :class="CLASSES">
        <input
            v-bind="$attrs"
            v-model="modelValue"
            :aria-labelledby="ARIA_LABELLEDBY" />
    </div>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_input } from "@/types/html.js";

type Scale = "small" | "medium" | "large";

export type Props = {
    scale?: Scale;
} & /* @vue-ignore */ Partial<HtmlAttrs_input>;

defineOptions({ inheritAttrs: false });
const props = withDefaults(defineProps<Props>(), {
    scale: "large"
});
const attrs = useAttrs() as Props;
const modelValue = defineModel<string | number>();
const formGroupId = inject("form-group.id", null);

const ARIA_LABELLEDBY = attrs["aria-labelledby"] || formGroupId;

const CLASSES = [
    "form-control",
    `form-control-scale-${props.scale}`
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

.form-control {
    @include vh-card($hover: true);
    --_padding-inline: var(--padding-inline);
    --_block-size: var(--block-size);
    --_border-radius: var(--border-radius);
    transition: vh-transition(background-color box-shadow border-color, var(--vh-duration-short));
    block-size: var(--_block-size);
    @each $__scale, $__properties in $_scales {
        &-scale-#{$__scale} {
            @include vh-map-to-properties($__properties)
        }
    }
    &:has(input:disabled) {
        opacity: 1; // https://github.com/twbs/bootstrap/blob/a5d430d526dcb330b3e0f12aa1321cf948d726f1/scss/forms/_form-control.scss#L90
        border-color: transparent
    }
    &:has(input:focus-visible) {
        border-color: var(--vh-clr-primary);
        box-shadow: 0 0 0 1px var(--vh-clr-primary)
    }
    &:has(input:user-invalid) {
        border-color: var(--vh-clr-danger);
        box-shadow: 0 0 0 1px var(--vh-clr-danger)
    }
    input {
        @include vh-reset-input;
        inline-size: 100%;
        block-size: 100%;
        padding-inline: var(--_padding-inline);
        &[type="number"],
        &[inputmode="numeric"] {
            font-weight: var(--vh-fw-bold);
            @include vh-text-number
        }
        @include vh-placeholder {
            font-weight: var(--vh-fw-light);
            font-family: var(--vh-ff-primary);
            opacity: 1; // https://github.com/twbs/bootstrap/blob/a5d430d526dcb330b3e0f12aa1321cf948d726f1/scss/forms/_form-control.scss#L77
            color: hsla(var(--vh-clr-white-hsl), .5)
        }
        &:focus-visible {
            @include vh-clear-focus-appearance
        }
    }
}
</style>
