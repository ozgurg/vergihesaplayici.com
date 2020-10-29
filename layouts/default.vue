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

		<v-snackbar v-if="snackbar.isVisible"
					v-model="snackbar.isVisible"
					:timeout="snackbar.timeout">
			{{ snackbar.text }}
		</v-snackbar>
	</v-app>
</template>

<script>
import { sync } from "vuex-pathify";

export default {
	name: "DefaultLayout",
	computed: {
		...sync("ui", [
			"isCenteredContent",
			"snackbar"
		])
	}
};
</script>