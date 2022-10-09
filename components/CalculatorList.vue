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
            <v-list-item
                :key="index"
                :to="_calculator.url">
                <v-list-item-icon>
                    <v-icon>{{ _calculator.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ _calculator.subtitle }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
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
