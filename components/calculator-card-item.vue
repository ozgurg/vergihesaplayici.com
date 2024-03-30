<template>
    <v-card
        :to="props.calculator.url"
        outlined=""
        class="px-4 py-6 px-lg-6 py-lg-8">
        <div class="icon d-inline-block pa-4 rounded-circle mb-4">
            <v-icon
                color="primary"
                size="40">
                {{ props.calculator.icon }}
            </v-icon>
        </div>

        <v-card-title class="pa-0 mb-4">
            {{ props.calculator.title }}
        </v-card-title>

        <!-- eslint-disable vue/no-v-text-v-html-on-component vue/no-v-html -->
        <v-card-subtitle
            class="pa-0"
            v-html="props.calculator.summary" />

        <v-icon
            color="white"
            class="bg-icon"
            size="128">
            {{ props.calculator.icon }}
        </v-icon>
    </v-card>
</template>

<script setup="">
const props = defineProps({
    calculator: {
        type: Object,
        required: true
    }
});
</script>

<style lang="scss" scoped="">
.v-card {
    position: relative;
    .icon {
        background: rgba($vh-color-primary, $vh-card-hover-opacity)
    }
    .bg-icon {
        position: absolute;
        inset-inline-end: 0;
        inset-block-end: 0;
        transform: translate(30%, -10%) rotate(-15deg);
        opacity: .04
    }
}
</style>
