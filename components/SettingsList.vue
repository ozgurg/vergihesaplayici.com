<template>
	<v-list v-bind="$attrs">
		<v-subheader v-if="subheader"
					 v-text="subheader" />
		<v-list-item @click="toggleDarkTheme()">
			<template>
				<v-list-item-action>
					<v-checkbox v-model="$vuetify.theme.dark"
								hide-details=""
								readonly="" />
				</v-list-item-action>

				<v-list-item-content>
					<v-list-item-title>Koyu tema</v-list-item-title>
				</v-list-item-content>
			</template>
		</v-list-item>

		<v-list-item v-if="$vuetify.breakpoint.smAndUp"
					 @click="toggleCenteredContent()">
			<template>
				<v-list-item-action>
					<v-checkbox :value="isCenteredContent"
								hide-details=""
								readonly="" />
				</v-list-item-action>

				<v-list-item-content>
					<v-list-item-title>İçeriği ortala</v-list-item-title>
				</v-list-item-content>
			</template>
		</v-list-item>
	</v-list>
</template>

<script>
import { sync } from "vuex-pathify";

export default {
	name: "SettingsList",
	data: () => ({
		matchMedia: null,
		matchMediaChangeListener: null
	}),
	props: {
		subheader: {
			type: String
		}
	},
	methods: {
		toggleDarkTheme() {
			const vm = this;

			vm.$vuetify.theme.dark = !vm.$vuetify.theme.dark;
			localStorage.setItem("isDarkThemeEnabled", vm.$vuetify.theme.dark);

			// Remove dark theme listener, because the user made his/her own decision
			if (vm.matchMediaChangeListener !== null) {
				vm.matchMedia.removeEventListener("change", vm.matchMediaChangeListener);
			}
		},
		applyDarkThemeSetting() {
			const vm = this;

			if (localStorage.getItem("isDarkThemeEnabled") === null) {
				vm.matchMedia = window.matchMedia("(prefers-color-scheme: dark)");

				// Apply the system dark theme setting
				vm.$vuetify.theme.dark = vm.matchMedia.matches;

				// Listen the system dark theme setting
				vm.matchMediaChangeListener = event => {
					vm.$vuetify.theme.dark = event.matches;
				};
				vm.matchMedia.addEventListener("change", vm.matchMediaChangeListener);
			} else {
				// Apply the user made his/her own decision
				vm.$vuetify.theme.dark = localStorage.getItem("isDarkThemeEnabled") === "true";
			}
		},
		toggleCenteredContent() {
			const vm = this;

			localStorage.setItem("isCenteredContent", (!vm.isCenteredContent).toString());
			vm.isCenteredContent = !vm.isCenteredContent;
		},
		applyCenterContentSetting() {
			const vm = this;
			vm.isCenteredContent = localStorage.getItem("isCenteredContent") === "true";
		}
	},
	computed: {
		isCenteredContent: sync("ui/isCenteredContent")
	},
	mounted() {
		const vm = this;

		vm.applyDarkThemeSetting();
		vm.applyCenterContentSetting();
	}
};
</script>