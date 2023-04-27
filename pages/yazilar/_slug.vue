<template>
    <div>
        <PageTitle>
            {{ content.title }}
        </PageTitle>

        <nuxt-content :document="content" />

        <v-divider class="my-12" />

        <PageSubtitle
            class="mb-4">
            Diğer yazılar
        </PageSubtitle>
        <v-list
            outlined=""
            rounded="">
            <template v-for="_article in articles">
                <v-list-item
                    :key="_article.url"
                    :to="_article.url"
                    link="">
                    {{ _article.title }}
                </v-list-item>
            </template>
        </v-list>
    </div>
</template>

<script>
import { articles } from "@/data/articles.js";

export default {
    data: () => ({
        articles
    }),
    async asyncData({ $content, params: { slug } }) {
        return {
            content: await $content(slug).fetch()
        };
    }
};
</script>
