<template>
    <v-row>
        <template v-for="_calculator in calculators">
            <v-col
                :key="_calculator.title"
                cols="12"
                sm="6">
                <CalculatorCardItem :calculator="_calculator" />
            </v-col>
        </template>
    </v-row>
</template>

<script>
import { calculators } from "@/data/calculator-list.js";

export default {
    data: () => ({
        calculators
    })
};
</script>
