<template>
	<div id="wrapper">
		<b-loading v-if="$store.getters.isLoading"
				   active="" />

		<Header />

		<main id="main">
			<section class="section">
				<div class="container">
					<router-view />
				</div>
			</section>
		</main>

		<Footer />
	</div>
</template>

<script>
import Header from "./Common/components/Header";
import Footer from "./Common/components/Footer";


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