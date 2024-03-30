<template>
    <div>
        <slot v-if="$slots.default" />
    </div>
</template>

<style lang="scss" scoped="">
div {
    max-width: 900px
}
</style>
