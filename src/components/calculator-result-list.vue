<template>
    <transition-group
        name="list-transition"
        tag="dl"
        aria-label="Hesaplama sonuçları"
        class="calculator-result-list">
        <template v-for="_item in props.items" :key="_item.key">
            <calculator-result-list-item
                :label="_item.label"
                :value="_item.value"
                :variant="KEY_VARIANT_MAP[_item.key]" />
        </template>
    </transition-group>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_dl } from "@/types/html.js";
import type { Props as CalculatorResultListItemProps } from "@/components/calculator-result-list-item.vue";

export type Item = CalculatorResultListItemProps & {
    key: string;
};

export type Props = {
    items: Item[];
} & /* @vue-ignore */ Partial<HtmlAttrs_dl>;

const props = defineProps<Props>();

const KEY_VARIANT_MAP: { [key: Item["key"]]: CalculatorResultListItemProps["variant"] } = {
    taxFree: "tax-free-price",
    total: "total-tax",
    taxAdded: "tax-added-price"
};
</script>

<style lang="scss" scoped>
.calculator-result-list {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: calc(var(--vh-spacer) * .5)
}

.list-transition {
    &-leave-active {
        display: none
    }
    &-move,
    &-enter-active {
        transition: vh-transition(transform, var(--vh-duration-longer), var(--vh-timing-spring)), vh-transition(color, var(--vh-duration-longest))
    }
    &-enter-from {
        // Setting the `color` to `transparent` instead of
        // setting the `opacity` to `0` prevents flashes in the border and background
        color: transparent
    }
    &-leave-active {
        position: absolute;
        inline-size: 100%
    }
}
</style>
