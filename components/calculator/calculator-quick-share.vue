<template>
    <div class="calculator-quick-share grey darken-4">
        <template v-for="_item in items">
            <v-btn
                :key="_item.title"
                :href="_item.url"
                :color="_item.color"
                :title="_item.title"
                elevation="0"
                rel="nofollow noopener noreferrer"
                target="_blank">
                <vh-icon
                    :icon="_item.icon"
                    :size="28" />
            </v-btn>
        </template>

        <v-btn
            elevation="0"
            light=""
            @click="emitOtherClicked()">
            Diğer…
        </v-btn>
    </div>
</template>

<script>
import { mdiFacebook, mdiWhatsapp } from "@mdi/js";
import {
    createFacebookShareUrl,
    createWhatsAppShareUrl,
    createXShareUrl
} from "@/utils/create-social-media-share-url.js";
import { createShareUrlOfCalculator } from "@/utils/create-share-url-of-calculator.js";

export default {
    emits: ["click:other"],
    props: {
        queryString: {
            type: Object,
            default: () => {
            }
        }
    },
    methods: {
        emitOtherClicked() {
            const vm = this;
            vm.$emit("click:other");
        }
    },
    computed: {
        url() {
            const vm = this;
            return createShareUrlOfCalculator(vm.$route.path, vm.queryString, true);
        },
        items() {
            const vm = this;
            return [
                {
                    url: createFacebookShareUrl(vm.url),
                    title: "Facebook'ta paylaş",
                    color: "#0566ff",
                    icon: mdiFacebook
                },
                {
                    url: createXShareUrl(vm.url, ""),
                    title: "X'de paylaş",
                    color: "#000",
                    icon: "x.svg"
                },
                {
                    url: createWhatsAppShareUrl(vm.url),
                    title: "WhatsApp ile gönder",
                    color: "#25d366",
                    icon: mdiWhatsapp
                }
            ];
        }
    }
};
</script>

<style lang="scss" scoped="">
$padding: .625rem;
$button-border-radius: .5rem;
$button-border-radius-large: 1rem;

.calculator-quick-share {
    display: flex;
    flex-flow: row nowrap;
    gap: .5rem;
    border-radius: calc(#{$button-border-radius-large} + #{$padding});
    padding: $padding;
    .v-btn {
        flex: 1;
        border-radius: $button-border-radius;
        &:first-child {
            border-radius: $button-border-radius-large $button-border-radius $button-border-radius $button-border-radius-large
        }
        &:last-child {
            border-radius: $button-border-radius $button-border-radius-large $button-border-radius-large $button-border-radius
        }
    }
}
</style>
