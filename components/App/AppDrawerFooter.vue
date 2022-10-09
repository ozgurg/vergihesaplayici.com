<template>
    <footer
        v-bind="$attrs"
        class="d-flex justify-center flex-column text-center pb-3 pt-5">
        <div class="mb-1">
            vergihesaplayici.com v{{ version }}
        </div>

        <div class="mb-5">
            <small><a href="https://github.com/ozgurg" rel="nofollow noopener noreferrer" target="_blank">@ozgurg</a> tarafından açık kaynaklı olarak geliştirilmektedir</small>
        </div>

        <div>
            <GitHubButton />
        </div>
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
