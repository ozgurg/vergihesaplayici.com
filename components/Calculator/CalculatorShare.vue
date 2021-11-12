<template>
	<div v-bind="$attrs">
        <h3 class="mb-2">Paylaş</h3>

        <v-btn-toggle>
            <v-tooltip
                allow-overflow=""
                bottom="">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        v-bind="attrs"
                        v-on="on"
                        :href="facebookShareUrl"
                        link=""
                        rel="nofollow noopener noreferrer"
                        target="_blank">
                        <v-icon color="#1877f2">mdi-facebook</v-icon>
                    </v-btn>
                </template>
                <span>Facebook'ta paylaş</span>
            </v-tooltip>

            <v-tooltip
                allow-overflow=""
                bottom="">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        v-bind="attrs"
                        v-on="on"
                        :href="twitterShareUrl"
                        link=""
                        rel="nofollow noopener noreferrer"
                        target="_blank">
                        <v-icon color="#00acee">mdi-twitter</v-icon>
                    </v-btn>
                </template>
                <span>Twitter'ta paylaş</span>
            </v-tooltip>

            <v-tooltip
                allow-overflow=""
                bottom="">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        v-bind="attrs"
                        v-on="on"
                        :href="whatsAppShareUrl"
                        link=""
                        rel="nofollow noopener noreferrer"
                        target="_blank">
                        <v-icon color="#25d366">mdi-whatsapp</v-icon>
                    </v-btn>
                </template>
                <span>WhatsApp ile gönder</span>
            </v-tooltip>

            <v-tooltip
                allow-overflow=""
                bottom="">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        v-bind="attrs"
                        v-on="on"
                        :href="telegramShareUrl"
                        link=""
                        rel="nofollow noopener noreferrer"
                        target="_blank">
                        <img
                            :src="require('@/assets/img/ic-telegram.svg')"
                            width="24"
                            height="24"
                            loading="lazy"
                            alt="Telegram ile gönder" />
                    </v-btn>
                </template>
                <span>Telegram ile gönder</span>
            </v-tooltip>

            <CalculatorShareCopyButton :value="url" />
        </v-btn-toggle>
	</div>
</template>

<script>
import querystring from "querystring";

export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    computed: {
        url() {
            const vm = this;
            return `${process.env.APP_URL}${vm.$route.path}?${querystring.stringify(vm.data)}`;
        },
        facebookShareUrl() {
            const vm = this;
            return `https://www.facebook.com/sharer/sharer.php?u=${vm.url}`;
        },
        twitterShareUrl() {
            const vm = this;
            return `https://twitter.com/intent/tweet?url=${vm.url}`;
        },
        whatsAppShareUrl() {
            const vm = this;
            return `https://wa.me/?text=${vm.url}`;
        },
        telegramShareUrl() {
            const vm = this;
            return `https://telegram.me/share/url?url=${vm.url}&text=${document.title}`;
        }
    }
};
</script>

<style scoped="">
/* Remove active background from the buttons */
/deep/ .v-btn--active::before {
    content: none
}
</style>
