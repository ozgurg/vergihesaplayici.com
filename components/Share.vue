<template>
	<div v-bind="$attrs">
		<h3 class="mb-2">Paylaş</h3>
		<v-btn-toggle>
			<v-tooltip bottom="">
				<template v-slot:activator="{ on, attrs }">
					<v-btn v-bind="attrs"
						   v-on="on"
						   :href="facebookShareUrl"
						   link=""
						   rel="nofollow noopener noreferrer"
						   target="_blank"
						   aria-label="Facebook'ta paylaş">
						<v-icon color="#1877f2">mdi-facebook</v-icon>
					</v-btn>
				</template>
				<span>Facebook'ta paylaş</span>
			</v-tooltip>

			<v-tooltip bottom="">
				<template v-slot:activator="{ on, attrs }">
					<v-btn v-bind="attrs"
						   v-on="on"
						   :href="twitterShareUrl"
						   link=""
						   rel="nofollow noopener noreferrer"
						   target="_blank"
						   aria-label="Twitter'ta paylaş">
						<v-icon color="#00acee">mdi-twitter</v-icon>
					</v-btn>
				</template>
				<span>Twitter'ta paylaş</span>
			</v-tooltip>

			<v-tooltip bottom="">
				<template v-slot:activator="{ on, attrs }">
					<v-btn v-bind="attrs"
						   v-on="on"
						   :href="whatsAppShareUrl"
						   link=""
						   rel="nofollow noopener noreferrer"
						   target="_blank"
						   aria-label="WhatsApp ile gönder">
						<v-icon color="#25d366">mdi-whatsapp</v-icon>
					</v-btn>
				</template>
				<span>WhatsApp ile gönder</span>
			</v-tooltip>

			<v-tooltip bottom="">
				<template v-slot:activator="{ on, attrs }">
					<v-btn v-bind="attrs"
						   v-on="on"
						   @click="copy(url)"
						   aria-label="Sayfa bağlantısını kopyala">
						<v-icon color="primary">mdi-link</v-icon>
					</v-btn>
				</template>
				<span>Sayfa bağlantısını kopyala</span>
			</v-tooltip>
		</v-btn-toggle>
	</div>
</template>

<script>
import querystring from "querystring";

export default {
	name: "Share",
	props: {
		data: {
			type: Object,
			required: true
		}
	},
	methods: {
		copy(text) {
			const vm = this;

			vm.$copyText(text);

			vm.$store.set("ui/snackbar@isVisible", true);
			vm.$store.set("ui/snackbar@text", "Panoya kopyalandı.");

			setTimeout(() => {
				vm.$store.set("ui/snackbar@isVisible", false);
			}, vm.$store.get("ui/snackbar@timeout"));
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