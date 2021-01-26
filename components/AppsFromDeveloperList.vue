<template>
	<v-list v-bind="$attrs"
			role="list">
		<v-list-item
			v-for="(app, index) in apps"
			:key="index"
			:href="app.url"
			dense=""
			link=""
			role="listitem"
			rel="nofollow noopener noreferrer"
			target="_blank">
			<v-list-item-icon>
				<img :alt="app.title"
					 :src="getIcon(app.icon)"
					 draggable="false"
					 height="24"
					 width="24" />
			</v-list-item-icon>

			<v-list-item-content>
				<v-list-item-title v-text="app.title" />
			</v-list-item-content>
		</v-list-item>
	</v-list>
</template>

<script>
import apps from "@/data/apps.json";

export default {
	name: "AppsFromDeveloperList",
	data: () => ({
		apps
	}),
	props: {
		subheader: {
			type: String
		}
	},
	methods: {
		getIcon(path) {
			return require(`@/assets/img/apps/${path}`);
		}
	}
};
</script>