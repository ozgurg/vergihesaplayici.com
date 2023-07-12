<template>
    <footer class="text-center text-body-2 text--secondary">
        <a href="https://github.com/ozgurg" rel="nofollow noopener noreferrer" target="_blank">@ozgurg</a> tarafından <a rel="nofollow noopener noreferrer" target="_blank" href="https://github.com/ozgurg/vergihesaplayici.com">açık kaynaklı</a> olarak geliştirilmektedir
        <b class="mt-2 d-block">v{{ version }}</b>
    </footer>
</template>

<script>
import { version } from "@/package.json";

export default {
    data: () => ({
        version
    })
};
</script>
