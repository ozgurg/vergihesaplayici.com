<template>
	<div>
		<Hero :title="$route.meta.title"
			  :description="$route.meta.desc" />

		<div class="columns is-centered">
			<div v-for="(route, index) in $store.getters.getRoutes.hesaplayicilar"
				 :key="index"
				 class="column is-4-desktop is-12-mobile has-text-centered">
				<router-link :to="route.path"
							 class="box">
					<b-icon :icon="route.meta.icon"
							size="is-large" />

					<h2 class="subtitle has-text-primary">{{route.meta.title}}</h2>

					<div class="content is-small">
						<p class="has-text-grey">{{route.meta.desc}}</p>
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Index",
	metaInfo() {
		const vm = this;

		return {
			title: vm.$route.meta.title,
			meta: [
				{ name: "description", content: vm.$route.meta.desc },
				{ property: "og:title", content: vm.$route.meta.title },
				{ property: "og:description", content: vm.$route.meta.desc },
				{ property: "og:type", content: "website" }
			]
		};
	}
};
</script>