<template>
    <v-main>
        <!-- `px-5` is set to align with `v-app-bar-nav-icon` -->
        <v-container class="px-5 px-md-12 my-8 my-md-16">
            <slot v-if="$slots.default" />
        </v-container>
    </v-main>
</template>
