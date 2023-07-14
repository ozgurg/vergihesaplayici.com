<template>
    <div>
        <Heading1 class="mt-lg-12">
            Hata falan mı oldu, bir şey oldu sanki…
        </Heading1>

        <InnerContainer>
            <p class="mb-8 text-body-1">
                …ama bu aramızda kalabilir.
            </p>

            <video
                class="rounded mb-12"
                width="256"
                height="256"
                autoplay=""
                loop=""
                muted=""
                playsinline=""
                preload="none">
                <source
                    src="@/assets/video/kemal-sunal.mp4"
                    type="video/mp4" />
            </video>

            <p class="text-body-1">
                Kalmasın diyorsan hatalarımı yüzüme vurmak için bunu kullanabilirsin:
            </p>

            <v-alert
                :icon="false"
                text=""
                type="error">
                {{ message }}
            </v-alert>
        </InnerContainer>
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
                return "Böyle bir sayfa yok, çıkar onu aklından.";
            }

            return vm.error.message;
        }
    }
};
</script>
