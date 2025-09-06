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
    line-height: 1.5;


    // Paragraph
    :deep(p):not(:last-child) {
        margin-block-end: calc(var(--vh-spacer) * 2)
    }
    :deep(p + ol, p + ul) {
        margin-block-start: calc(var(--vh-spacer) * -1)
    }
    :deep(p + h2),
    :deep(p + h3),
    :deep(p + h4),
    :deep(p + h5),
    :deep(p + h6) {
        margin-block-start: calc(var(--vh-spacer) * 3)
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
        font-weight: 700
    }
    :deep(em),
    :deep(i) {
        font-style: italic
    }
    :deep(u) {
        text-underline-offset: .25rem
    }
    :deep(a) {
        color: var(--_link-color);
        @include vh-link
    }


    // Heading
    :deep(h2),
    :deep(h3),
    :deep(h4),
    :deep(h5),
    :deep(h6) {
        margin-block-end: calc(var(--vh-spacer) * .5)
    }
    :deep(h2) {
        font-size: var(--vh-fs-lg);
        font-weight: 600
    }
    :deep(h3) {
        font-size: var(--vh-fs-md);
        font-weight: 600
    }


    // Table
    :deep(table) {
        table-layout: auto;
        vertical-align: top;
        caption-side: bottom;
        border-collapse: collapse;
        @include vh-media-breakpoint-down(sm) {
            margin-inline: calc(var(--container-padding-inline) * -1)
        }
        thead {
            background: hsla(var(--vh-clr-white-hsl), .08);
            @include vh-media-breakpoint-up(md) {
                position: sticky;
                inset-block-start: var(--header-up-md-collapsed-block-size);
                @include vh-backdrop-filter(blur(1rem))
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
            padding-inline: var(--container-padding-inline);
            padding-block: calc(var(--vh-spacer) * .5);
            @include vh-media-breakpoint-up(sm) {
                padding-inline: var(--vh-spacer)
            }
        }
    }


    // Various
    :deep(blockquote) {
        @include vh-squircle(
            $topLeft: 0,
            $topRight: var(--vh-br-normal),
            $bottomRight: var(--vh-br-normal),
            $bottomLeft: 0
        );
        margin-block-end: calc(var(--vh-spacer) * 2);
        padding: var(--vh-spacer);
        border-left: .25rem solid var(--vh-clr-primary);
        background: hsla(var(--vh-clr-white-hsl), .12)
    }

    :deep(hr) {
        border-color: var(--vh-clr-white);
        border-style: dashed;
        margin-block-end: calc(var(--vh-spacer) * 2)
    }
}
</style>
