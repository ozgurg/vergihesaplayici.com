<!-- FIXME: It's too much effort to print HTML without a wrapper :) -->

<template>
    <svg
        v-bind="svgAttrs"
        v-html="content" />
</template>

<script lang="ts" setup>
export type Props = {
    html: string;
};

const props = defineProps<Props>();

const _extractAttrs = (htmlString: string): { [key: string]: string } => {
    const SVG_TAG_REGEX = /<svg([^>]*)>/;
    const ATTRS_REGEX = /([\w-]+)(?:=(["'])(.*?)\2)?/g;
    const attrs: { [key: string]: string } = {};

    const svgMatch = SVG_TAG_REGEX.exec(htmlString);
    if (!svgMatch || !svgMatch[1]) {
        return attrs;
    }

    let match: RegExpExecArray | null;
    while ((match = ATTRS_REGEX.exec(svgMatch[1])) !== null) {
        if (match[1]) {
            attrs[match[1]] = match[3] ?? "";
        }
    }

    return attrs;
};

const svgAttrs = _extractAttrs(props.html);

const content = props.html
    .replace(/<([a-z]+)(?![^>]*\/>)[^>]*>/, "")
    .replace(/<\/([a-z]+)>$/, "");
</script>
