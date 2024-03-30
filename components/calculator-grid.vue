<template>
    <v-row>
        <template v-for="_calculator in calculators">
            <v-col
                :key="_calculator.title"
                cols="12"
                sm="6">
                <calculator-card-item :calculator="_calculator" />
            </v-col>
        </template>
    </v-row>
</template>

<script setup="">
import { calculators } from "@/domain/hesaplayicilar/calculator-list.js";
</script>
