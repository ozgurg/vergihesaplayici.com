<template>
    <Disqus
        :identifier="$route.path"
        :shortname="shortname"
        :url="url"
        lang="tr" />
</template>

<script>
import { getFullUrl } from "@/utils/get-full-url.js";

export default {
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
