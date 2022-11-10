<template>
    <div>
        <v-row
            no-gutters=""
            class="ma-n2 ma-lg-n3 justify-center">
            <template v-for="_item in socialMediaSharingItems">
                <v-col
                    :key="_item.title"
                    cols="4"
                    md="2"
                    class="pa-2 pa-lg-3">
                    <v-btn
                        :href="_item.url"
                        :color="_item.color"
                        :title="_item.title"
                        rel="nofollow noopener noreferrer"
                        class="py-6"
                        target="_blank"
                        elevation="0"
                        block=""
                        rounded="">
                        <template v-if="isCustomIcon(_item)">
                            <!-- eslint-disable vue/no-v-html -->
                            <div v-html="loadCustomIconAsHtml(_item)" />
                        </template>
                        <template v-else>
                            <v-icon size="28">
                                {{ _item.icon }}
                            </v-icon>
                        </template>
                    </v-btn>
                </v-col>
            </template>

            <template v-if="isWebShareApiSupported">
                <v-col
                    cols="4"
                    md="2"
                    class="pa-2 pa-lg-3"
                    @click="shareViaWebShareApi()">
                    <v-btn
                        light=""
                        class="py-6"
                        elevation="0"
                        block=""
                        rounded="">
                        Diğer...
                    </v-btn>
                </v-col>
            </template>
        </v-row>

        <div
            id="calculatorShareDialogCopyUrlContainer"
            class="mt-8">
            <v-text-field
                :value="url"
                hide-details=""
                outlined=""
                readonly="">
                <template #append>
                    <div class="py-2">
                        <v-divider vertical="" />
                    </div>
                    <CopyButton
                        :value-to-copy="url"
                        container-selector="#calculatorShareDialogCopyUrlContainer" />
                </template>
            </v-text-field>
        </div>

        <v-checkbox
            v-if="Object.entries($route.query).length > 0"
            v-model="includeParams"
            hide-details=""
            class="mt-8"
            label="Hesaplayıcı parametrelerini dahil et" />
    </div>
</template>

<script>
import { mdiFacebook, mdiReddit, mdiTwitter, mdiWhatsapp } from "@mdi/js";
import { createShareUrlOfCalculator } from "@/utils/create-share-url-of-calculator.js";
import {
    createFacebookShareUrl,
    createRedditShareUrl,
    createTelegramShareUrl,
    createTwitterShareUrl,
    createWhatsAppShareUrl
} from "@/utils/create-social-media-share-url.js";

export default {
    data: () => ({
        includeParams: true
    }),
    props: {
        form: {
            type: Object,
            required: true
        }
    },
    methods: {
        async shareViaWebShareApi() {
            const vm = this;
            try {
                await navigator.share({
                    title: document.title,
                    text: document.title,
                    url: vm.url
                });
            } catch {
            }
        },
        isCustomIcon(item) {
            return item.icon.endsWith(".svg");
        },
        loadCustomIconAsHtml(item) {
            return require(`@/assets/img/${item.icon}?raw`);
        }
    },
    computed: {
        isWebShareApiSupported() {
            return navigator.share;
        },
        url() {
            const vm = this;
            return createShareUrlOfCalculator(
                vm.$route.path,
                vm.form,
                vm.includeParams
            );
        },
        socialMediaSharingItems() {
            const vm = this;
            return [
                {
                    url: createFacebookShareUrl(vm.url, document.title),
                    title: "Facebook'ta paylaş",
                    color: "#1877f2",
                    icon: mdiFacebook
                },
                {
                    url: createTwitterShareUrl(vm.url, document.title),
                    title: "Twitter'da paylaş",
                    color: "#00acee",
                    icon: mdiTwitter
                },
                {
                    url: createWhatsAppShareUrl(vm.url, document.title),
                    title: "WhatsApp ile gönder",
                    color: "#25d366",
                    icon: mdiWhatsapp
                },
                {
                    url: createTelegramShareUrl(vm.url, document.title),
                    title: "Telegram ile gönder",
                    color: "#26A5E4",
                    icon: "ic-telegram.svg"
                },
                {
                    url: createRedditShareUrl(vm.url, document.title),
                    title: "Reddit'te paylaş",
                    color: "#FF5700",
                    icon: mdiReddit
                }
            ];
        }
    }
};
</script>

<style scoped="">
/* Custom icons for social media sharing */
:deep(svg) {
    vertical-align: middle;
    width: 28px;
    height: 28px
}

/* Copy button for URL sharing */
:deep(.v-input__append-inner) {
    padding-left: 12px !important;
    margin-top: auto !important;
    margin-bottom: auto !important
}
</style>
