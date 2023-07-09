<template>
    <component
        :is="tag"
        class="vh-heading-2 text-h5 font-weight-bold mb-6">
        <template v-if="to">
            <nuxt-link
                :to="to"
                class="text-decoration-none">
                <slot />
            </nuxt-link>
        </template>
        <template v-else>
            <slot />
        </template>
    </component>
</template>

<script>
export default {
    props: {
        to: {
            type: String,
            default: null
        },
        tag: {
            type: String,
            default: "h2"
        }
    }
};
</script>

<style lang="scss">
@import "~vuetify/src/styles/settings/_variables.scss";

.vh-heading-2 {
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
