<template>
    <v-main v-bind="$attrs">
        <v-container
            :class="containerClassByBreakpoint"
            class="px-4 px-sm-6 px-md-10">
            <slot />
        </v-container>
    </v-main>
</template>

<script>
export default {
    computed: {
        containerClassByBreakpoint() {
            const vm = this;
            return vm.$vuetify.breakpoint.mobile ? "my-4" : "my-16";
        }
    }
};
</script>
