<template>
	<div v-bind="$attrs">
		<h3 class="mb-2">Paylaş</h3>
		<v-btn-toggle>
			<v-btn :href="facebookShareUrl"
				   link=""
				   rel="nofollow noopener noreferrer"
				   target="_blank"
				   title="Facebook'ta paylaş">
				<v-icon color="#1877f2">mdi-facebook</v-icon>
			</v-btn>

			<v-btn :href="twitterShareUrl"
				   link=""
				   rel="nofollow noopener noreferrer"
				   target="_blank"
				   title="Twitter'ta paylaş">
				<v-icon color="#00acee">mdi-twitter</v-icon>
			</v-btn>

			<v-btn :href="whatsAppShareUrl"
				   link=""
				   rel="nofollow noopener noreferrer"
				   target="_blank"
				   title="WhatsApp ile gönder">
				<v-icon color="#25d366">mdi-whatsapp</v-icon>
			</v-btn>

			<v-btn @click="copy(url)"
				   title="Sayfa bağlantısını kopyala">
				<v-icon v-if="!isUrlCopied" color="primary">mdi-link</v-icon>
				<v-icon v-else color="primary">mdi-check</v-icon>
			</v-btn>
		</v-btn-toggle>
	</div>
</template>

<script>
import querystring from "querystring";

export default {
	name: "Share",
	data: () => ({
		isUrlCopied: false
	}),
	props: {
		data: {
			type: Object,
			required: true
		}
	},
	methods: {
		copy(text) {
			const vm = this;

			vm.isUrlCopied = true;

			setTimeout(() => {
				vm.isUrlCopied = false;
			}, 1000);

			vm.$copyText(text);
		}
	},
	computed: {
		url() {
			const vm = this;
			return `${process.env.BASE_URL}${vm.$route.path}?${querystring.stringify(vm.data)}`;
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
		}
	}
};
</script>