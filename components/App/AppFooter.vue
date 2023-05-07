<template>
    <div>
        <v-divider />
        <footer class="d-flex align-center flex-column text-center py-6 px-4">
            <div class="mb-3 text-body-2 text--secondary">
                <b>v{{ version }}</b> – <a href="https://github.com/ozgurg" rel="nofollow noopener noreferrer" target="_blank">@ozgurg</a>
                tarafından açık kaynaklı olarak geliştirilmektedir
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
