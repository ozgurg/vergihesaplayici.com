<template>
	<div v-bind="$attrs"
		 class="horizontal-form">
		<div class="horizontal-form__label-cell">
			<label v-if="label"
				   v-bind="$attrs"
				   v-text="label"
				   class="horizontal-form__label" />
		</div>

		<div class="horizontal-form__content-cell">
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	name: "HorizontalForm",
	props: {
		label: {
			type: String
		}
	}
};
</script>

<style lang="scss" scoped="">
.horizontal-form {
	@media(min-width: 992px) {
		display: flex;
		align-items: center;
		flex-direction: row
	}
	&__label-cell {
		@media(min-width: 992px) {
			flex: 0 0 220px;
			max-width: 220px;
			display: flex;
			padding-right: 16px
		}
	}
	&__content-cell {
		@media(min-width: 992px) {
			display: flex;
			width: 100%;
			flex-grow: 1;
			max-width: 100%
		}
	}
	&__label {
		width: 100%;
		display: block;
		text-align: left;
		margin-bottom: .25rem;
		@media(min-width: 992px) {
			margin-bottom: 0;
			text-align: right
		}
	}
}
</style>