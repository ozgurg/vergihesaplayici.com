<template>
	<v-row v-bind="$attrs"
		   dense="">
		<v-col v-for="(calculator, index) in calculators"
			   :key="index"
			   cols="12"
			   md="6">
			<v-card :to="calculator.url"
					link=""
					class="pa-8">
				<v-icon class="primary--text"
						size="64"
						v-text="calculator.icon" />

				<h3 class="text-h6 mt-4 mb-2 text--primary">{{ calculator.title }}</h3>

				<p class="text-subtitle-2 mb-0 text--secondary">
					{{ calculator.description }}
				</p>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import calculators from "@/data/calculators.js";

export default {
    name: "CalculatorGrid",
    data: () => ({
        calculators
    })
};
</script>
