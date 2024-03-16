<template>
    <div class="mb-12">
        <component
            :is="tag"
            class="vh-heading-1 text-h4 text-lg-h3 mb-4 font-weight-bold text-center text-md-start">
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

<style lang="scss" scoped="">
.vh-heading-1 {
    text-wrap: balance
}
</style>
