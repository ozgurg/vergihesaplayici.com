<template>
    <div
        v-bind="$attrs"
        class="mb-16">
        <h1 class="text-h4 text-lg-h3 mb-4 font-weight-bold">
            <slot />
        </h1>

        <v-divider />
    </div>
</template>
