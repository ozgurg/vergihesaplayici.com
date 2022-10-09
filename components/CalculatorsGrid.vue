<template>
    <v-row
        v-bind="$attrs"
        dense="">
        <!-- TODO: Replace "index" with something sensible -->
        <v-col
            v-for="(_calculator, index) in calculators"
            :key="index"
            cols="12"
            md="6">
            <CalculatorCard
                :url="_calculator.url"
                :icon="_calculator.icon"
                :title="_calculator.title"
                :description="_calculator.description" />
        </v-col>
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
