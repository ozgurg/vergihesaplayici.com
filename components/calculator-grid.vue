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

<script>
import { calculators } from "@/domain/hesaplayicilar/calculator-list.js";

export default {
    data: () => ({
        calculators
    })
};
</script>
