<template>
    <div
        v-bind="$attrs"
        class="vh-inner-container">
        <slot />
    </div>
</template>

<style>
.vh-inner-container {
    max-width: 900px
}
</style>
