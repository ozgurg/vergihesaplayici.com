<template>
    <div>
        <AppBreadcrumbs :items="breadcrumbs()" />

        <PageTitle>
            Yazılar
        </PageTitle>

        <InnerContainer>
            <template v-if="$vuetify.breakpoint.lgAndUp">
                <AdsterraBanner728x90 :order="0" class="d-flex mx-auto" />
            </template>
            <template v-else-if="$vuetify.breakpoint.mdAndDown">
                <AdsterraBanner300x250 :order="0" class="d-flex mx-auto" />
            </template>
            <v-divider class="mt-4 mb-12" />

            <v-row>
                <template v-for="(_article, index) in articles">
                    <v-col
                        :key="_article.slug"
                        cols="12"
                        lg="6">
                        <ArticleItem :article="_article" />
                    </v-col>

                    <template v-if="index === 3">
                        <v-col :key="_article.slug" cols="12">
                            <v-divider class="mb-2 mt-12" />
                            <AdsterraNative
                                :order="1"
                                ad-key="18d820d42a43bbb54b363d01dc952cf3"
                                class="mt-4" />
                            <v-divider class="mt-2 mb-12" />
                        </v-col>
                    </template>
                </template>
            </v-row>

            <v-divider class="mb-2 mt-12" />
            <template v-if="$vuetify.breakpoint.lgAndUp">
                <AdsterraBanner468x60 :order="2" class="d-flex mx-auto" />
            </template>
            <template v-else-if="$vuetify.breakpoint.mdAndDown">
                <AdsterraBanner320x50 :order="2" class="d-flex mx-auto" />
            </template>
            <v-divider class="mt-2 mb-12" />
        </InnerContainer>
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
