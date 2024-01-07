<template>
    <!--
    To enhance readability, formatter:on and formatter:off comments have been added to disable the WebStorm formatter for the sentence.
    -->
    <footer class="text-center text-body-2 text--secondary">
        <!-- @formatter:off -->
        <a :href="authorUrl" rel="nofollow noopener noreferrer" target="_blank">@{{ authorUsername }}</a> tarafından <a :href="repositoryUrl" rel="nofollow noopener noreferrer" target="_blank">açık kaynaklı</a> olarak geliştirilmektedir
        <!-- @formatter:on -->

        <span class="font-weight-bold mt-2 d-block">
            v{{ version }}
        </span>
    </footer>
</template>

<script setup>
// FIXME:
// Importing with object destructuring in "script setup" without using "as" causes WebStorm to not detect their usage within the template.
// This can be refactored when it's fixed.
import packageJson from "@/package.json";

const authorUrl = packageJson.author.url;
const authorUsername = packageJson.author.url.split("/")[3];

const repositoryUrl = packageJson.repository.url;

const version = packageJson.version;
</script>
