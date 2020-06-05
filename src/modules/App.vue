<template>
	<main>
		<b-loading v-if="$store.getters.isLoading"
				   active="" />

		<Header />

		<section class="section">
			<div class="container">
				<router-view />
			</div>
		</section>

		<Footer />
	</main>
</template>

<script>
import Header from "./Common/Header";
import Footer from "./Common/Footer";


export default {
	name: "App",
	components: {
		Header,
		Footer
	},
	created() {
		const vm = this;

		vm.$store.dispatch("setRoutes", {
			hesaplayicilar: vm.$router.options.routes.filter(route => {
				return route.path.startsWith("/hesaplayicilar");
			})
		});
	}
};
</script>

<style lang="scss">
	@import "../assets/scss/style";
</style>