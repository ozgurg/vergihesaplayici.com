<template>
    <v-col
        cols="12"
        md="6">
        <v-card
            :to="url"
            outlined=""
            class="px-6 py-8 pa-sm-8 d-flex flex-column justify-space-between h-100">
            <v-icon
                class="primary--text"
                size="56">
                {{ icon }}
            </v-icon>

            <h2 class="text-h6 mt-4 mb-3 text--primary h-100">
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
