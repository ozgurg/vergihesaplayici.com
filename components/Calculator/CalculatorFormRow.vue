<template>
    <div
        v-bind="$attrs"
        class="form-row">
        <div class="form-row__label">
            <label v-if="label">{{ label }}</label>
        </div>

        <div class="form-row__content">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: null
        }
    }
};
</script>

<style lang="scss">
.form-row {
	@media(min-width: 992px) {
		display: flex;
		align-items: center;
		flex-direction: row
	}
	&__label {
		padding-bottom: 4px;
		@media(min-width: 992px) {
			padding-bottom: 0;
			flex: 0 0 200px;
			max-width: 200px;
			display: flex;
			padding-right: 12px
		}
        label {
            width: 100%;
            display: block;
            text-align: left
        }
	}
	&__content {
		@media(min-width: 992px) {
			display: flex;
			width: 100%;
			flex-grow: 1;
			max-width: 100%
		}
	}
}
</style>

<style scoped="">
/deep/ .v-input__append-outer {
    margin-top: 0 !important
}
</style>
