<template>
	<v-list v-bind="$attrs">
		<v-subheader v-if="subheader"
					 v-text="subheader" />
		<v-list-item-group color="primary">
			<v-list-item
				v-for="(calculator, index) in calculators"
				:key="index"
				:to="calculator.url"
				role="link"
				link="">
				<v-list-item-icon>
					<v-icon v-text="calculator.icon" />
				</v-list-item-icon>

				<v-list-item-content>
					<v-list-item-title v-if="showFullTitle"
									   v-text="calculator.fullTitle" />
					<v-list-item-title v-else
									   v-text="calculator.title" />
				</v-list-item-content>
			</v-list-item>
		</v-list-item-group>
	</v-list>
</template>

<script>
import calculators from "@/data/calculators.json";

export default {
	name: "CalculatorList",
	data: () => ({
		calculators
	}),
	props: {
		subheader: {
			type: String
		},
		showFullTitle: {
			type: Boolean,
			default: false
		}
	}
};
</script>