<template>
    <div class="calculator-charts">
        <div class="calculator-charts-items">
            <template v-for="_chart in props.charts">
                <div class="calculator-charts-item">
                    <heading-3
                        is="h2"
                        aria-hidden="true">
                        {{ _chart.title }}
                    </heading-3>
                    <calculator-pie-chart
                        v-bind="_chart.props"
                        :title="_chart.title" />
                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Props as CalculatorPieChartProps } from "@/components/calculator-pie-chart.vue";

export type ChartItem = {
    title: string;
    props: Omit<CalculatorPieChartProps, "title">;
};

export type Props = {
    charts: ChartItem[]
};

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
.calculator-charts {
    @include vh-media-breakpoint-down(sm) {
        background: hsla(var(--vh-clr-white-hsl), .04);
        padding-block: var(--vh-spacer);
        padding-inline: var(--container-padding-inline);
        margin-inline: calc(var(--container-padding-inline) * -1)
    }
    @include vh-media-breakpoint-up(sm) {
        background: hsla(var(--vh-clr-white-hsl), .04);
        @include vh-squircle(var(--vh-br-normal));
        padding: var(--vh-spacer)
    }
    &-items {
        display: flex;
        flex-flow: row;
        flex-wrap: nowrap;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        gap: var(--container-padding-inline)
    }
    &-item {
        flex: 1;
        min-width: 162px;
        :deep(.heading-3) {
            justify-content: center
        }
    }
}
</style>
