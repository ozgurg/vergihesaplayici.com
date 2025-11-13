<template>
    <div class="articles-grid">
        <template v-for="_item in props.items" :key="_item.url">
            <article-card-item
                :title="_item.title"
                :title-tag="props.titleTag"
                :description="_item.description"
                :url="_item.url"
                :date="_item.date" />
        </template>
    </div>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_div } from "@/types/html.js";
import type { Props as ArticleCardItemProps } from "@/components/article-card-item.vue";

export type Props = {
    titleTag: ArticleCardItemProps["titleTag"]
    items: Omit<ArticleCardItemProps, "titleTag">[]
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
