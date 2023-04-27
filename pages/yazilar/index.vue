<template>
    <div>
        <PageTitle>
            Yazılar
        </PageTitle>

        <InnerContainer>
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
        </InnerContainer>
    </div>
</template>

<script>
import { articles } from "@/data/articles.js";

export default {
    data: () => ({
        articles
    })
};
</script>
