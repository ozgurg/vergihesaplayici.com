<template>
    <form-control
        v-bind="props"
        v-model="displayValue"
        @keydown="preventDisallowedKeyInput($event)"
        inputmode="numeric"
        type="text" />
</template>

<script lang="ts" setup>
import type { Props as FormControlProps } from "@/components/common/form/form-control.vue";

const DEFAULT_LOCALE = "tr-TR";

const ALLOWED_KEYS = new Set<KeyboardEvent["key"]>([
    "Backspace",
    "Enter",
    "ArrowLeft",
    "ArrowRight",
    "Delete",
    "Tab",
    ",", // Comma
    "." // Dot
]);

export type Props = {
    locale?: Intl.LocalesArgument;
} & Omit<FormControlProps, "inputmode" | "type">;

const props = withDefaults(defineProps<Props>(), { locale: DEFAULT_LOCALE });
const modelValue = defineModel<number>();

const priceFormatter = new Intl.NumberFormat(props.locale);

const displayValue = computed<string>({
    get(): string {
        return modelValue.value ?
            priceFormatter.format(modelValue.value) :
            "";
    },
    set(value: string): void {
        modelValue.value = Number.parseFloat(
            value.replaceAll(".", "") // Dot
                .replace(",", ".") // Comma
        );
    }
});

const preventDisallowedKeyInput = (event: KeyboardEvent): void => {
    const isCtrlOrMetaKey = event.ctrlKey || event.metaKey;
    const isKeyAllowed = ALLOWED_KEYS.has(event.key);
    const isNumeric = /\d/.test(event.key);

    if (!isCtrlOrMetaKey && !isKeyAllowed && !isNumeric) {
        event.preventDefault();
    }
};
</script>
