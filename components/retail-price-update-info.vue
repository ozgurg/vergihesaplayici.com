<template>
    <div class="text--secondary subtitle-2">
        <p class="mb-0">
            Son güncellenme: {{ formattedUpdatedDate }}
        </p>
        <p class="mb-0">
            Kaynak: <a
            :href="sourceUrl"
            class="text--secondary"
            target="_blank"
            rel="nofollow noopener noreferrer">{{ domain }}</a>
        </p>
    </div>
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

const formattedUpdatedDate = dateFormat(props.lastUpdatedDate);
const domain = getDomainFromUrl(props.sourceUrl);
</script>
