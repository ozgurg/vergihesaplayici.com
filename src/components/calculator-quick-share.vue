<template>
    <div
        :aria-labelledby="ARIA_LABELLEDBY"
        class="calculator-quick-share"
        role="region">
        <span :id="ARIA_LABELLEDBY">Paylaş</span>
        <div role="group">
            <form-button
                :href="facebookShareUrl"
                aria-label="Hesaplayıcı bağlantısını Facebook'ta paylaş"
                color="brand-facebook"
                rel="nofollow noopener noreferrer"
                scale="small"
                target="_blank"
                variant="filled">
                <svg-icon :icon="icon_facebook" />
            </form-button>
            <form-button
                :href="xShareUrl"
                aria-label="Hesaplayıcı bağlantısını X'te -eski adıyla Twitter'da- paylaş"
                color="brand-x"
                rel="nofollow noopener noreferrer"
                scale="small"
                target="_blank"
                variant="filled">
                <svg-icon :icon="icon_x" />
            </form-button>
            <form-button
                :href="whatsAppShareUrl"
                aria-label="Hesaplayıcı bağlantısını WhatsApp'ta paylaş"
                color="brand-whatsapp"
                rel="nofollow noopener noreferrer"
                scale="small"
                target="_blank"
                variant="filled">
                <svg-icon :icon="icon_whatsapp" />
            </form-button>
            <form-button
                @click="emit('click:other')"
                aria-label="Diğer paylaşım seçeneklerini aç"
                color="light"
                scale="small"
                type="button"
                variant="outlined">
                Diğer…
            </form-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_div } from "@/types/html.js";
import { icon_facebook, icon_whatsapp, icon_x } from "@/utils/icons.js";

export type Events = (event: "click:other") => void;

export type Props = {
    url: URL;
} & /* @vue-ignore */ Partial<HtmlAttrs_div>;

const props = defineProps<Props>();
const emit = defineEmits<Events>();

const ARIA_LABELLEDBY = `calculator-quick-share-${useId()}`;

const facebookShareUrl = createFacebookShareUrl(props.url);
const xShareUrl = createXShareUrl(props.url);
const whatsAppShareUrl = createWhatsAppShareUrl(props.url);
</script>

<style lang="scss" scoped>
.calculator-quick-share {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--vh-spacer);
    & > div {
        display: inline-flex;
        align-items: center;
        flex-direction: row;
        gap: calc(var(--vh-spacer) * .5);
        .form-button {
            flex: 1
        }
    }
}
</style>
