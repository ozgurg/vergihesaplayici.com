<template>
    <v-list
        v-bind="$attrs"
        role="list">
        <v-subheader v-if="subheader">{{ subheader }}</v-subheader>

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
                <template v-if="calculator.initialsTitle">
                    <v-list-item-title>{{ calculator.initialsTitle }}</v-list-item-title>
                    <v-list-item-subtitle>{{ calculator.subtitle }}</v-list-item-subtitle>
                </template>

                <template v-else>
                    <v-list-item-title>{{ calculator.subtitle }}</v-list-item-title>
                </template>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script>
import calculators from "@/data/calculators.js";

export default {
    data: () => ({
        calculators
    }),
    props: {
        subheader: {
            type: String
        }
    }
};
</script>
