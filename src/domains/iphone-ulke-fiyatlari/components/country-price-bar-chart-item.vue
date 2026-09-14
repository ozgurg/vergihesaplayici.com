<template>
    <div
        :style="{ '--value': `${props.item.barPercentage}%` }"
        :class="`country-price-bar-chart-item-country-${props.item.country.code}`"
        class="country-price-bar-chart-item">
        <a
            :href="props.item.storeUrl.href"
            :title="`${props.item.country.name} Apple Store`"
            target="_blank"
            rel="nofollow noopener noreferrer"
            class="country">
            <span class="country-flag">{{ props.item.country.flag }}</span>
            <span class="country-name">{{ props.item.country.name }}</span>
            <svg-icon
                :icon="icon_externalLink"
                aria-hidden="true"
                class="country-link-icon" />
        </a>
        <div class="bar"></div>
        <div class="price text-number">
            <string-carousel :text="formatMoney(props.item.priceUSD, 'USD', {minimumFractionDigits: 0})" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { CountryComparisonItem } from "@/domains/iphone-ulke-fiyatlari/types.js";
import { formatMoney } from "@/utils/formatter.js";
import { icon_externalLink } from "@/utils/icons.js";

export type Props = {
    item: CountryComparisonItem;
};

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
.country-price-bar-chart-item {
    --_value: var(--value, 0%);
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: calc(var(--vh-spacer) * .25);
    padding-block: calc(var(--vh-spacer) * .625);
    padding-inline: var(--container-padding-inline);
    @include vh-media-breakpoint-up(sm) {
        padding-inline: var(--vh-spacer)
    }
    &-country-tr {
        position: sticky;
        z-index: 2;
        background: #{vh-calculate-overlay-color($clr-body-bg, rgba($clr-primary, .12))};
        inset-block-start: calc(var(--app-header-down-md-block-size) + (var(--vh-spacer) * .875));
        @include vh-media-breakpoint-up(sm) {
            inset-block-start: calc(var(--app-header-up-md-collapsed-block-size) - var(--vh-border-inline-size));
            margin-inline: calc(var(--vh-spacer) * -1); // Self `padding-inline`
            padding-inline: calc(var(--vh-spacer) * 2) // `.calculator-box-right` `padding-inline`
        }
    }
    &-country-us {
        background: #{vh-calculate-overlay-color($clr-body-bg, rgba(#fff, .04))};
        @include vh-media-breakpoint-up(sm) {
            @include vh-squircle(var(--vh-br-normal))
        }
    }
    .country {
        display: flex;
        align-items: center;
        gap: calc(var(--vh-spacer) * .375);
        padding: calc(var(--vh-spacer) * .5);
        margin: calc((var(--vh-spacer) * .5) * -1);
        flex: 0 1 10rem;
        min-inline-size: 0;
        white-space: nowrap;
        text-decoration: none;
        color: inherit;
        @include vh-hover {
            &:hover {
                .country-name {
                    color: var(--vh-clr-primary);
                    text-decoration: underline
                }
                .svg-icon {
                    opacity: 1
                }
            }
        }
        &-flag {
            font-size: var(--vh-fs-md);
            line-height: 1;
            transform: translateY(1px) translateX(-3px)
        }
        &-name {
            font-size: var(--vh-fs-sm);
            font-weight: var(--vh-fw-medium);
            @include vh-ellipsis
        }
        .svg-icon {
            --size: var(--vh-spacer);
            opacity: 0
        }
    }
    .bar {
        position: relative;
        flex: 1;
        min-width: 96px;
        block-size: calc(var(--vh-spacer) * .375);
        background: hsla(var(--vh-clr-white-hsl), .08);
        border-radius: var(--vh-br-pill);
        overflow: hidden;
        &::after {
            position: absolute;
            inset-block: 0;
            inset-inline-start: 0;
            background: var(--vh-clr-primary);
            inline-size: var(--_value);
            block-size: 100%;
            border-radius: 0 var(--vh-br-pill) var(--vh-br-pill) 0;
            transition: vh-transition(inline-size, var(--vh-duration-longer));
            content: ""
        }
    }
    .price {
        flex-shrink: 0;
        inline-size: 5rem;
        text-align: end;
        font-size: var(--vh-fs-sm);
        font-weight: var(--vh-fw-medium)
    }
}
</style>
