<template>
    <DisqusCount
        :identifier="$route.path"
        :shortname="shortname" />
</template>

<script>
export default {
    computed: {
        shortname() {
            return process.env.DISQUS_SHORTNAME;
        }
    }
};
</script>
