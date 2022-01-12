<template>
    <div
        v-bind="$attrs"
        class="inner-container">
        <slot />
    </div>
</template>

<style lang="scss">
.inner-container {
    max-width: 900px
}
</style>
