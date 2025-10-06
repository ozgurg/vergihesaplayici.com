<template>
    <div class="pie-chart">
        <div class="chart">
            <svg
                :aria-label="props.title"
                viewBox="0 0 200 200">
                <template v-for="(_item, _index) in chartData" :key="_index">
                    <path
                        :data-index="_index"
                        :d="_item.pathData"
                        :style="hslColorToCssVariables(_item.color.hsl)"
                        role="button"
                        tabindex="0"
                        :aria-label="`Vergi detayını görüntüle: ${_item.label} (${_item.percentage}%)`"
                        @click="handlePathClick(_item)"
                        @keydown.space.enter.prevent.stop="handlePathClick(_item)"
                        @mouseenter="handlePathHoverStart(_item, $event)"
                        @mouseleave="handlePathHoverEnd"
                        @mousemove="handleMouseMove" />
                </template>
            </svg>
        </div>

        <div
            aria-hidden="true"
            class="legend">
            <template v-for="(_item, _index) in chartData" :key="_item.label">
                <div
                    :data-index="_index"
                    :style="hslColorToCssVariables(_item.color.hsl)"
                    class="legend__item">
                    {{ _item.label }} ({{ _item.percentage }}%)
                </div>
            </template>
        </div>
    </div>

    <template v-if="activeChartDataItem !== null">
        <div
            class="tooltip"
            :aria-hidden="tooltip.isVisible ? 'false' : 'true'"
            :inert="tooltip.isVisible ? false : undefined"
            :style="{
                    ...hslColorToCssVariables(tooltip.color.hsl),
                    '--x': `${tooltip.position.x}px`,
                    '--y': `${tooltip.position.y}px`
                }">
            <transition name="fade-transition" mode="out-in">
                <div :key="activeChartDataItem.label">
                    <div class="item-detail">
                        <b>{{ activeChartDataItem.label }}</b>
                        Vergi miktarı: <span
                        class="text-number">{{ formatMoney(activeChartDataItem.value, "TRY") }}</span>
                        <br />
                        Toplam vergi içindeki payı: <span
                        class="text-number">{{ activeChartDataItem.percentage }}%</span>
                    </div>
                </div>
            </transition>
        </div>

        <modal v-model="isDetailModalOpened">
            <modal-header>
                <div>
                    <modal-title>{{ activeChartDataItem.label }}</modal-title>
                    <modal-close-button @click="closeDetailModal()" />
                </div>
            </modal-header>
            <modal-body>
                <div class="item-detail">
                    Vergi miktarı: <span
                    class="text-number">{{ formatMoney(activeChartDataItem.value, "TRY") }}</span>
                    <hr />
                    Toplam vergi içindeki payı: <span
                    class="text-number">{{ activeChartDataItem.percentage }}%</span>
                </div>
            </modal-body>
        </modal>
    </template>
</template>

<script lang="ts" setup>
import type { HSLColor } from "@/types/common.js";
import { formatMoney } from "@/utils/formatter.js";

// I added a minimum angle calculation to make small
// percentages appear larger to improve the pointer's target area
const MIN_ANGLE = 16;

export type ChartItem = {
    value: number;
    label: string;
};

type Vector2 = {
    x: number;
    y: number;
};

type Tooltip = {
    isVisible: boolean,
    position: Vector2;
    color: { hsl: HSLColor }
}

type ChartDataItem = ChartItem & {
    percentage: number;
    pathData: string;
    color: { hsl: HSLColor };
};

export type Props = {
    title: string;
    items: ChartItem[];
};

const props = defineProps<Props>();

const activeChartDataItem = ref<ChartDataItem | null>(null);
const tooltip = ref<Tooltip>({
    isVisible: false,
    position: { x: 0, y: 0 },
    color: {
        hsl: { h: 0, s: 0, l: 0 }
    }
});
const isDetailModalOpened = ref<boolean>(false);

const total = computed<number>(() => props.items.reduce((sum, item) => sum + item.value, 0));

const chartData = computed<ChartDataItem[]>(() => {
    let currentAngle = 0;
    const centerX = 100;
    const centerY = 100;
    const radius = 98;

    const rawAngles = props.items.map(item => (item.value / total.value) * 360);
    const adjustedAngles = rawAngles.map(angle => Math.max(angle, MIN_ANGLE));

    const totalAdjusted = adjustedAngles.reduce((sum, a) => sum + a, 0);
    const scale = 360 / totalAdjusted;

    return props.items.map((item, i) => {
        // oxlint-disable-next-line no-non-null-assertion
        const angle = adjustedAngles[i]! * scale;
        const startAngle = currentAngle;
        const endAngle = currentAngle + angle;
        const pathData = _createArcPath({ centerX, centerY, radius, startAngle, endAngle });
        const percentage = Number((item.value / total.value * 100).toFixed(2));

        currentAngle = endAngle;

        return {
            value: item.value,
            label: item.label,
            color: { hsl: stringToHSL(item.label) },
            percentage,
            pathData
        };
    });
});

const _polarToCartesian = ({ centerX, centerY, radius, angleInDegrees }: {
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
}): Vector2 => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
};

const _createArcPath = ({ centerX, centerY, radius, startAngle, endAngle }: {
        centerX: number,
        centerY: number,
        radius: number,
        startAngle: number,
        endAngle: number
    }
): string => {
    const start = _polarToCartesian({ centerX, centerY, radius, angleInDegrees: endAngle });
    const end = _polarToCartesian({ centerX, centerY, radius, angleInDegrees: startAngle });
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
        "M", centerX, centerY,
        "L", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        "Z"
    ].join(" ");
};

const hslColorToCssVariables = (hsl: HSLColor) => ({
    "--color-h": `${hsl.h}deg`,
    "--color-s": `${hsl.s}%`,
    "--color-l": `${hsl.l}%`
});

const handlePathHoverStart = (item: ChartDataItem, event: MouseEvent) => {
    activeChartDataItem.value = item;
    tooltip.value = {
        isVisible: true,
        position: { x: event.clientX, y: event.clientY },
        color: item.color
    };
};

const handlePathHoverEnd = (): void => {
    tooltip.value.isVisible = false;
};

const handleMouseMove = (event: MouseEvent): void => {
    if (tooltip.value.isVisible) {
        tooltip.value.position = { x: event.clientX, y: event.clientY };
    }
};

const handlePathClick = (item: ChartDataItem): void => {
    activeChartDataItem.value = item;
    isDetailModalOpened.value = true;
};

const closeDetailModal = (): void => {
    isDetailModalOpened.value = false;
};
</script>

<style lang="scss" scoped>
// Hover interactions are handled entirely in CSS.
// Each chart slice and legend item pair has a dedicated selector.
// A predefined maximum number of chart items is required.
$_MAX_CHART_ITEM_COUNT: 10;

@mixin legend-item-highlight-state {
    --bg-alpha: .20;
    --border-hsl: var(--color-hsl);
    --border-alpha: .75
}

.pie-chart {
    text-align: center;
    @for $i from 0 through $_MAX_CHART_ITEM_COUNT {
        @include vh-hover {
            &:has(.chart svg path[data-index="#{$i}"]:hover) {
                .legend__item {
                    &[data-index="#{$i}"] {
                        @include legend-item-highlight-state
                    }
                    &:not([data-index="#{$i}"]) {
                        filter: grayscale(1)
                    }
                }
            }
            &:has(.legend__item[data-index="#{$i}"]:hover) {
                .chart svg path:not([data-index="#{$i}"]) {
                    filter: grayscale(1)
                }
            }
        }
    }
}

.chart {
    position: relative;
    aspect-ratio: 1/1;
    max-inline-size: 11.5rem;
    display: inline-block;
    vertical-align: middle;
    &:has(path:focus-visible) {
        @include vh-focus-appearance;
        path:not(:focus-visible) {
            filter: grayscale(1)
        }
    }
    &:has(path:hover) path {
        filter: grayscale(0) !important
    }
    svg {
        position: relative;
        z-index: 1;
        block-size: 100%;
        inline-size: 100%;
        path {
            --_color-h: var(--color-h, var(--vh-clr-primary-h));
            --_color-s: 60%; /* var(--color-s) */
            --_color-l: var(--color-l);
            --_color-hsl: var(--_color-h), var(--_color-s), var(--_color-l);
            cursor: pointer;
            fill: hsl(var(--_color-hsl));
            stroke: var(--vh-clr-white);
            stroke-width: 1;
            stroke-linejoin: round;
            @include vh-hover {
                transition: vh-transition(opacity fill filter, var(--vh-duration-short));
                &:hover {
                    opacity: .75
                }
                &:active {
                    opacity: .5
                }
            }
            &:focus-visible:not(:hover) {
                filter: grayscale(0);
                @include vh-clear-focus-appearance
            }
        }
    }
    &::after {
        position: absolute;
        z-index: 2;
        inset: 0;
        block-size: 100%;
        inline-size: 100%;
        content: "";
        border: 2px solid var(--vh-clr-white);
        background: radial-gradient(transparent, rgba(#fff, .375));
        pointer-events: none;
        border-radius: 100%
    }
}

.legend {
    margin-block-start: var(--vh-spacer);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: calc(var(--vh-spacer) * .375);
    &__item {
        @include vh-card($hover: true);
        --color-hsl: var(--_color-hsl);
        --border-hsl: var(--_color-h), 100%, 96%;
        --border-alpha: .12;
        --border-radius: var(--vh-br-small);

        --_border-width: calc(var(--vh-spacer) * .25);
        --_color-h: var(--color-h);
        --_color-s: var(--color-s);
        --_color-l: var(--color-l);
        --_color-hsl: var(--_color-h), var(--_color-s), var(--_color-l);
        color: hsl(var(--_color-h), 100%, 98%);

        // There's a browser rounding issue when
        // using very small stop sizes in a `linear-gradient`.
        // It looks as if the gradient continues from the opposite side.
        // To fix this, I control the gradient's size using `background-size`.
        // So why not just use `border-inline-start` instead?
        // Because the `vh-card` applies a `border-radius`,
        // and if I use `border-inline-start`, that border also
        // becomes rounded which I don't like.
        background-image: linear-gradient(to right, hsl(var(--color-hsl)) 0, hsl(var(--color-hsl)) 100%);
        background-size: var(--_border-width) 100%;
        background-repeat: no-repeat;

        display: flex;
        align-items: center;
        flex-direction: row;
        text-align: start;
        gap: calc(var(--vh-spacer) * .375);
        padding-block: calc(var(--vh-spacer) * .25);
        padding-inline: calc((var(--vh-spacer) * .375) + var(--_border-width)) calc(var(--vh-spacer) * .375);
        cursor: default;
        font-size: var(--vh-fs-xs);
        font-weight: var(--vh-fw-semibold);
        @include vh-hover {
            &:hover {
                @include legend-item-highlight-state
            }
        }
    }
}

.tooltip {
    @include vh-media-breakpoint-down(md) {
        display: none
    }
    @include vh-media-breakpoint-up(md) {
        @include vh-card($hover: true);
        --color-hsl: var(--_color-hsl);
        --border-hsl: var(--_color-h), 100%, 96%;
        --border-alpha: .16;

        --_x: var(--x, 0px);
        --_y: var(--y, 0px);
        --_color-h: var(--color-h);
        --_color-s: var(--color-s);
        --_color-l: var(--color-l);
        --_color-hsl: var(--_color-h), var(--_color-s), var(--_color-l);
        position: fixed;
        z-index: 1000;
        color: hsl(var(--_color-h), 100%, 98%);
        background-color: hsl(var(--body-bg-hsl));
        padding: var(--vh-spacer);
        font-size: var(--vh-fs-sm);
        pointer-events: none;
        transform: translateY(-100%) scale(0);
        opacity: 0;
        visibility: hidden;
        @include vh-blur(1rem);
        transform-origin: bottom left;
        inset-inline-start: var(--_x);
        inset-block-start: var(--_y);
        border-bottom-left-radius: 0 !important;
        will-change: inset-inline-start, inset-block-start;
        transition: vh-transition(opacity visibility filter, var(--vh-duration-short)),
        vh-transition(transform, var(--vh-duration-medium), var(--vh-timing-spring));
        &[aria-hidden="false"] {
            transform: translateY(-100%) scale(1);
            opacity: 1;
            visibility: visible;
            @include vh-blur(0)
        }
    }
}

.item-detail {
    b {
        color: hsl(var(--_color-h), 100%, 80%);
        margin-block-end: calc(var(--vh-spacer) * .375);
        display: block;
        font-weight: var(--vh-fw-bold)
    }
    .text-number {
        font-weight: var(--vh-fw-medium)
    }
    hr {
        margin-block: var(--vh-spacer)
    }
}
</style>
