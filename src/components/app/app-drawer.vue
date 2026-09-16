<template>
    <dialog
        :id="props.id"
        class="app-drawer">
        <div class="container">
            <template v-for="_calculatorPage in CALCULATOR_PAGES" :key="_calculatorPage.url">
                <calculator-card-item
                    :page="_calculatorPage"
                    title-tag="div" />
            </template>

            <hr />

            <template v-for="_utilityPage in UTILITY_PAGES" :key="_utilityPage.url">
                <utility-card-item
                    :page="_utilityPage"
                    title-tag="div" />
            </template>
        </div>
    </dialog>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_dialog } from "@/types/html.js";
import { getCalculatorPages } from "@/domains/hesaplayicilar/db.js";
import { getUtilityPages } from "@/domains/araclar/db.js";

const CALCULATOR_PAGES = getCalculatorPages();
const UTILITY_PAGES = getUtilityPages();

export type Props = {
    id: string;
} & /* @vue-ignore */ Partial<HtmlAttrs_dialog>;

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
.app-drawer {
    position: fixed;
    z-index: calc(var(--app-header-zindex) - 1);
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
        --_ideal-item-count: 3;
        --_padding-block: var(--vh-spacer);
        display: flex;
        overflow-x: hidden;
        overflow-y: auto;
        flex-flow: column nowrap;
        box-sizing: border-box;
        block-size: 100%;
        gap: var(--_gap);
        scrollbar-width: thin;
        padding-block-start: calc(var(--app-header-down-md-block-size) + (var(--_padding-block)));
        padding-block-end: max(env(safe-area-inset-bottom), var(--_padding-block))
    }
    .calculator-card-item,
    .utility-card-item {
        flex-shrink: 0
    }
    .calculator-card-item {
        block-size: calc((100% - (var(--_gap) * (var(--_ideal-item-count) - 1))) / var(--_ideal-item-count));
        min-block-size: 192px;
        max-block-size: 192px;
        padding-block: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center
    }
}
</style>
