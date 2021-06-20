<template>
    <div
        v-bind="$attrs">
        <CalculatorHorizontalForm class="result-tab mb-4">
            <v-tabs
                :value="value"
                @change="emit($event)"
                background-color="transparent"
                fixed-tabs="">
                <v-tab :disabled="!showResults">
                    <v-icon left="">mdi-format-list-bulleted-type</v-icon>
                    Sonuçlar
                </v-tab>
                <v-tab>
                    <v-icon left="">mdi-comment-multiple-outline</v-icon>
                    Yorumlar
                </v-tab>
            </v-tabs>
        </CalculatorHorizontalForm>

		<v-tabs-items :value="value">
            <v-tab-item :transition="false">
                <slot />
            </v-tab-item>

            <v-tab-item :transition="false">
                <CalculatorComments />
            </v-tab-item>
        </v-tabs-items>
	</div>
</template>

<script>
export default {
    name: "CalculatorResultTabs",
    props: {
        value: {
            type: Number,
            required: true
        },
        showResults: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        emit(value) {
            const vm = this;
            vm.$emit("input", value);
        }
    }
};
</script>

<style lang="scss" scoped="">
.result-tab {
	position: sticky;
	background: #121212;
	z-index: 5;
	top: 56px;
	@media(min-width: 960px) {
		top: 64px
	}
}
</style>
