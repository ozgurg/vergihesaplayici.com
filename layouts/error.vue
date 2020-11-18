<template>
	<div>
		<h2 v-text="errorDescription"
			class="mb-4" />

		<v-alert dense=""
				 text=""
				 border="left"
				 type="error">{{error.message}}</v-alert>
	</div>
</template>

<script>
export default {
	layout: "default/index",
	name: "NotFound404",
	props: {
		error: {
			type: Object,
			default: null
		}
	},
	computed: {
		title() {
			const vm = this;

			if (vm.error.statusCode === 404) {
				return "Sayfa Bulunamadı";
			}

			return "Bir Şey Oldu";
		},
		errorDescription() {
			const vm = this;

			if (vm.error.statusCode === 404) {
				return "Böyle bir sayfa yok, çıkar onu aklından";
			}

			return "Bir şey oldu –Microsoft";
		}
	},
	head() {
		const vm = this;
		return {
			title: vm.title,
			meta: [
				{ hid: "title", name: "description", content: vm.title }
			]
		};
	},
	mounted() {
		const vm = this;
		vm.$store.set("ui/toolbarTitle", vm.title);
	}
};
</script>