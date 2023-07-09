<template>
    <h2 class="vh-heading-2 text-h5 font-weight-bold mb-6">
        <template v-if="to">
            <nuxt-link
                :to="to"
                class="text-decoration-none white--text">
                <slot />
            </nuxt-link>
        </template>
        <template v-else>
            <slot />
        </template>
    </h2>
</template>

<script>
export default {
    props: {
        to: {
            type: String,
            default: null
        }
    }
};
</script>

<style lang="scss">
.vh-heading-2 {
    position: relative;
    padding-inline-start: 1.125rem;

    &::before {
        position: absolute;
        inset-inline-start: 0;
        inset-block: 0;
        height: 100%;
        width: .375rem;
        border-radius: .5rem;
        background: #88DF95;
        pointer-events: none;
        content: ""
    }
}
</style>
