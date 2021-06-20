<template>
    <span
        v-bind="$attrs"
        class="version">
        v{{ version }}
    </span>
</template>

<script>
import { version } from "./../package.json";

export default {
    name: "AppVersion",
    data: () => ({
        version
    })
};
</script>

<style lang="scss" scoped="">
.version {
    position: fixed;
    z-index: 100;
    right: 4px;
    border-radius: 4px;
    bottom: 4px;
    font-size: 10px;
    color: #000;
    background: #88DF95;
    line-height: 1;
    padding: 3px 4px
}
</style>
