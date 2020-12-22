<template>
	<v-navigation-drawer
		v-bind="$attrs"
		v-model="drawerState">
		<template v-slot:prepend>
			<DefaultLogo />
		</template>

		<div class="mb-auto">
			<CalculatorList shaped=""
							subheader="Hesaplayıcılar" />

			<v-divider />

			<SettingsList shaped=""
						  subheader="Ayarlar" />

			<template v-if="$route.name !== 'index'">
				<v-divider />

				<AppsFromDeveloperList shaped=""
									   subheader="Geliştiriciden Uygulamalar" />
			</template>
		</div>

		<DefaultFooter class="mt-8" />
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