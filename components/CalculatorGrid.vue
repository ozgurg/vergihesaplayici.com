<template>
    <v-row
        v-bind="$attrs"
        dense="">
        <v-col
            v-for="(calculator, index) in calculators"
            :key="index"
            cols="12"
            md="6">
            <v-card
                :to="calculator.url"
                link=""
                outlined=""
                class="pa-8 d-flex flex-column justify-space-between h-100">
                <v-icon
                    class="primary--text"
                    size="64">
                    {{ calculator.icon }}
                </v-icon>

                <h2 class="text-h6 mt-4 mb-2 text--primary h-100">
                    {{ calculator.title }}
                </h2>

                <p class="text-subtitle-2 mb-0 text--secondary">
                    {{ calculator.description }}
                </p>
            </v-card>
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
