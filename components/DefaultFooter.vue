<template>
	<v-footer v-bind="$attrs"
			  class="d-flex justify-center text-center pa-2"
			  padless="">
		<div class="caption mb-3">vergihesaplayici.com,
			<a href="https://github.com/ozgurg" rel="nofollow noopener noreferrer" target="_blank">@ozgurg</a>
			tarafından açık
			kaynaklı olarak geliştirilmektedir
		</div>
		<Ghbtns />
	</v-footer>
</template>

<script>
export default {
	name: "DefaultFooter"
};
</script>