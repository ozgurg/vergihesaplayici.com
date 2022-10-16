<template>
    <div>
        <v-row
            no-gutters=""
            class="mx-n2 my-n3">
            <template v-for="_item in items">
                <v-col
                    :key="_item.title"
                    class="px-2 py-3"
                    cols="4"
                    sm="2">
                    <v-btn
                        :href="_item.url"
                        :color="_item.color"
                        :title="_item.title"
                        rel="nofollow noopener noreferrer"
                        target="_blank"
                        block=""
                        rounded=""
                        large="">
                        <template v-if="isCustomIcon(_item)">
                            <!-- eslint-disable vue/no-v-html -->
                            <div v-html="loadCustomIconAsHtml(_item)" />
                        </template>
                        <template v-else>
                            <v-icon size="24">
                                {{ _item.icon }}
                            </v-icon>
                        </template>
                    </v-btn>
                </v-col>
            </template>
        </v-row>

        <div
            id="calculatorShareDialogCopyUrlContainer"
            class="mt-6">
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
            v-model="includeParams"
            hide-details=""
            class="mt-6"
            label="Hesaplayıcı parametrelerini dahil et" />
    </div>
</template>

<script>
import { mdiEmail, mdiFacebook, mdiReddit, mdiTwitter, mdiWhatsapp } from "@mdi/js";
import { createShareUrlOfCalculator } from "@/utils/create-share-url-of-calculator.js";
import {
    createEmailShareUrl,
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
        data: {
            type: Object,
            required: true
        }
    },
    methods: {
        isCustomIcon(item) {
            return item.icon.endsWith(".svg");
        },
        loadCustomIconAsHtml(item) {
            return require(`@/assets/img/${item.icon}?raw`);
        }
    },
    computed: {
        url() {
            const vm = this;
            return createShareUrlOfCalculator(
                vm.$route.path,
                vm.data,
                vm.includeParams
            );
        },
        items() {
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
                },
                {
                    url: createEmailShareUrl(vm.url, document.title),
                    title: "E-posta olarak gönder",
                    color: "#ecb064",
                    icon: mdiEmail
                }
            ];
        }
    }
};
</script>

<style scoped="">
/* For custom icons in social media sharing */
:deep(svg) {
    vertical-align: middle;
    width: 24px;
    height: 24px
}

/* For copy button in URL sharing */
:deep(.v-input__append-inner) {
    padding-left: 12px !important;
    margin-top: auto !important;
    margin-bottom: auto !important
}
</style>
