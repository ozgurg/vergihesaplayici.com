<template>
    <v-main v-bind="$attrs">
        <v-container
            :class="containerClassByBreakpoint"
            class="px-6 px-sm-8 px-md-10">
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
