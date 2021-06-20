<template>
    <v-main v-bind="$attrs">
        <v-container
            :class="containerGutterClass"
            class="px-4 px-sm-6 px-md-8">
            <slot />
        </v-container>
    </v-main>
</template>

<script>
export default {
    name: "Main",
    computed: {
        containerGutterClass() {
            const vm = this;
            return vm.$vuetify.breakpoint.mobile ? "my-4" : "my-16";
        }
    }
};
</script>
