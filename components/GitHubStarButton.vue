<template>
    <div class="vh-github-button grey darken-3 pa-2 d-inline-block">
        <iframe
            :src="src"
            title="Projenin GitHub'taki yıldız sayısı"
            height="20"
            width="84" />
    </div>
</template>

<script>
export default {
    computed: {
        src() {
            return process.env.NODE_ENV === "production" ?
                "https://ghbtns.com/github-btn.html?user=ozgurg&repo=vergihesaplayici.com&type=star&count=true" :
                false;
        }
    }
};
</script>

<style>
.vh-github-button {
    border-radius: 11px /* .pa-2 padding (8px) + .gh-btn border-radius (3px) */
}

.vh-github-button iframe {
    overflow: hidden;
    border: 0;
    padding: 0;
    margin: 0;
    display: block;
    width: 81px;
    height: 20px
}
</style>
