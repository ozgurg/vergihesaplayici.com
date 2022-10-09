<template>
    <v-list-item
        v-bind="$attrs"
        :to="url">
        <v-list-item-icon>
            <v-icon>
                {{ icon }}
            </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
            <v-list-item-title>
                {{ title }}
            </v-list-item-title>
        </v-list-item-content>
    </v-list-item>
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
        }
    }
};
</script>
