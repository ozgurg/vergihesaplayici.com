<template>
    <div
        class="buttons-container"
        role="region">
        <form-button
            :href="facebookShareUrl"
            aria-label="Hesaplayıcı bağlantısını Facebook'ta paylaş"
            color="brand-facebook"
            rel="nofollow noopener noreferrer"
            scale="medium"
            target="_blank"
            variant="filled">
            <svg-icon :icon="icon_facebook" />
        </form-button>
        <form-button
            :href="xShareUrl"
            aria-label="Hesaplayıcı bağlantısını X'te (Eski adıyla Twitter'da) paylaş"
            color="brand-x"
            rel="nofollow noopener noreferrer"
            scale="medium"
            target="_blank"
            variant="filled">
            <svg-icon :icon="icon_x" />
        </form-button>
        <form-button
            :href="whatsAppShareUrl"
            aria-label="Hesaplayıcı bağlantısını WhatsApp'ta paylaş"
            color="brand-whatsapp"
            rel="nofollow noopener noreferrer"
            scale="medium"
            target="_blank"
            variant="filled">
            <svg-icon :icon="icon_whatsapp" />
        </form-button>
        <form-button
            :href="telegramShareUrl"
            aria-label="Hesaplayıcı bağlantısını Telegram'da paylaş"
            color="brand-telegram"
            rel="nofollow noopener noreferrer"
            scale="medium"
            target="_blank"
            variant="filled">
            <svg-icon :icon="icon_telegram" />
        </form-button>
        <form-button
            :href="redditShareUrl"
            aria-label="Hesaplayıcı bağlantısını Reddit'te paylaş"
            color="brand-reddit"
            rel="nofollow noopener noreferrer"
            scale="medium"
            target="_blank"
            variant="filled">
            <svg-icon :icon="icon_reddit" />
        </form-button>
        <calculator-share-modal-link-tab-copy-button class="copy-button" />
        <calculator-share-modal-link-tab-other-button class="other-button" />
    </div>
</template>

<script lang="ts" setup>
import { icon_facebook, icon_reddit, icon_telegram, icon_whatsapp, icon_x } from "@/utils/icons.js";

export type Props = {
    url: URL;
}

const props = defineProps<Props>();

provide("url", props.url);

const facebookShareUrl = computed(() => createFacebookShareUrl(props.url));
const xShareUrl = computed(() => createXShareUrl(props.url));
const whatsAppShareUrl = computed(() => createWhatsAppShareUrl(props.url));
const telegramShareUrl = computed(() => createTelegramShareUrl(props.url));
const redditShareUrl = computed(() => createRedditShareUrl(props.url));
</script>

<style lang="scss" scoped>
.buttons-container {
    --_gap: calc(var(--vh-spacer) * .75);
    gap: var(--_gap);
    @include vh-media-breakpoint-down(md) {
        display: flex;
        flex-flow: row wrap;
        .form-button {
            flex: 1 1 calc((100% / 3) - var(--_gap));
            &.other-button {
                flex: 1
            }
        }
    }
    @include vh-media-breakpoint-up(md) {
        display: flex;
        flex-flow: row wrap;
        .form-button {
            flex: 1;
            &.other-button,
            &.copy-button {
                flex-basis: 2.25rem;
                inline-size: 2.25rem;
                min-inline-size: 2.25rem
            }
        }
    }
}
</style>
