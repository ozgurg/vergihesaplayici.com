<template>
    <article
        :itemscope="true"
        itemtype="https://schema.org/NewsArticle"
        class="article-card-item">
        <a
            :href="props.url.href"
            itemprop="url">
            <time
                :datetime="timeDateTimeAttr"
                :content="timeContentAttr"
                itemprop="datePublished"
                class="date">
                {{ readableDate }}
            </time>
            <h2 class="title">
                <span itemprop="headline">{{ props.title }}</span>
                <svg-icon :icon="icon_chevronRight" />
            </h2>
            <div
                v-html="props.description"
                class="summary">
            </div>
        </a>
    </article>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_a } from "@/types/html.js";
import { icon_chevronRight } from "@/utils/icons.js";

export type Props = {
    title: string;
    description: string;
    url: URL;
    date: Date;
} & /* @vue-ignore */ Partial<HtmlAttrs_a>;

const props = defineProps<Props>();

const timeDateTimeAttr = props.date.toISOString().split("T")[0]; // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time#valid_datetime_values
const timeContentAttr = props.date.toISOString(); // https://developers.google.com/search/docs/appearance/structured-data/article#article-types
const readableDate = props.date.toLocaleDateString("tr-TR");
</script>

<style lang="scss" scoped>
.article-card-item {
    block-size: 100%;
    @include vh-media-breakpoint-down(sm) {
        &:first-child {
            margin-block-start: calc((var(--vh-spacer) * 2) * -1)
        }
        &:nth-child(even) a {
            background-color: hsla(var(--vh-clr-white-hsl), .04)
        }
    }
    a {
        @include vh-card($hover: true, $active: true);
        background-image: none;
        block-size: 100%;
        display: block;
        padding: calc(var(--vh-spacer) * 2) calc(var(--vh-spacer) * 1.5);
        @include vh-media-breakpoint-down(sm) {
            border-radius: 0;
            border: 0;
            padding-inline: var(--container-padding-inline);
            margin-inline: calc(var(--container-padding-inline) * -1)
        }
    }
    .date {
        font-size: var(--vh-fs-sm);
        font-weight: var(--vh-fw-medium);
        line-height: var(--vh-lh-lg);
        display: block;
        color: hsl(var(--vh-clr-primary-h), var(--vh-clr-primary-s), 85%);
        margin-block-end: calc(var(--vh-spacer) * .5)
    }
    .title {
        text-wrap: pretty;
        margin-block-end: calc(var(--vh-spacer) * .25);
        span {
            font-size: var(--vh-fs-md);
            font-weight: var(--vh-fw-bold);
            line-height: var(--vh-lh-lg)
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
