<template>
    <div>
        <template v-if="!isReady">
            <div
                aria-busy="true"
                class="text-center col-12 col-md-6 mx-auto my-10">
                <div class="mb-5">
                    Yorumlar yükleniyor…
                </div>
                <v-progress-circular indeterminate="" />
            </div>
        </template>
        <Disqus
            :identifier="$route.path"
            :shortname="shortname"
            :url="url"
            lang="tr"
            @ready="onReady()" />
    </div>
</template>

<script>
import { getFullUrl } from "@/utils/get-full-url.js";

export default {
    data: () => ({
        isReady: false
    }),
    methods: {
        onReady() {
            const vm = this;
            vm.isReady = true;
        }
    },
    computed: {
        url() {
            const vm = this;
            return getFullUrl(vm.$route.path);
        },
        shortname() {
            return process.env.DISQUS_SHORTNAME;
        }
    }
};
</script>
