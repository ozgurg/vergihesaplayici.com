<template>
    <div
        v-bind="$attrs"
        class="mb-16">
        <h1 class="text-md-h3 text-h4 mb-4 font-weight-black">
            <slot />
        </h1>

        <v-divider />
    </div>
</template>
