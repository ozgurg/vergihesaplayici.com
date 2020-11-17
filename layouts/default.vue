<template>
	<v-app>
		<DefaultDrawer app="" />

		<DefaultAppBar app="" />

		<v-main>
			<div :class="{'mx-auto': isCenteredContent}"
				 class="main-content">
				<ExchangeRates />

				<v-divider class="my-6" />

				<Nuxt />
			</div>
		</v-main>

		<v-snackbar v-show="snackbar.isVisible"
					v-model="snackbar.isVisible"
					:timeout="snackbar.timeout">
			{{ snackbar.text }}
		</v-snackbar>

		<span class="version">v{{ version }}</span>
	</v-app>
</template>

<script>
import { sync } from "vuex-pathify";
import { version } from "./../package.json";

export default {
	name: "DefaultLayout",
	data: () => ({
		version
	}),
	computed: {
		...sync("ui", [
			"isCenteredContent",
			"snackbar"
		])
	}
};
</script>