<template>
    <component
        :is="props.tag"
        class="text-h4 text-lg-h3 font-weight-bold text-center text-md-start">
        <slot v-if="$slots.default" />
        <v-divider class="mb-12 mt-4" />
    </component>
</template>

<script setup="">
const props = defineProps({
    tag: {
        type: String,
        default: "h1"
    }
});
</script>
