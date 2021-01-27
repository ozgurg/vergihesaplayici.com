<template>
	<div>
		<HorizontalForm class="mb-4">
			<v-tabs :value="value"
					@change="$emit('input', $event)"
					background-color="transparent"
					fixed-tabs="">
				<v-tab :disabled="!showResults">
					<v-icon left="">mdi-format-list-bulleted-type</v-icon>
					Sonuçlar
				</v-tab>
				<v-tab>
					<v-icon left="">mdi-comment-multiple-outline</v-icon>
					Yorumlar
				</v-tab>
			</v-tabs>
		</HorizontalForm>

		<v-tabs-items :value="value">
			<v-tab-item>
				<slot />
			</v-tab-item>

			<v-tab-item>
				<Comments />
			</v-tab-item>
		</v-tabs-items>
	</div>
</template>

<script>
export default {
	name: "ResultTabs",
	props: {
		value: {
			type: Number,
			required: true
		},
		showResults: {
			type: Boolean,
			default: false
		}
	}
};
</script>