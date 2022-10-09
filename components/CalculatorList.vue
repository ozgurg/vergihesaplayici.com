<template>
    <v-list
        v-bind="$attrs"
        :subheader="hasTitle">
        <template v-if="hasTitle">
            <v-subheader>
                {{ title }}
            </v-subheader>
        </template>

        <!-- TODO: Replace "index" with something sensible -->
        <template v-for="(_calculator, index) in calculators">
            <CalculatorListItem
                :key="index"
                :url="_calculator.url"
                :icon="_calculator.icon"
                :title="_calculator.subtitle" />
        </template>
    </v-list>
</template>

<script>
import * as calculators from "@/data/calculators.js";

export default {
    data: () => ({
        calculators
    }),
    props: {
        title: {
            type: String,
            default: null
        }
    },
    computed: {
        hasTitle() {
            const vm = this;
            return vm.title !== null;
        }
    }
};
</script>
