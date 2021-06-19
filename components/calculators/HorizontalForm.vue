<template>
    <div
        v-bind="$attrs"
        class="horizontal-form">
        <div class="horizontal-form__label-cell">
            <label
                v-if="label"
                class="horizontal-form__label">
                {{ label }}
            </label>
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

<style lang="scss">
.horizontal-form {
	@media(min-width: 992px) {
		display: flex;
		align-items: center;
		flex-direction: row
	}
	&__label-cell {
		padding-bottom: 4px;
		@media(min-width: 992px) {
			padding-bottom: 0;
			flex: 0 0 200px;
			max-width: 200px;
			display: flex;
			padding-right: 12px
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
		@media(min-width: 992px) {
			text-align: right
		}
	}
}
</style>
