<template>
    <v-list-item :to="calculator.url">
        <v-list-item-icon>
            <v-icon>
                {{ calculator.icon }}
            </v-icon>
        </v-list-item-icon>

        <v-list-item-title>
            {{ calculator.shortTitle }}
        </v-list-item-title>
    </v-list-item>
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
