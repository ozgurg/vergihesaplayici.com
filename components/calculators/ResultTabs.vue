<template>
	<div ref="resultTab">
		<HorizontalForm class="result-tab mb-4">
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
	},
	watch: {
		showResults() {
			const vm = this;

			if (vm.showResults) {
				setTimeout(() => {
					vm.$refs["resultTab"].scrollIntoView(true);
				}, 0);
			}
		}
	}
};
</script>

<style lang="scss" scoped="">
.result-tab {
	position: sticky;
	background: #121212;
	z-index: 100;
	top: 56px;
	@media(min-width: 960px) {
		top: 64px
	}
}
</style>