<template>
	<div>
		<h2 v-text="errorDescription"
			class="mb-4" />
		<v-card class="d-flex align-center pa-10"
				outlined="">
			<v-img :src="notFound404"
				   alt="Vergi Hesaplayıcı Logo"
				   draggable="false"
				   height="auto"
				   width="400" />
		</v-card>
	</div>
</template>

<script>
import notFound404 from "@/assets/img/not-found-404.svg";

export default {
	layout: "default/index",
	name: "NotFound404",
	data: () => ({
		notFound404
	}),
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
			title: vm.title
		};
	},
	mounted() {
		const vm = this;
		vm.$store.set("ui/toolbarTitle", vm.title);
	}
};
</script>