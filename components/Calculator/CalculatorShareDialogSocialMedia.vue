<template>
    <div>
        <v-row
            class="mb-2 ma-n2 d-flex justify-center"
            no-gutters="">
            <v-col
                v-for="(item, key) in items"
                :key="key"
                class="pa-2"
                cols="4"
                sm="2">
                <v-tooltip bottom="">
                    <template #activator="{ on, attrs }">
                        <v-btn
                            v-on="on"
                            v-bind="attrs"
                            :href="item.url"
                            :color="item.color"
                            link=""
                            rel="nofollow noopener noreferrer"
                            target="_blank"
                            block=""
                            elevation="0"
                            rounded=""
                            large="">
                            <template v-if="item.icon.endsWith('.svg')">
                                <!-- eslint-disable vue/no-v-html -->
                                <div v-html="require(`@/assets/img/${item.icon}?raw`)" />
                            </template>
                            <template v-else>
                                <v-icon size="24">
                                    {{ item.icon }}
                                </v-icon>
                            </template>
                        </v-btn>
                    </template>

                    <span>{{ item.title }}</span>
                </v-tooltip>
            </v-col>

            <v-col
                v-if="isWebShareApiSupported"
                class="pa-2"
                cols="12"
                sm="2">
                <v-tooltip bottom="">
                    <template #activator="{ on, attrs }">
                        <v-btn
                            @click="share()"
                            v-on="on"
                            v-bind="attrs"
                            color="white"
                            light=""
                            block=""
                            elevation="0"
                            rounded=""
                            large="">
                            <v-icon size="24">
                                {{ icons.mdiExportVariant }}
                            </v-icon>
                        </v-btn>
                    </template>

                    <span>Diğer</span>
                </v-tooltip>
            </v-col>
        </v-row>

        <div class="mt-6">
            <v-checkbox
                v-model="willIncludeParams"
                hide-details=""
                label="Hesaplayıcı parametrelerini dahil et" />
        </div>
    </div>
</template>

<script>
import { mdiEmail, mdiExportVariant, mdiFacebook, mdiReddit, mdiTwitter, mdiWhatsapp } from "@mdi/js";
import createShareUrlOfCalculator from "@/utils/create-share-url-of-calculator";

export default {
    data: () => ({
        icons: {
            mdiExportVariant,
            mdiFacebook,
            mdiTwitter,
            mdiWhatsapp,
            mdiReddit,
            mdiEmail
        },
        willIncludeParams: true
    }),
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    methods: {
        share() {
            const vm = this;

            navigator.share({
                title: document.title,
                text: document.title,
                url: vm.url
            }).then().catch();
        }
    },
    computed: {
        url() {
            const vm = this;
            return createShareUrlOfCalculator(
                {
                    baseUrl: process.env.APP_URL,
                    calculatorPath: vm.$route.path
                },
                vm.data,
                vm.willIncludeParams
            );
        },
        items() {
            const vm = this;
            return [
                {
                    url: `https://www.facebook.com/sharer/sharer.php?u=${vm.url}`,
                    title: "Facebook'ta paylaş",
                    color: "#1877f2",
                    icon: vm.icons.mdiFacebook
                },
                {
                    url: `https://twitter.com/intent/tweet?url=${vm.url}`,
                    title: "Twitter'da paylaş",
                    color: "#00acee",
                    icon: vm.icons.mdiTwitter
                },
                {
                    url: `https://wa.me/?text=${vm.url}`,
                    title: "WhatsApp ile gönder",
                    color: "#25d366",
                    icon: vm.icons.mdiWhatsapp
                },
                {
                    url: `https://telegram.me/share/url?url=${vm.url}&text=${document.title}`,
                    title: "Telegram ile gönder",
                    color: "#26A5E4",
                    icon: "ic-telegram.svg"
                },
                {
                    url: `https://www.reddit.com/submit?url=${vm.url}`,
                    title: "Reddit'te paylaş",
                    color: "#FF5700",
                    icon: vm.icons.mdiReddit
                },
                {
                    url: `mailto:?subject=${document.title}&body=${vm.url}`,
                    title: "E-posta gönder",
                    color: "#ecb064",
                    icon: vm.icons.mdiEmail
                }
            ];
        },
        isWebShareApiSupported() {
            return navigator.share;
        }
    }
};
</script>

<style scoped>
/deep/ svg {
    vertical-align: middle;
    width: 24px;
    height: 24px
}
</style>
