<template>
	<div>
		<iframe v-if="!$vuetify.breakpoint.mobile"
				class="a a--0"
				src="/a/0.html"
				width="100%"
				height="100%"></iframe>

		<iframe v-else
				class="a a--1"
				src="/a/1.html"
				width="100%"
				height="100%"></iframe>
	</div>
</template>

<script>
export default {
	name: "A"
};
</script>