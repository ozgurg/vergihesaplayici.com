<template>
    <v-col
        class="vh-calculator-grid__item"
        cols="12"
        md="6">
        <v-card
            :to="url"
            outlined=""
            class="px-6 py-8 pa-sm-8 d-flex flex-column justify-space-between align-start h-100 overflow-hidden">
            <div class="vh-calculator-grid__item__icon d-inline-block pa-5 rounded-pill">
                <v-icon
                    class="primary--text"
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

<style lang="scss">
.vh-calculator-grid__item__icon {
    background: transparentize(#88DF95, .92)
}
</style>
