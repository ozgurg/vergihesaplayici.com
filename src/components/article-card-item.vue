<template>
    <article
        :itemscope="true"
        itemtype="https://schema.org/NewsArticle"
        class="article-card-item">
        <div class="meta">
            <time
                :datetime="timeDateTimeAttr"
                :content="timeContentAttr"
                itemprop="datePublished"
                class="meta-date">
                {{ readableDate }}
            </time>
            <span aria-hidden="true">•</span>
            <span
                :itemscope="true"
                itemprop="author"
                itemtype="https://schema.org/Person"
                aria-hidden="true"
                class="meta-author">
                <span itemprop="name">vergihesaplayici.com</span>
                <meta :content="authorUrl.href" itemprop="url" />
            </span>
        </div>
        <component
            :is="titleTag"
            class="title">
            <a
                :href="props.url.href"
                itemprop="url"
                class="stretched-link">
                <span itemprop="headline">{{ props.title }}</span>
            </a>
            <svg-icon :icon="icon_chevronRight" />
        </component>
        <div
            v-html="props.description"
            aria-hidden="true"
            class="summary">
        </div>
    </article>
</template>

<script lang="ts" setup>
import type { Heading } from "@/types/common.js";
import type { HtmlAttrs_a } from "@/types/html.js";
import { icon_chevronRight } from "@/utils/icons.js";

export type Props = {
    title: string;
    titleTag: Heading;
    description: string;
    url: URL;
    date: Date;
} & /* @vue-ignore */ Partial<HtmlAttrs_a>;

const props = defineProps<Props>();

const timeDateTimeAttr = props.date.toISOString().split("T")[0]; // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time#valid_datetime_values
const timeContentAttr = props.date.toISOString(); // https://developers.google.com/search/docs/appearance/structured-data/article#article-types
const readableDate = props.date.toLocaleDateString("tr-TR");
const authorUrl = siteUrl();
</script>

<style lang="scss" scoped>
.article-card-item {
    @include vh-card($hover: true, $active: true);
    position: relative;
    background-image: none;
    block-size: 100%;
    display: block;
    padding: calc(var(--vh-spacer) * 2) calc(var(--vh-spacer) * 1.5);
    @include vh-media-breakpoint-down(sm) {
        --border-radius: 0;
        border: 0;
        padding-inline: var(--container-padding-inline);
        margin-inline: calc(var(--container-padding-inline) * -1)
    }
    @include vh-media-breakpoint-down(sm) {
        &:nth-child(odd) {
            background-color: hsla(var(--vh-clr-white-hsl), .04)
        }
    }
    &:has(a:focus-visible) {
        @include vh-focus-appearance()
    }
    .meta {
        margin-block-end: calc(var(--vh-spacer) * .5);
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1ch;
        font-size: var(--vh-fs-sm);
        line-height: var(--vh-lh-lg);
        &-date {
            font-weight: var(--vh-fw-medium);
            color: hsl(var(--vh-clr-primary-h), var(--vh-clr-primary-s), 85%)
        }
        &-author {
            color: hsl(var(--vh-clr-white-h), var(--vh-clr-white-s), 85%)
        }
    }
    .title {
        text-wrap: pretty;
        margin-block-end: calc(var(--vh-spacer) * .25);
        a {
            font-size: var(--vh-fs-md);
            font-weight: var(--vh-fw-bold);
            line-height: var(--vh-lh-lg);
            &:focus {
                @include vh-clear-focus-appearance()
            }
        }
        .svg-icon {
            --size: calc(var(--vh-spacer) * 1.25);
            vertical-align: middle;
            opacity: .75
        }
    }
    .summary {
        font-size: var(--vh-fs-sm);
        font-weight: var(--vh-fw-medium);
        line-height: var(--vh-lh-lg);
        opacity: .75
    }
}
</style>
