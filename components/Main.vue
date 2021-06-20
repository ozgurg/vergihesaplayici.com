<template>
    <v-main v-bind="$attrs">
        <v-container class="my-8 pa-4 pa-sm-6 pa-md-8">
            <slot />
        </v-container>
    </v-main>
</template>

<script>
export default {
    name: "Main"
};
</script>
