<template>
    <div>
        <AppBreadcrumbs :items="breadcrumbs()" />

        <Heading1>
            Yazılar
        </Heading1>

        <div class="mb-12">
            <template v-if="$vuetify.breakpoint.lgAndUp">
                <AdsterraBanner728x90 :order="0" />
            </template>
            <template v-else-if="$vuetify.breakpoint.mdAndDown">
                <AdsterraBanner300x250 :order="0" />
            </template>
        </div>

        <InnerContainer>
            <v-row>
                <template v-for="(_article, index) in articles">
                    <v-col
                        :key="_article.slug"
                        cols="12"
                        lg="4">
                        <ArticleItem :article="_article" />
                    </v-col>

                    <template v-if="index === 2">
                        <v-col :key="_article.slug" cols="12">
                            <AdsterraNative
                                :order="1"
                                class="my-12" />
                        </v-col>
                    </template>
                </template>
            </v-row>
        </InnerContainer>

        <div class="mt-16">
            <template v-if="$vuetify.breakpoint.lgAndUp">
                <AdsterraBanner468x60 :order="2" />
            </template>
            <template v-else-if="$vuetify.breakpoint.mdAndDown">
                <AdsterraBanner320x50 :order="2" />
            </template>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        breadcrumbs() {
            return [
                {
                    title: "Yazılar",
                    url: "/yazilar/"
                }
            ];
        }
    },
    async asyncData({ $content }) {
        return {
            articles: await $content("/").sortBy("createdAt", "desc").fetch()
        };
    }
};
</script>
