<template>
    <div
        :class="`vh-radio-grid--${items.length}`"
        class="vh-radio-grid"
        role="radiogroup">
        <template v-for="_item in items">
            <v-card
                :key="_item.title"
                :aria-checked="isItemActive(_item) ? 'true' : 'false'"
                role="radio"
                outlined=""
                class="vh-radio-grid__item px-4 py-6"
                @click="emit(_item.value)">
                <v-card-title class="text-subtitle-1 font-weight-bold pa-0">
                    {{ _item.title }}
                </v-card-title>

                <v-card-text
                    class="vh-radio-grid__item__desc pa-0">
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
@import "~vuetify/src/styles/styles.sass";

$vh-radio-grid-optimal-width: 144px;

// I chose to set it individually for each item count
// to give more control over the user experience
// on different screen resolutions and different item counts.
.vh-radio-grid {
    display: grid;
    grid-template-columns: var(--vh-radio-grid-columns);
    grid-gap: .75rem;
    grid-auto-rows: 1fr;
    &--1 {
        --vh-radio-grid-columns: repeat(auto-fill, minmax(#{$vh-radio-grid-optimal-width}, 1fr))
    }
    &--2 {
        --vh-radio-grid-columns: repeat(2, 1fr)
    }
    &--3 {
        --vh-radio-grid-columns: repeat(2, 1fr);
        @media #{map-get($display-breakpoints, "sm-and-up")} {
            --vh-radio-grid-columns: repeat(auto-fill, minmax(#{$vh-radio-grid-optimal-width}, 1fr))
        }
    }
    &--4 {
        --vh-radio-grid-columns: repeat(2, 1fr);
        @media #{map-get($display-breakpoints, "sm-and-up")} {
            --vh-radio-grid-columns: repeat(4, 1fr)
        }
    }
    &__item {
        $item: &;
        background: 0 !important;
        &[aria-checked="true"] {
            border-color: $vh-color-primary;
            background-color: $vh-color-primary;
            color: $vh-color-primary;
            &::before {
                opacity: $vh-card-hover-opacity
            }
            #{$item}__desc {
                color: rgba($vh-color-primary, .75)
            }
        }
    }
}
</style>
