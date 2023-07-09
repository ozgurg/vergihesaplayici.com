<template>
    <div>
        <Heading1>
            Hata falan mı oldu, bir şey oldu sanki…
        </Heading1>

        <Heading3 class="mb-8">
            …ama bu aramızda kalabilir.
        </Heading3>

        <video
            class="rounded"
            width="250"
            height="250"
            autoplay=""
            loop=""
            muted=""
            playsinline=""
            preload="none">
            <source
                :src="require('@/assets/video/kemal-sunal.mp4')"
                type="video/mp4" />
        </video>

        <v-divider class="my-16" />

        <Heading3 class="mb-8">
            Kalmasın diyorsan al bunu yay:
        </Heading3>

        <v-alert
            :icon="false"
            text=""
            type="error">
            {{ message }}
        </v-alert>
    </div>
</template>

<script>
export default {
    head() {
        const vm = this;
        return {
            title: vm.title,
            meta: [
                {
                    hid: "title",
                    name: "title",
                    content: vm.title
                }
            ]
        };
    },
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

            return "Bir hata oluştu";
        },
        message() {
            const vm = this;

            if (vm.error.statusCode === 404) {
                return "Böyle bir sayfa yok, çıkar onu aklından";
            }

            return vm.error.message;
        }
    }
};
</script>
