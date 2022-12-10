<template>
    <v-row
        class="vh-radio-grid ma-n1"
        role="radiogroup"
        no-gutters="">
        <template v-for="_item in items">
            <v-col
                :key="_item.title"
                v-bind="$attrs"
                class="pa-1">
                <v-card
                    :class="{'vh-radio-grid__item--active primary--text primary': isItemActive(_item)}"
                    role="radio"
                    :aria-checked="isItemActive(_item) ? 'true' : 'false'"
                    outlined=""
                    class="vh-radio-grid__item d-flex flex-column pa-4"
                    @click="emit(_item.value)">
                    <div class="text-subtitle-1 font-weight-medium">
                        {{ _item.title }}
                    </div>

                    <template v-if="_item.description">
                        <div class="text-caption opacity-75">
                            {{ _item.description }}
                        </div>
                    </template>
                    <template v-else-if="_item.price">
                        <div class="text-caption opacity-75 tabular-nums">
                            {{ _item.price }}
                        </div>
                    </template>
                </v-card>
            </v-col>
        </template>
    </v-row>
</template>

<script>
export default {
    props: {
        value: {
            type: [String, Object],
            default: null
        },
        items: {
            type: Array,
            required: true
        }
    },
    methods: {
        isItemActive(item) {
            const vm = this;
            return item.value === vm.value;
        },
        emit(value) {
            const vm = this;
            vm.$emit("input", value);
        }
    }
};
</script>

<style lang="scss" scoped="">
.vh-radio-grid {
    &__item {
        overflow: hidden;
        height: 100%;
        background: 0 !important;

        &--active, &:hover {
            &::before {
                opacity: .08
            }
        }
    }
}

.opacity-75 {
    opacity: .75
}
</style>
