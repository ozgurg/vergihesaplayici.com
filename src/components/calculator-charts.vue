<template>
    <div class="calculator-charts">
        <div class="inner">
            <template v-for="_chart in props.charts">
                <div class="item">
                    <heading-3
                        tag="h3"
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
    .inner {
        display: flex;
        flex-flow: row;
        flex-wrap: nowrap;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        gap: var(--container-padding-inline)
    }
    .item {
        @include vh-squircle(var(--vh-br-normal));
        padding: var(--vh-spacer);
        background: hsla(var(--vh-clr-white-hsl), .04);
        flex: 1;
        min-width: 162px;
        :deep(.heading-3) {
            justify-content: center
        }
    }
}
</style>
