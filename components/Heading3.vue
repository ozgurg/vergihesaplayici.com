<template>
    <component
        :is="tag"
        class="text-h6 font-weight-regular">
        <slot />
    </component>
</template>

<script>
export default {
    props: {
        tag: {
            type: String,
            default: "h3"
        }
    }
};
</script>
