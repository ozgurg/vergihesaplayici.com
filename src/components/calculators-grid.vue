<template>
    <div class="calculators-grid">
        <template v-for="_calculatorPage in props.items" :key="_calculatorPage.url">
            <calculator-card-item
                :title="_calculatorPage.title"
                :title-tag="props.titleTag"
                :description="_calculatorPage.summary"
                :url="_calculatorPage.url"
                :icon="_calculatorPage.icon" />
        </template>
    </div>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_div } from "@/types/html.js";
import type { Props as CalculatorCardProps } from "@/components/calculator-card-item.vue";
import type { CalculatorPage } from "@/types/page-def.js";

export type Props = {
    titleTag: CalculatorCardProps["titleTag"]
    items: CalculatorPage[];
} & /* @vue-ignore */ Partial<HtmlAttrs_div>;

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
.calculators-grid {
    display: grid;
    gap: var(--vh-spacer);
    grid-template-columns: 1fr;
    @include vh-media-breakpoint-up(md) {
        grid-template-columns: 1fr 1fr
    }
}
</style>
