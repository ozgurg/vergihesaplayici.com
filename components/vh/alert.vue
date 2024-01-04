<template>
    <v-alert
        :type="type"
        :icon="false"
        :text="true">
        <slot v-if="$slots.default" />
    </v-alert>
</template>
<script>
export default {
    props: {
        type: {
            type: String,
            default: ""
        }
    }
};
</script>
