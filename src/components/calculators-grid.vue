<template>
    <div class="calculators-grid">
        <template v-for="_calculatorPage in calculatorPages" :key="_calculatorPage.url">
            <calculator-card-item
                :title="_calculatorPage.title"
                :description="_calculatorPage.summary"
                :url="_calculatorPage.url"
                :icon="_calculatorPage.icon" />
        </template>
    </div>
</template>

<script lang="ts" setup>
import { CalculatorPages as calculatorPages } from "@/domains/hesaplayicilar/db.js";
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
