<template>
    <!--
    In `DEV` mode, when using `<use />` with `<svg />`s, Astro fails to load the SVGs properly on the initial load.
    To avoid this issue, I bypass the cache reading in `DEV` mode by directly rendering the SVG with `<svg-fragment />`.
    -->

    <!--
    <template v-if="isDevMode">
        <svg-fragment :html="props.svg" />
    </template>
    <template v-else>
        <svg>
            <use :href="svgCacheHref" />
        </svg>
    </template>
    -->

    <svg-fragment :html="props.svg" />
</template>

<script lang="ts" setup>
import type { HtmlAttrs_svg } from "@/types/html.js";
import type { SvgIcon } from "@/types/common.js";

export type Props = {
    svg: SvgIcon;
} & /* @vue-ignore */ Partial<HtmlAttrs_svg>;

const props = defineProps<Props>();

/*
const isDevMode = import.meta.env.DEV;
const svgCacheKey = setSvgCache(props.svg);
const svgCacheHref = `#${svgCacheKey}`;
*/
</script>
