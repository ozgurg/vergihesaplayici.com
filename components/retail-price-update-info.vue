<template>
    <v-tooltip
        right=""
        max-width="224">
        <template #activator="{ on, attrs }">
            <v-btn
                v-bind="attrs"
                :href="sourceUrl"
                target="_blank"
                rel="nofollow noopener noreferrer"
                plain=""
                class="mx-n3"
                v-on="on">
                <span>{{ relativeFormattedDate }} güncellendi</span>
                <v-icon
                    size="16"
                    right="">
                    {{ mdiOpenInNew }}
                </v-icon>
            </v-btn>
        </template>
        <span>
            Piyasa fiyatı <b>{{ formattedDate }}</b> tarihinde <b>{{ domain }}</b> sitesinden elle güncellenmiştir.
            <br />
            Güncel fiyat farklı olabilir.
        </span>
    </v-tooltip>
</template>

<script setup="">
import { mdiOpenInNew } from "@mdi/js";
import { dateFormat, relativeDateFormat } from "@/utils/formatter.js";
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
const relativeFormattedDate = relativeDateFormat(props.lastUpdatedDate);
</script>
