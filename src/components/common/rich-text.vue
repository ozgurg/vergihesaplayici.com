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
    :deep(table) {
        margin-block-end: calc(var(--vh-spacer) * 1.25);
        &:last-child {
            margin-block-end: 0
        }
        &:has(+ p) {
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
            margin-block-end: calc(var(--vh-spacer) * 3)
        }
    }
    :deep(ol) {
        list-style: inside decimal;
        &:not(:last-child) {
            margin-block-end: calc(var(--vh-spacer) * 3)
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
        position: relative;
        @include vh-squircle(var(--vh-br-normal));
        margin-block-end: calc(var(--vh-spacer) * 2);
        padding: var(--vh-spacer);
        background: hsla(var(--vh-clr-white-hsl), .12);
        &::before {
            position: absolute;
            content: "";
            border-radius: 0 var(--vh-br-normal) var(--vh-br-normal) 0;
            background: var(--vh-clr-primary);
            inset-block: var(--vh-spacer);
            inset-inline-start: 0;
            inline-size: calc(var(--vh-spacer) * .25)
        }
    }


    // Details
    :deep(details) {
        --_padding-inline: calc(var(--vh-spacer) * 1.25);
        border: var(--vh-border-inline-size) solid hsla(var(--vh-clr-border-hsl), var(--vh-clr-border-alpha));
        overflow: hidden;
        margin-inline: calc(var(--container-padding-inline) * -1);
        @include vh-media-breakpoint-down(sm) {
            border-inline: 0
        }
        @include vh-media-breakpoint-up(sm) {
            @include vh-squircle(var(--vh-br-normal));
            margin-inline: calc(var(--_padding-inline) * -1)
        }
        & + details {
            margin-block-start: calc(var(--vh-spacer) * .75)
        }
        &[open] {
            background: hsla(var(--vh-clr-white-hsl), .08);
            @supports (interpolate-size: allow-keywords) {
                &::details-content {
                    block-size: auto
                }
            }
            summary {
                &::after {
                    transform: rotate(45deg) scale(1.5)
                }
                &::before {
                    position: absolute;
                    inset-block-end: 0;
                    border-block-end: var(--vh-border-inline-size) dashed hsla(var(--vh-clr-border-hsl), var(--vh-clr-border-alpha));
                    content: "";
                    transition: vh-transition(opacity, var(--vh-duration-short));
                    @include vh-media-breakpoint-down(sm) {
                        inset-inline: var(--container-padding-inline)
                    }
                    @include vh-media-breakpoint-up(sm) {
                        inset-inline: var(--_padding-inline)
                    }
                }
            }
        }
        summary {
            --_color-hsl: var(--color-hsl, var(--vh-clr-white-hsl));
            --_bg-alpha: var(--bg-alpha, 0);
            position: relative;
            cursor: pointer;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: var(--vh-spacer);
            font-weight: var(--vh-fw-bold);
            background-color: hsla(var(--_color-hsl), var(--_bg-alpha));
            padding: var(--vh-spacer) var(--container-padding-inline);
            @include vh-media-breakpoint-up(sm) {
                padding: var(--vh-spacer) calc(var(--vh-spacer) * 1.25)
            }
            @include vh-hover {
                transition: vh-transition(background-color, var(--vh-duration-short));
                &:hover {
                    --bg-alpha: .08;
                    &::before {
                        opacity: 0
                    }
                }
                &:active {
                    --bg-alpha: .12
                }
            }
            &::after {
                inline-size: .75rem;
                aspect-ratio: 1;
                display: inline-block;
                content: "";
                transform-origin: center;
                background: conic-gradient(from 90deg at 1px 1px, transparent 90deg, currentColor 0) calc(100% + .5px) calc(100% + .5px) / calc(50% + 1px) calc(50% + 1px);
                transition: vh-transition(transform, var(--vh-duration-long), var(--vh-timing-spring))
            }
        }
        & > div {
            padding: var(--vh-spacer) calc(var(--vh-spacer) * 1.25)
        }
        @supports (interpolate-size: allow-keywords) {
            &::details-content {
                transition: vh-transition(block-size content-visibility, var(--vh-duration-long));
                transition-behavior: allow-discrete;
                block-size: 0;
                overflow: clip
            }
        }
    }
}
</style>
