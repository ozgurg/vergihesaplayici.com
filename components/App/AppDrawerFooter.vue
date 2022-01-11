<template>
    <div
        v-bind="$attrs"
        class="d-flex justify-center flex-column text-center pa-4">
        <p class="mb-2">vergihesaplayici.com v{{ version }}</p>

        <p class="mb-5"><small><a href="https://github.com/ozgurg" rel="nofollow noopener noreferrer" target="_blank">@ozgurg</a> tarafından açık kaynaklı olarak geliştirilmektedir</small></p>

        <div>
            <Ghbtns />
        </div>
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
