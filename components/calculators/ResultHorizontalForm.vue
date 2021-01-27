<template>
	<HorizontalForm v-bind="$attrs"
					:label="label">
		<v-text-field
			:append-icon="appendIcon"
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
	data: () => ({
		isCopied: false
	}),
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

			vm.isCopied = true;

			setTimeout(() => {
				vm.isCopied = false;
			}, 1000);

			vm.$copyText(text);
		}
	},
	computed: {
		appendIcon() {
			const vm = this;
			return vm.isCopied ? "mdi-check" : "mdi-content-copy";
		}
	}
};
</script>