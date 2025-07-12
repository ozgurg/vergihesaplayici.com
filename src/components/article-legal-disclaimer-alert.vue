<template>
    <alert
        :color="COLOR"
        data-nosnippet="">
        <!-- `data-nosnippet`: https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag -->
        <p><b>Önemli uyarı</b></p>
        <p>Bu sitede yer alan içerikler <u>siteyi dolu gösterme amacıyla</u> eklenmiş, <u>doğruluğu ve güncelliği teyit edilmemiştir</u>. Herhangi bir konuda danışmanlık vasfı taşımamakta ve <u>tavsiye sunmamaktadır</u>. Bu bilgiler kullanılarak alınan kararlardan doğabilecek herhangi bir sonuçtan sorumluluk kabul edilmez. Kesin ve güncel bilgiler için yetkili mercilere veya uzman danışmanlara başvurmanız gerekir.</p>
    </alert>
</template>

<script lang="ts" setup>
import type { Props as AlertProps } from "@/components/common/alert.vue";

export type Props = AlertProps;

defineProps<Props>();

const COLOR = "warning";
</script>

<style lang="scss" scoped>
.alert {
    margin-block-end: calc(var(--vh-spacer) * 2);
    p:not(:last-child) {
        margin-block-end: 0
    }
}
</style>
