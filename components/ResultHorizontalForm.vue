<template>
	<HorizontalForm v-bind="$attrs"
					:label="label">
		<v-text-field
			append-icon="mdi-content-copy"
			:value="value"
			@click:append="copy(value)"
			dense=""
			hide-details=""
			outlined=""
			readonly=""
			:aria-label="label" />
	</HorizontalForm>
</template>

<script>
export default {
	name: "ResultHorizontalForm",
	props: {
		label: {
			type: String
		},
		value: {
			type: String
		}
	},
	methods: {
		copy(text) {
			const vm = this;

			vm.$copyText(text);

			vm.$store.set("ui/snackbar@isVisible", true);
			vm.$store.set("ui/snackbar@text", "Panoya kopyalandı.");

			setTimeout(() => {
				vm.$store.set("ui/snackbar@isVisible", false);
			}, vm.$store.get("ui/snackbar@timeout"));
		}
	}
};
</script>