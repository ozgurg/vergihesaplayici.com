<template>
    <div v-bind="$attrs">
        <FormRow class="result-tab mb-4">
            <v-tabs
                @change="emit($event)"
                :value="value"
                background-color="transparent"
                fixed-tabs="">
                <v-tab :disabled="!showResults">
                    <v-icon left="">
                        {{ icons.mdiFormatListBulletedType }}
                    </v-icon>
                    Sonuçlar
                </v-tab>
                <v-tab>
                    <v-icon left="">
                        {{ icons.mdiCommentMultipleOutline }}
                    </v-icon>
                    Yorumlar
                </v-tab>
            </v-tabs>
        </FormRow>

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
import { mdiCommentMultipleOutline, mdiFormatListBulletedType } from "@mdi/js";

export default {
    data: () => ({
        icons: {
            mdiFormatListBulletedType,
            mdiCommentMultipleOutline
        }
    }),
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
	top: 56px; // 56px = toolbar height
	@media(min-width: 960px) {
		top: 0
	}
}
</style>

<style scoped="">
:deep(.v-tabs-items) {
    background: 0 !important
}

:deep(.v-tab.v-tab--disabled), :deep(.v-tab.v-tab--disabled .v-icon) {
    color: #fff !important
}
</style>
