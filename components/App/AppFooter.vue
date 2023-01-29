<template>
    <div>
        <v-divider />
        <footer class="d-flex align-center flex-column text-center pb-4 pt-5 px-4">
            <div class="mb-1 text-subtitle-2">
                vergihesaplayici.com v{{ version }}
            </div>

            <div class="mb-4 text-body-2 text--secondary">
                <a href="https://github.com/ozgurg" rel="nofollow noopener noreferrer" target="_blank">@ozgurg</a>
                tarafından açık kaynaklı olarak geliştirilmektedir.
            </div>

            <GitHubStarButton />
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
