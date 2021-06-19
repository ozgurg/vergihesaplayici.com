<template>
	<v-footer v-bind="$attrs"
			  class="d-flex justify-center text-center pa-4"
			  padless="">
		<div class="mb-4">vergihesaplayici.com,
			<a href="https://github.com/ozgurg" rel="nofollow noopener noreferrer" target="_blank">@ozgurg</a>
			tarafından açık
			kaynaklı olarak geliştirilmektedir
		</div>
		<Ghbtns />
	</v-footer>
</template>

<script>
export default {
    name: "Footer"
};
</script>
