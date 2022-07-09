<template>
    <Disqus
        v-bind="$attrs"
        :url="url" />
</template>

<script>
import { getFullUrl } from "@/utils/get-full-url.js";

export default {
    computed: {
        url() {
            const vm = this;
            return getFullUrl(vm.$route.path);
        }
    }
};
</script>
