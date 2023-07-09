<template>
    <v-tooltip
        right=""
        max-width="240">
        <template #activator="{ on, attrs }">
            <v-btn
                v-bind="attrs"
                :href="sourceUrl"
                target="_blank"
                plain=""
                rel="nofollow noopener noreferrer"
                class="mx-n3"
                v-on="on">
                {{ relativeFormattedDate }} güncellendi
                <v-icon
                    size="16"
                    right="">
                    {{ icons.mdiOpenInNew }}
                </v-icon>
            </v-btn>
        </template>
        <span>
            Piyasa fiyatı <b>{{ formattedDate }}</b> tarihinde <b>{{ domain }}</b> adresinden alınmıştır. Şu anki fiyat farklı olabilir.
        </span>
    </v-tooltip>
</template>

<script>
import { mdiOpenInNew } from "@mdi/js";
import { dateFormat, relativeDateFormat } from "@/utils/formatter.js";
import { getDomainFromUrl } from "@/utils/get-domain-from-url.js";

export default {
    data: () => ({
        icons: {
            mdiOpenInNew
        }
    }),
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
    computed: {
        domain() {
            const vm = this;
            return getDomainFromUrl(vm.sourceUrl);
        },
        formattedDate() {
            const vm = this;
            return dateFormat(vm.lastUpdatedDate);
        },
        relativeFormattedDate() {
            const vm = this;
            return relativeDateFormat(vm.lastUpdatedDate);
        }
    }
};
</script>
