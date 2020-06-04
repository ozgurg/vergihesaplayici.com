<template>
	<div class="hero-body has-text-centered">
		<div class="container">
			<h1 class="title has-text-primary">{{title}}</h1>

			<h2 v-if="description"
				class="subtitle has-text-grey-light">{{description}}</h2>
		</div>
	</div>
</template>

<script>
export default {
	name: "Hero",
	props: {
		title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		}
	}
};
</script>