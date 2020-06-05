<template>
	<b-navbar spaced=""
			  shadow=""
			  wrapper-class="container">
		<template slot="brand">
			<b-navbar-item :to="{ path: '/' }"
						   tag="router-link">
				<img alt="Vergi Hesaplayıcı"
					 draggable="false"
					 height="32"
					 src="../../assets/img/logo.svg"
					 width="200" />
			</b-navbar-item>
		</template>

		<template slot="end">
			<b-navbar-dropdown boxed=""
							   hoverable=""
							   label="Hesaplayıcılar"
							   right="">
				<b-navbar-item v-for="(route, index) in $store.getters.getRoutes.hesaplayicilar"
							   :key="index"
							   :to="route.path"
							   tag="router-link">
					{{route.meta.title}}
				</b-navbar-item>
			</b-navbar-dropdown>
		</template>
	</b-navbar>
</template>

<script>
export default {
	name: "Header"
};
</script>