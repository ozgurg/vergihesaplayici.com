<template>
    <v-card
        :to="url"
        link=""
        outlined=""
        class="pa-8 d-flex flex-column justify-space-between h-100">
        <v-icon
            class="primary--text"
            size="64">
            {{ icon }}
        </v-icon>

        <h2 class="text-h6 mt-4 mb-2 text--primary h-100">
            {{ title }}
        </h2>

        <p class="text-subtitle-2 mb-0 text--secondary">
            {{ description }}
        </p>
    </v-card>
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
        description: {
            type: String,
            required: true
        }
    }
};
</script>
