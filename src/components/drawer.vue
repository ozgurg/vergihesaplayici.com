<template>
    <dialog
        :id="props.id"
        class="drawer">
        <container>
            <template v-for="_calculatorPage in calculatorPages" :key="_calculatorPage.url">
                <calculator-card-item
                    :title="_calculatorPage.title"
                    :description="_calculatorPage.summary"
                    :url="_calculatorPage.url"
                    :icon="_calculatorPage.icon" />
            </template>
        </container>
    </dialog>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_dialog } from "@/types/html.js";
import { CalculatorPages as calculatorPages } from "@/domains/hesaplayicilar/db.js";

export type Props = {
    id: string;
} & /* @vue-ignore */ Partial<HtmlAttrs_dialog>;

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
.drawer {
    position: fixed;
    z-index: calc(var(--header-zindex) - 1);
    inset-inline: 0;
    inset-block-end: 0;
    inline-size: 100%;
    block-size: 100dvh;
    background: var(--vh-clr-body-bg);
    @include vh-media-breakpoint-up(md) {
        display: none
    }
    .container {
        --_gap: calc(var(--vh-spacer) * .5);
        --_ideal-item-count: 2.75;
        --_padding-block: var(--vh-spacer);
        display: flex;
        overflow-x: hidden;
        overflow-y: auto;
        flex-flow: column nowrap;
        box-sizing: border-box;
        block-size: 100%;
        gap: var(--_gap);
        scrollbar-width: thin;
        padding-block-start: calc(var(--header-down-md-block-size) + (var(--_padding-block)));
        padding-block-end: max(env(safe-area-inset-bottom), var(--_padding-block))
    }
    .calculator-card-item {
        flex-shrink: 0;
        block-size: calc((100% - (var(--_gap) * (var(--_ideal-item-count) - 1))) / var(--_ideal-item-count));
        padding-block: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center
    }
}
</style>
