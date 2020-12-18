<template>
	<div class="text-center">
		<iframe :class="className"
				:src="src"
				width="100%"
				height="100%"></iframe>
	</div>
</template>

<script>
export default {
	name: "A",
	props: {
		index: {
			required: true
		}
	},
	computed: {
		className() {
			return `a-${this.index}`;
		},
		src() {
			return `/a/${this.index}.html`;
		}
	}
};
</script>