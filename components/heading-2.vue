<template>
    <component
        :is="props.tag"
        class="heading-2 text-h5 font-weight-bold mb-6">
        <template v-if="props.to">
            <nuxt-link
                :to="props.to"
                class="text-decoration-none">
                <slot v-if="$slots.default" />
            </nuxt-link>
        </template>
        <template v-else>
            <slot v-if="$slots.default" />
        </template>
    </component>
</template>

<script setup="">
const props = defineProps({
    to: {
        type: String,
        default: null
    },
    tag: {
        type: String,
        default: "h2"
    }
});
</script>

<style lang="scss" scoped="">
@import "~vuetify/src/styles/settings/_variables.scss";

.heading-2 {
    position: relative;
    padding-inline-start: 1.125rem;
    color: #fff;
    a {
        color: inherit;
        @include vh-real-hover {
            transition: color $secondary-transition;
            &:hover {
                color: $vh-color-primary
            }
        }
    }
    &::before {
        position: absolute;
        inset-inline-start: 0;
        inset-block: 0;
        height: 100%;
        width: .375rem;
        border-radius: .5rem;
        background: $vh-color-primary;
        pointer-events: none;
        content: ""
    }
}
</style>
