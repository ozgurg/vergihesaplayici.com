<template>
    <v-card
        :to="calculator.url"
        outlined=""
        class="vh-calculator-card-item px-4 py-6 px-lg-6 py-lg-8">
        <div class="vh-calculator-card-item__icon d-inline-block pa-4 rounded-circle mb-4">
            <v-icon
                color="primary"
                size="40">
                {{ calculator.icon }}
            </v-icon>
        </div>

        <v-card-title class="pa-0 mb-4">
            {{ calculator.title }}
        </v-card-title>

        <!-- eslint-disable vue/no-v-text-v-html-on-component vue/no-v-html -->
        <v-card-text
            class="pa-0"
            v-html="calculator.summary" />

        <v-icon
            color="white"
            class="vh-calculator-card-item__bg-icon"
            size="128">
            {{ calculator.icon }}
        </v-icon>
    </v-card>
</template>

<script>
export default {
    props: {
        calculator: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped="">
.vh-calculator-card-item {
    position: relative;
    &__icon {
        background: rgba($vh-color-primary, .08)
    }
    &__bg-icon {
        position: absolute !important;
        inset-inline-end: 0;
        inset-block-end: 0;
        transform: translate(30%, -10%) rotate(-15deg);
        opacity: .04
    }
}
</style>
