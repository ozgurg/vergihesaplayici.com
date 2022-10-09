<template>
    <v-row
        v-bind="$attrs"
        dense="">
        <!-- TODO: Replace "index" with something sensible -->
        <template v-for="(_calculator, index) in calculators">
            <CalculatorGridItem
                :key="index"
                :url="_calculator.url"
                :icon="_calculator.icon"
                :title="_calculator.title"
                :description="_calculator.description" />
        </template>
    </v-row>
</template>

<script>
import * as calculators from "@/data/calculators.js";

export default {
    data: () => ({
        calculators
    })
};
</script>
