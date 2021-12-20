<template>
    <div class="pa-8">
        <v-row class="mb-2">
            <v-col
                v-for="(item, key) in items"
                :key="key"
                cols="6"
                sm="2">
                <v-tooltip bottom="">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            v-bind="attrs"
                            v-on="on"
                            :href="item.url"
                            :color="item.color"
                            link=""
                            rel="nofollow noopener noreferrer"
                            target="_blank"
                            block=""
                            elevation="0"
                            rounded=""
                            x-large="">
                            <template v-if="item.icon.endsWith('.svg')">
                                <img
                                    :src="require(`@/assets/img/${item.icon}`)"
                                    :alt="item.title"
                                    width="32"
                                    height="32"
                                    loading="lazy" />
                            </template>
                            <template v-else>
                                <v-icon size="32">{{ item.icon }}</v-icon>
                            </template>
                        </v-btn>
                    </template>

                    <span>{{ item.title }}</span>
                </v-tooltip>
            </v-col>

            <v-col
                v-if="isWebShareApiSupported"
                cols="12">
                <v-btn
                    @click="share()"
                    color="white"
                    light=""
                    block=""
                    elevation="0"
                    rounded=""
                    large="">
                    Diğer...
                </v-btn>
            </v-col>
        </v-row>

        <v-checkbox
            v-model="includeCalculatorParams"
            hide-details=""
            label="Hesaplayıcı parametrelerini dahil et" />
    </div>
</template>

<script>
import querystring from "querystring";

export default {
    data: () => ({
        includeCalculatorParams: true
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

            if (vm.includeCalculatorParams) {
                return `${process.env.APP_URL}${vm.$route.path}?${querystring.stringify(vm.data)}`;
            }

            return `${process.env.APP_URL}${vm.$route.path}`;
        },
        items() {
            const vm = this;
            return [
                {
                    url: `https://www.facebook.com/sharer/sharer.php?u=${vm.url}`,
                    title: "Facebook'ta paylaş",
                    color: "#1877f2",
                    icon: "mdi-facebook"
                },
                {
                    url: `https://twitter.com/intent/tweet?url=${vm.url}`,
                    title: "Twitter'da paylaş",
                    color: "#00acee",
                    icon: "mdi-twitter"
                },
                {
                    url: `https://wa.me/?text=${vm.url}`,
                    title: "WhatsApp ile gönder",
                    color: "#25d366",
                    icon: "mdi-whatsapp"
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
                    icon: "mdi-reddit"
                },
                {
                    url: `mailto:?subject=${document.title}&body=${vm.url}`,
                    title: "E-posta gönder",
                    color: "#ffb300",
                    icon: "mdi-email"
                }
            ];
        },
        isWebShareApiSupported() {
            return navigator.share;
        }
    }
};
</script>
