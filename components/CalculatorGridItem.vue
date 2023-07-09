<template>
    <v-col
        class="pa-2"
        cols="12"
        sm="6">
        <v-card
            :to="url"
            outlined=""
            class="vh-calculator-grid-item px-5 py-7 pa-sm-8 d-flex flex-column justify-space-between align-start h-100 overflow-hidden">
            <v-icon
                color="primary"
                class="vh-calculator-grid-item__bg-icon"
                size="128">
                {{ icon }}
            </v-icon>

            <div class="vh-calculator-grid-item__icon d-inline-block pa-3 pa-lg-5 rounded">
                <v-icon
                    color="primary"
                    size="40">
                    {{ icon }}
                </v-icon>
            </div>

            <h2 class="text-h6 mt-5 mb-3 text--primary h-100">
                {{ title }}
            </h2>

            <!-- eslint-disable vue/no-v-text-v-html-on-component vue/no-v-html -->
            <p
                class="text-subtitle-2 mb-0 text--secondary"
                v-html="summary" />
        </v-card>
    </v-col>
</template>

<script>
export default {
    props: {
        url: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        summary: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped="">
.vh-calculator-grid-item {
    position: relative;

    &__bg-icon {
        position: absolute !important;
        inset-inline-end: 0;
        inset-block-end: 0;
        transform: translate(25%, 25%) rotate(-45deg);
        opacity: .04
    }

    &__icon {
        background: rgba($vh-color-primary, .08)
    }
}
</style>
