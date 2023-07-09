<template>
    <v-list
        v-bind="$attrs"
        subheader=""
        shaped="">
        <v-subheader>
            Hesaplayıcılar
        </v-subheader>

        <template v-for="_calculator in calculators">
            <CalculatorListItem
                :key="_calculator.title"
                :calculator="_calculator" />
        </template>
    </v-list>
</template>

<script>
import { calculators } from "@/data/calculator-list.js";

export default {
    data: () => ({
        calculators
    })
};
</script>
