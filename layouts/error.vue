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
                poster="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                width="256"
                height="256"
                autoplay=""
                loop=""
                muted=""
                playsinline=""
                preload="none">
                <source
                    src="/video/kemal-sunal.mp4"
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
import { buildHeadTags } from "~/utils/build-head-tags.js";

export default {
    head() {
        const vm = this;
        return buildHeadTags({
            title: vm.title,
            description: vm.message
        });
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
