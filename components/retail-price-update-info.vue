<template>
    <p class="text--secondary subtitle-2 mb-0 text-balance">
        Piyasa fiyatı <b>{{ formattedDate }}</b> tarihinde <a
        :href="sourceUrl"
        class="text--secondary"
        target="_blank"
        rel="nofollow noopener noreferrer">{{ domain }}</a>
        sitesinden elle güncellenmiştir. Güncel fiyat farklı olabilir.
    </p>
</template>

<script setup="">
import { dateFormat } from "@/utils/formatter.js";
import { getDomainFromUrl } from "@/utils/get-domain-from-url.js";

const props = defineProps({
    lastUpdatedDate: {
        type: Date,
        required: true
    },
    sourceUrl: {
        type: String,
        required: true
    }
});

const domain = getDomainFromUrl(props.sourceUrl);
const formattedDate = dateFormat(props.lastUpdatedDate);
</script>
