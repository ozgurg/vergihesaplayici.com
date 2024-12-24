<template>
    <vh-alert type="info">
        Türkiye'de asgari ücretle ({{ formattedMinimumWage }}) çalışan birisi yemeden içmeden bu ürünü <span
        class="text-h6 font-weight-bold">{{ count }}</span> {{ timeUnit }} maaşıyla satın alabilir.
    </vh-alert>
</template>

<script setup="">
import { computed } from "vue";
import { calculateMinimumWageDayCount, calculateMinimumWageMonthCount } from "@/utils/calculate-minimum-wage-count.js";
import { moneyFormat } from "@/utils/formatter.js";

const { MINIMUM_WAGE } = process.env;

const props = defineProps({
    price: {
        type: Number,
        required: true
    }
});

const minimumWageMonthCount = computed(() => calculateMinimumWageMonthCount(props.price, MINIMUM_WAGE));
const minimumWageDayCount = computed(() => calculateMinimumWageDayCount(props.price, MINIMUM_WAGE));

const formattedMinimumWage = computed(() => moneyFormat(MINIMUM_WAGE, "TRY"));
const count = computed(() => (minimumWageMonthCount.value > 1 ? minimumWageMonthCount.value : minimumWageDayCount.value));
const timeUnit = computed(() => (minimumWageMonthCount.value > 1 ? "aylık" : "günlük"));
</script>
