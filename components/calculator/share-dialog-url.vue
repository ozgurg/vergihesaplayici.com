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
                        <vh-icon
                            :icon="_item.icon"
                            :size="28" />
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
                        Diğer…
                    </v-btn>
                </v-col>
            </template>
        </v-row>

        <div class="mt-8">
            <v-text-field
                :value="url"
                hide-details=""
                outlined=""
                readonly="">
                <template #append>
                    <v-divider
                        class="my-2 me-3"
                        vertical="" />
                    <lazy-copy-button :value-to-copy="url" />
                </template>
            </v-text-field>
        </div>

        <v-checkbox
            v-if="hasQuery"
            v-model="includeParams"
            hide-details=""
            class="mt-8"
            label="Hesaplayıcı parametrelerini dahil et" />
    </div>
</template>

<script>
import { mdiFacebook, mdiReddit, mdiWhatsapp } from "@mdi/js";
import { createShareUrlOfCalculator } from "@/utils/create-share-url-of-calculator.js";
import {
    createFacebookShareUrl,
    createRedditShareUrl,
    createTelegramShareUrl,
    createXShareUrl,
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
        }
    },
    computed: {
        hasQuery() {
            const vm = this;
            return Object.entries(vm.$route.query).length > 0;
        },
        isWebShareApiSupported() {
            return navigator.share;
        },
        url() {
            const vm = this;
            return createShareUrlOfCalculator(
                vm.$route.path,
                vm.form,
                vm.includeParams && vm.hasQuery === true
            );
        },
        socialMediaSharingItems() {
            const vm = this;
            return [
                {
                    url: createFacebookShareUrl(vm.url),
                    title: "Facebook'ta paylaş",
                    color: "#1877f2",
                    icon: mdiFacebook
                },
                {
                    url: createXShareUrl(vm.url, document.title),
                    title: "X'de paylaş",
                    color: "#000",
                    icon: "x.svg"
                },
                {
                    url: createWhatsAppShareUrl(vm.url),
                    title: "WhatsApp ile gönder",
                    color: "#25d366",
                    icon: mdiWhatsapp
                },
                {
                    url: createTelegramShareUrl(vm.url, document.title),
                    title: "Telegram ile gönder",
                    color: "#26A5E4",
                    icon: "telegram.svg"
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

<style lang="scss" scoped="">
:deep(.v-input__append-inner) {
    padding-inline-start: .75rem !important;
    margin-block: auto !important
}
</style>
