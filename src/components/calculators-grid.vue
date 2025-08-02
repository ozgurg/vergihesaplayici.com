<template>
    <div class="calculators-grid">
        <template v-for="_calculatorPage in CALCULATOR_PAGES" :key="_calculatorPage.url">
            <calculator-card-item
                :title="_calculatorPage.title"
                :description="_calculatorPage.summary"
                :url="_calculatorPage.url"
                :icon="_calculatorPage.icon" />
        </template>
    </div>
</template>

<script lang="ts" setup>
import { getCalculatorPages } from "@/domains/hesaplayicilar/db.js";

const CALCULATOR_PAGES = getCalculatorPages();
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
