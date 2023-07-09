<template>
    <div class="mb-12">
        <component
            :is="tag"
            class="vh-heading-1 text-h4 text-lg-h3 mb-4 font-weight-bold">
            <slot />
        </component>

        <v-divider />
    </div>
</template>

<script>
export default {
    props: {
        tag: {
            type: String,
            default: "h1"
        }
    }
};
</script>

<style scoped="">
.vh-heading-1 {
    text-wrap: balance
}
</style>
