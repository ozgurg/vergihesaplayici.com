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

        <v-col
            cols="12"
            sm="6">
            <v-card
                outlined=""
                class="d-flex align-center justify-center pa-8">
                <AdsterraBanner320x50 :order="4" />
            </v-card>
        </v-col>
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
