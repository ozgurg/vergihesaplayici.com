<template>
    <v-list
        v-bind="$attrs"
        role="list">
        <v-subheader>
            Hesaplayıcılar
        </v-subheader>

        <v-list-item
            v-for="(calculator, index) in calculators"
            :key="index"
            :to="calculator.url"
            role="listitem"
            link="">
            <v-list-item-icon>
                <v-icon>{{ calculator.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>{{ calculator.subtitle }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script>
import * as calculators from "@/data/calculators.js";

export default {
    data: () => ({
        calculators
    })
};
</script>
