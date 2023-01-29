<template>
    <div
        v-bind="$attrs"
        class="vh-radio-grid"
        role="radiogroup">
        <template v-for="_item in items">
            <v-card
                :key="_item.title"
                :class="{'vh-radio-grid__item--active primary--text primary': isItemActive(_item)}"
                role="radio"
                :aria-checked="isItemActive(_item) ? 'true' : 'false'"
                outlined=""
                class="vh-radio-grid__item d-flex flex-column py-6 px-4"
                @click="emit(_item.value)">
                <div class="text-subtitle-1 font-weight-medium mb-auto">
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
        </template>
    </div>
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
    --vh-radio-grid-optimal-width: 144px;
    display: grid;
    grid-gap: .75rem;
    grid-template-columns: repeat(auto-fill, minmax(var(--vh-radio-grid-optimal-width), 1fr));
    grid-auto-rows: 1fr;

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
