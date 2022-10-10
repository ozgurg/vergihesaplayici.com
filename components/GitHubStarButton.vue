<template>
    <div
        v-bind="$attrs"
        class="vh-github-button grey darken-3 pa-2 rounded d-inline-block">
        <iframe
            title="Projenin GitHub'taki yıldız sayısı"
            height="20"
            width="84"
            src="https://ghbtns.com/github-btn.html?user=ozgurg&repo=vergihesaplayici.com&type=star&count=true" />
    </div>
</template>

<style lang="scss">
.vh-github-button {
    iframe {
        overflow: hidden;
        border: 0;
        padding: 0;
        margin: 0;
        display: block;
        width: 84px;
        height: 20px
    }
}
</style>
