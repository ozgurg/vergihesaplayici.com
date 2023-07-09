<template>
    <div
        v-bind="$attrs"
        class="vh-radio-grid"
        role="radiogroup">
        <template v-for="_item in items">
            <v-card
                :key="_item.title"
                :class="{'vh-radio-grid__item--active primary--text primary': isItemActive(_item)}"
                :aria-checked="isItemActive(_item) ? 'true' : 'false'"
                role="radio"
                outlined=""
                class="vh-radio-grid__item px-4 py-6"
                @click="emit(_item.value)">
                <v-card-title class="text-subtitle-1 pa-0">
                    {{ _item.title }}
                </v-card-title>

                <v-card-text
                    :class="{'primary--text opacity-75': isItemActive(_item)}"
                    class="pa-0">
                    <template v-if="_item.description">
                        {{ _item.description }}
                    </template>
                    <template v-else-if="_item.price">
                        <span class="tabular-nums">{{ _item.price }}</span>
                    </template>
                </v-card-text>
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

        &--active::before {
            opacity: $vh-card-hover-opacity
        }
    }
}
</style>
