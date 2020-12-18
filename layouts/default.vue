<template>
	<v-app>
		<DefaultDrawer app="" />

		<DefaultAppBar app="" />

		<v-main>
			<div :class="{'mx-auto': isCenteredContent}"
				 class="main-content">
				<A v-if="!$vuetify.breakpoint.mobile"
				   index="0" />
				<A v-else
				   index="2" />

				<v-breadcrumbs
					v-if="$store.get('ui/breadcrumbs')"
					:items="$store.get('ui/breadcrumbs')">
					<template v-slot:item="{ item }">
						<v-breadcrumbs-item
							active-class=""
							nuxt=""
							:to="item.to">
							{{ item.text }}
						</v-breadcrumbs-item>
					</template>
				</v-breadcrumbs>

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