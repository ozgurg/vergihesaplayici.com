<template>
    <v-row>
        <template v-for="_calculator in calculators">
            <CalculatorGridItem
                :key="_calculator.title"
                :url="_calculator.url"
                :icon="_calculator.icon"
                :title="_calculator.title"
                :summary="_calculator.summary" />
        </template>
    </v-row>
</template>

<script>
import { calculators } from "@/plugins/page.js";

export default {
    data: () => ({
        calculators
    })
};
</script>
