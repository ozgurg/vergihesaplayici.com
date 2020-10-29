<template>
	<v-footer v-bind="$attrs"
			  padless="">
		<v-row align="center"
			   justify="center">
			<v-col class="text-center"
				   cols="12">
				<p>vergihesaplayici.com,
					<a href="https://github.com/ozgurg" rel="nofollow" target="_blank">@ozgurg</a> tarafından açık
					kaynaklı olarak geliştirilmektedir.</p>
				<Ghbtns />
			</v-col>
		</v-row>
	</v-footer>
</template>

<script>
export default {
	name: "DefaultFooter"
};
</script>