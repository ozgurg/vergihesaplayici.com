<template>
    <v-main v-bind="$attrs">
        <v-container
            :class="{'my-4': $vuetify.breakpoint.mobile, 'my-16': !$vuetify.breakpoint.mobile}"
            class="px-4 px-sm-6 px-md-8">
            <slot />
        </v-container>
    </v-main>
</template>

<script>
export default {
    name: "Main"
};
</script>
