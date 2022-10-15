<template>
    <v-row>
        <template v-for="_calculator in calculators">
            <CalculatorGridItem
                :key="_calculator.title"
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
