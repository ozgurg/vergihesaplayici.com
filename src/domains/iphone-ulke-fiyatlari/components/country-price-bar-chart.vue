<template>
    <transition-group
        name="list-transition"
        tag="div"
        class="country-price-bar-chart">
        <template v-for="_item in displayedTopItems" :key="_item.country.code">
            <country-price-bar-chart-item :item="_item" />
        </template>

        <template v-if="canToggle && !isExpanded">
            <div key="toggle" class="toggle">
                <form-button
                    @click="isExpanded = true"
                    color="light"
                    scale="small"
                    variant="plain"
                    type="button">
                    <svg-icon :icon="icon_chevronUpDown" />
                    <span>Tümünü göster</span>
                </form-button>
            </div>
        </template>

        <template v-if="canToggle && isExpanded">
            <template v-for="_item in middleItems" :key="_item.country.code">
                <country-price-bar-chart-item :item="_item" />
            </template>
        </template>

        <template v-if="canToggle">
            <template v-for="_item in bottomItems" :key="_item.country.code">
                <country-price-bar-chart-item :item="_item" />
            </template>
        </template>
    </transition-group>
</template>

<script lang="ts" setup>
import type { CountryComparisonItem } from "@/domains/iphone-ulke-fiyatlari/types.js";
import CountryPriceBarChartItem from "@/domains/iphone-ulke-fiyatlari/components/country-price-bar-chart-item.vue";
import { icon_chevronUpDown } from "@/utils/icons.js";

const SHOW_COUNT = 7;

export type Props = {
    items: CountryComparisonItem[];
};

const props = defineProps<Props>();

const isExpanded = ref(false);

const canToggle = computed(() => props.items.length > SHOW_COUNT * 2);

const displayedTopItems = computed(() => {
    if (!canToggle.value) {
        return props.items;
    }
    return props.items.slice(0, SHOW_COUNT);
});

const middleItems = computed(() => {
    if (!canToggle.value) {
        return [];
    }
    return props.items.slice(SHOW_COUNT, -SHOW_COUNT);
});

const bottomItems = computed(() => {
    if (!canToggle.value) {
        return [];
    }
    return props.items.slice(-SHOW_COUNT);
});
</script>

<style lang="scss" scoped>
.country-price-bar-chart {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-block-end: calc((var(--vh-spacer) * .75) * -1);
    margin-inline: calc(var(--container-padding-inline) * -1);
    @include vh-media-breakpoint-up(sm) {
        margin-inline: calc(var(--vh-spacer) * -1)
    }
    .toggle {
        display: flex;
        align-items: center;
        gap: var(--vh-spacer);
        &::before,
        &::after {
            content: "";
            display: inline-block;
            block-size: var(--vh-border-inline-size);
            flex: 1;
            background: hsla(var(--vh-clr-white-hsl), var(--vh-clr-border-alpha))
        }
    }
}

.list-transition {
    &-leave-active {
        display: none
    }
    &-move,
    &-enter-active {
        transition: vh-transition(transform, var(--vh-duration-longer), var(--vh-timing-spring)), vh-transition(opacity, var(--vh-duration-longest));
    }
    &-enter-from {
        opacity: 0
    }
}
</style>
