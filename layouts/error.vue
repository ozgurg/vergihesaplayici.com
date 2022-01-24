<template>
	<div>
        <AppHeader>{{ title }}</AppHeader>

        <v-alert
            border="left"
            type="error">
            {{ message }}
        </v-alert>
    </div>
</template>

<script>
export default {
    props: {
        error: {
            type: Object,
            default: null
        }
    },
    computed: {
        title() {
            const vm = this;

            if (vm.error.statusCode === 404) {
                return "Sayfa bulunamadı";
            }

            return "Bir şey oldu";
        },
        message() {
            const vm = this;

            if (vm.error.statusCode === 404) {
                return "Böyle bir sayfa yok, çıkar onu aklından";
            }

            return vm.error.message;
        }
    },
    head() {
        const vm = this;
        return {
            title: vm.title,
            meta: [
                { hid: "title", name: "title", content: vm.title }
            ]
        };
    }
};
</script>
