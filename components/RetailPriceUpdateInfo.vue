<template>
    <div class="small caption grey--text">
        <div>
            Son güncellenme tarihi:
            {{ dateFormat(lastUpdatedDate) }}
        </div>

        <div>
            Kaynak:
            <a
                :href="sourceUrl"
                target="_blank"
                rel="nofollow noopener noreferrer"
                class="grey--text text-decoration-underline">
                {{ getDomainFromUrl(sourceUrl) }}
            </a>
        </div>
    </div>
</template>

<script>
import { dateFormat } from "@/utils/formatter.js";
import { getDomainFromUrl } from "@/utils/get-domain-from-url.js";

export default {
    props: {
        lastUpdatedDate: {
            type: Date,
            required: true
        },
        sourceUrl: {
            type: String,
            required: true
        }
    },
    methods: {
        dateFormat,
        getDomainFromUrl
    }
};
</script>
