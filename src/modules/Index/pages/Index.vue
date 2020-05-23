<template>
	<div>
		<Hero :title="hero.title"
			  :description="hero.desc" />

		<div class="columns is-mobile is-centered">
			<div v-for="(route, index) in $store.getters.getRoutes.hesaplayicilar"
				 :key="index"
				 class="column is-4-desktop is-full-mobile has-text-centered">
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
import Hero from "../../Common/components/Hero";


export default {
	name: "Index",
	components: {
		Hero
	},
	data() {
		return {
			hero: {
				title: "Vergi Hesaplayıcı",
				desc: ""
			}
		};
	},
	created() {
		const vm = this;

		vm.hero.desc = vm.$route.meta.desc;
	},
	metaInfo() {
		const vm = this;

		return {
			title: vm.$route.meta.title,
			meta: [
				{name: "description", content: vm.$route.meta.desc},
				{property: "og:title", content: vm.$route.meta.title},
				{property: "og:description", content: vm.$route.meta.desc},
				{property: "og:type", content: "website"}
			]
		};
	}
};
</script>

<style lang="scss" scoped="">
	.subtitle {
		margin: .5rem 0
	}
</style>
