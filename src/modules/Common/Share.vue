<template>
	<b-field expanded=""
			 custom-class="is-small"
			 label="Bu hesaplamayı paylaşın">
		<b-field>
			<b-input :value="generateUrl"
					 size="is-small"
					 readonly=""
					 rounded=""
					 id="shareUrl"
					 expanded="" />
			<div class="control">
				<b-button rounded=""
						  id="copy"
						  data-clipboard-target="#shareUrl"
						  size="is-small">
					Kopyala
				</b-button>
			</div>
		</b-field>
	</b-field>
</template>

<script>
import ClipboardJS from "clipboard";
import querystring from "querystring";


export default {
	name: "Share",
	props: {
		data: {
			type: Object,
			required: true
		}
	},
	computed: {
		generateUrl() {
			const vm = this;

			return `${process.env.VUE_APP_BASE_URL}${vm.$route.path}?${querystring.stringify(vm.data)}`;
		}
	},
	created() {
		new ClipboardJS("#copy");
	}
};
</script>