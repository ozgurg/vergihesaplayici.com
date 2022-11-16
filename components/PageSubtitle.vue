<template>
    <h2 class="text-h6">
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
