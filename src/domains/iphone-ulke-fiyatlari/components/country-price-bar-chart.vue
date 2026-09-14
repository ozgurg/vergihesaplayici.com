<template>
    <transition-group
        name="list-transition"
        tag="div"
        class="country-price-bar-chart">
        <template v-for="_processed in displayedTopItems" :key="_processed.item.country.code">
            <country-price-bar-chart-item
                :item="_processed.item"
                :price-display="_processed.priceDisplay"
                :currency-display="_processed.currencyDisplay"
                :bar-percentage="_processed.barPercentage" />
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
            <template v-for="_processed in middleItems" :key="_processed.item.country.code">
                <country-price-bar-chart-item
                    :item="_processed.item"
                    :price-display="_processed.priceDisplay"
                    :currency-display="_processed.currencyDisplay"
                    :bar-percentage="_processed.barPercentage" />
            </template>
        </template>

        <template v-if="canToggle">
            <template v-for="_processed in bottomItems" :key="_processed.item.country.code">
                <country-price-bar-chart-item
                    :item="_processed.item"
                    :price-display="_processed.priceDisplay"
                    :currency-display="_processed.currencyDisplay"
                    :bar-percentage="_processed.barPercentage" />
            </template>
        </template>
    </transition-group>
</template>

<script lang="ts" setup>
import type { CountryComparisonItem } from "@/domains/iphone-ulke-fiyatlari/types.js";
import CountryPriceBarChartItem from "@/domains/iphone-ulke-fiyatlari/components/country-price-bar-chart-item.vue";
import { icon_chevronUpDown } from "@/utils/icons.js";

const SHOW_COUNT = 8;

export type CurrencyMode = "USD" | "TRY" | "local";

export type Props = {
    items: CountryComparisonItem[];
    currencyMode: CurrencyMode;
    usdRate: number;
};

const props = defineProps<Props>();

const isExpanded = ref(false);

type ProcessedItem = {
    item: CountryComparisonItem;
    priceDisplay: number;
    currencyDisplay: string;
    barPercentage: number;
};

const processedItems = computed<ProcessedItem[]>(() => {
    if (props.currencyMode === "local") {
        const sorted = props.items.toSorted((a, b) => b.priceUSD - a.priceUSD);
        const maxPriceUSD = Math.max(...props.items.map(_item => _item.priceUSD), 1);
        return sorted.map(_item => ({
            item: _item,
            priceDisplay: _item.priceLocal,
            currencyDisplay: _item.currencyLocal,
            barPercentage: maxPriceUSD > 0
                ? Math.max(8, Math.round((_item.priceUSD / maxPriceUSD) * 100))
                : 100
        }));
    }

    if (props.currencyMode === "TRY") {
        const withPrices = props.items
            .map(_item => {
                const priceDisplay = _item.country.code === "tr"
                    ? _item.priceLocal
                    : Math.round(_item.priceUSD * props.usdRate);
                return {
                    item: _item,
                    priceDisplay,
                    currencyDisplay: "TRY",
                    barPercentage: 0
                };
            })
            .toSorted((a, b) => b.priceDisplay - a.priceDisplay);

        const maxPrice = withPrices[0]?.priceDisplay || 1;
        for (const _entry of withPrices) {
            _entry.barPercentage = maxPrice > 0
                ? Math.max(8, Math.round((_entry.priceDisplay / maxPrice) * 100))
                : 100;
        }

        return withPrices;
    }

    // Default: USD
    const withPrices = props.items
        .map(_item => ({
            item: _item,
            priceDisplay: _item.priceUSD,
            currencyDisplay: "USD",
            barPercentage: 0
        }))
        .toSorted((a, b) => b.priceDisplay - a.priceDisplay);

    const maxPrice = withPrices[0]?.priceDisplay || 1;
    for (const _entry of withPrices) {
        _entry.barPercentage = maxPrice > 0
            ? Math.max(8, Math.round((_entry.priceDisplay / maxPrice) * 100))
            : 100;
    }

    return withPrices;
});

const canToggle = computed(() => processedItems.value.length > SHOW_COUNT * 2);

const displayedTopItems = computed(() => {
    if (!canToggle.value) {
        return processedItems.value;
    }
    return processedItems.value.slice(0, SHOW_COUNT);
});

const middleItems = computed(() => {
    if (!canToggle.value) {
        return [];
    }
    return processedItems.value.slice(SHOW_COUNT, -SHOW_COUNT);
});

const bottomItems = computed(() => {
    if (!canToggle.value) {
        return [];
    }
    return processedItems.value.slice(-SHOW_COUNT);
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
