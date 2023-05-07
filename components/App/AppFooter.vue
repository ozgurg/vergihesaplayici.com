<template>
    <div>
        <v-divider />
        <footer class="text-center pa-6 text-body-2 text--secondary">
            <b>v{{ version }}</b> – <a href="https://github.com/ozgurg" rel="nofollow noopener noreferrer" target="_blank">@ozgurg</a> tarafından <a rel="nofollow noopener noreferrer" target="_blank" href="https://github.com/ozgurg/vergihesaplayici.com">açık kaynaklı</a> olarak geliştirilmektedir
        </footer>
    </div>
</template>

<script>
import { version } from "@/package.json";

export default {
    data: () => ({
        version
    })
};
</script>
