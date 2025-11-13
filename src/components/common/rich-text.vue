<template>
    <component
        :is="props.is"
        class="rich-text">
        <slot name="default" />
    </component>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_div } from "@/types/html.js";

export type Props = {
    is?: string;
} & /* @vue-ignore */ Partial<HtmlAttrs_div>;

const props = withDefaults(defineProps<Props>(), {
    is: "div"
});
</script>

<style lang="scss" scoped>
.rich-text {
    --_link-color: var(--link-color, var(--vh-clr-primary));
    --_line-height-p: var(--line-height-p, var(--vh-lh-lg));
    line-height: var(--vh-lh-base);


    // Paragraph
    :deep(p) {
        line-height: var(--_line-height-p);
        margin-block-end: calc(var(--vh-spacer) * 1.25);
        &:last-child {
            margin-block-end: 0
        }
        &:has(+ ul),
        &:has(+ ol),
        &:has(+ table) {
            margin-block-end: calc(var(--vh-spacer) * .75)
        }
        & + h1,
        & + h2,
        & + h3,
        & + h4,
        & + h5,
        & + h6 {
            margin-block-start: calc(var(--vh-spacer) * 3)
        }
    }
    :deep(table):has(+ p) {
        margin-block-end: calc(var(--vh-spacer) * .75)
    }


    // List
    :deep(li > p:only-of-type) {
        display: inline
    }
    :deep(li + li) {
        margin-block-start: calc(var(--vh-spacer) * .5)
    }
    :deep(ul) {
        list-style: inside square;
        &:not(:last-child) {
            margin-block-end: calc(var(--vh-spacer) * 2)
        }
    }
    :deep(ol) {
        list-style: inside decimal;
        &:not(:last-child) {
            margin-block-end: calc(var(--vh-spacer) * 4)
        }
    }


    // Inline
    :deep(b),
    :deep(strong) {
        font-weight: var(--vh-fw-bold)
    }
    :deep(em),
    :deep(i) {
        font-style: italic
    }
    :deep(u) {
        text-underline-offset: calc(var(--vh-spacer) * .25)
    }
    :deep(a) {
        color: var(--_link-color);
        @include vh-link
    }


    // Heading
    :deep(h1),
    :deep(h2),
    :deep(h3),
    :deep(h4),
    :deep(h5),
    :deep(h6) {
        margin-block-end: calc(var(--vh-spacer) * .75)
    }
    :deep(h2) {
        @include vh-heading-2
    }
    :deep(h3) {
        @include vh-heading-3
    }


    // Table
    :deep(table) {
        @mixin cell-padding {
            padding-inline: var(--container-padding-inline);
            padding-block: calc(var(--vh-spacer) * .5);
            @include vh-media-breakpoint-up(sm) {
                padding-inline: var(--vh-spacer)
            }
        }
        table-layout: auto;
        vertical-align: top;
        caption-side: bottom;
        border-collapse: collapse;
        border: var(--vh-border-inline-size) solid hsla(var(--vh-clr-border-hsl), var(--vh-clr-border-alpha));
        inline-size: calc(100% + (var(--container-padding-inline) * 2));
        margin-inline: calc(var(--container-padding-inline) * -1);
        @include vh-media-breakpoint-down(sm) {
            border-inline: 0
        }
        @include vh-media-breakpoint-up(sm) {
            inline-size: calc(100% + (var(--vh-spacer) * 2));
            margin-inline: calc(var(--vh-spacer) * -1)
        }
        thead {
            background: hsla(var(--vh-clr-white-hsl), .08);
            @include vh-media-breakpoint-up(md) {
                position: sticky;
                inset-block-start: var(--header-up-md-collapsed-block-size);
                @include vh-backdrop-blur(1rem)
            }
        }
        tr {
            &:nth-child(even) {
                background: hsla(var(--vh-clr-white-hsl), .02)
            }
            @include vh-hover {
                &:hover td {
                    background: hsla(var(--vh-clr-white-hsl), .04)
                }
            }
        }
        th {
            font-weight: var(--vh-fw-semibold);
            text-align: start
        }
        th,
        td {
            @include cell-padding;
            &:has(a:only-child) {
                padding: 0;
                a {
                    display: inline-block;
                    @include cell-padding
                }
            }
        }
    }


    // Various
    :deep(blockquote) {
        @include vh-squircle(0 var(--vh-br-normal) var(--vh-br-normal) 0);
        margin-block-end: calc(var(--vh-spacer) * 2);
        padding: var(--vh-spacer);
        border-inline-start: calc(var(--vh-spacer) * .25) solid var(--vh-clr-primary);
        background: hsla(var(--vh-clr-white-hsl), .12)
    }
}
</style>
