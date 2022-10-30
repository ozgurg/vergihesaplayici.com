<template>
    <v-list
        v-bind="$attrs"
        :subheader="hasSubheader">
        <template v-if="hasSubheader">
            <v-subheader>
                {{ subheader }}
            </v-subheader>
        </template>

        <template v-for="_calculator in calculators">
            <CalculatorListItem
                :key="_calculator.title"
                :url="_calculator.url"
                :icon="_calculator.icon"
                :title="_calculator.shortTitle" />
        </template>
    </v-list>
</template>

<script>
import { calculators } from "@/plugins/page.js";

export default {
    data: () => ({
        calculators
    }),
    props: {
        subheader: {
            type: String,
            default: null
        }
    },
    computed: {
        hasSubheader() {
            const vm = this;
            return vm.subheader !== null;
        }
    }
};
</script>
