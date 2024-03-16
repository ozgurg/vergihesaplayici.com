<template>
    <v-list
        subheader=""
        shaped="">
        <v-subheader>
            Hesaplayıcılar
        </v-subheader>

        <template v-for="_calculator in calculators">
            <calculator-list-item
                :key="_calculator.title"
                :calculator="_calculator" />
        </template>
    </v-list>
</template>

<script>
import { calculators } from "@/domain/hesaplayicilar/calculator-list.js";

export default {
    data: () => ({
        calculators
    })
};
</script>
