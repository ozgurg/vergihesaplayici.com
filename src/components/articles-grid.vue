<template>
    <div class="articles-grid">
        <template v-for="_item in props.items" :key="_item.slug">
            <article-card-item
                :title-tag="props.titleTag"
                :yazi="_item" />
        </template>
    </div>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_div } from "@/types/html.js";
import type { Props as ArticleCardItemProps } from "@/components/article-card-item.vue";
import type { Yazi } from "@/domains/yazilar/types.js";

export type Props = {
    titleTag: ArticleCardItemProps["titleTag"]
    items: Yazi[]
} & /* @vue-ignore */ Partial<HtmlAttrs_div>;

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
.articles-grid {
    display: grid;
    grid-template-columns: 1fr;
    @include vh-media-breakpoint-up(sm) {
        gap: var(--vh-spacer)
    }
    @include vh-media-breakpoint-up(md) {
        grid-template-columns: 1fr 1fr
    }
}
</style>
