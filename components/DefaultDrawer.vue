<template>
	<v-navigation-drawer
		v-bind="$attrs"
		v-model="drawerState">
		<template v-slot:prepend>
			<DefaultLogo />
		</template>

		<CalculatorList shaped=""
						show-short-title=""
						subheader="Hesaplayıcılar"
						class="mb-auto"/>

		<AppsFromDeveloperList shaped="" aria-label="Geliştiriciden Uygulamalar" />

		<DefaultFooter />
	</v-navigation-drawer>
</template>

<script>
import { sync } from "vuex-pathify";

export default {
	name: "DefaultDrawer",
	computed: {
		drawerState: sync("ui/drawerState")
	}
};
</script>