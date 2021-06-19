<template>
    <div class="inner-container">
        <slot />
    </div>
</template>

<script>
export default {
    name: "InnerContainer"
};
</script>

<style lang="scss">
.inner-container {
    max-width: 900px
}
</style>
