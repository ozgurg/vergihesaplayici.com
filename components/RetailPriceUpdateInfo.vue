<template>
    <div class="small caption grey--text d-flex flex-column flex-lg-row justify-lg-space-between">
        <div class="text-start">
            Son güncellenme tarihi:
            {{ dateFormat(lastUpdatedDate) }}
        </div>

        <div class="text-start text-lg-end">
            Kaynak:
            <a
                :href="sourceUrl"
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
