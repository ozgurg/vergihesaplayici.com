<template>
    <v-list-item :to="props.calculator.url">
        <v-list-item-icon>
            <v-icon>
                {{ props.calculator.icon }}
            </v-icon>
        </v-list-item-icon>

        <v-list-item-title>
            {{ props.calculator.shortTitle }}
        </v-list-item-title>
    </v-list-item>
</template>

<script setup="">
const props = defineProps({
    calculator: {
        type: Object,
        required: true
    }
});
</script>
