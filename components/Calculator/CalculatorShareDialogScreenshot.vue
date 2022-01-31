<template>
    <div>
        <div
            ref="table"
            class="screenshot">
            <v-simple-table>
                <tbody>
                <tr>
                    <td class="screenshot__header primary text-center">
                        <span class="screenshot__header">{{ title }}</span>
                    </td>
                </tr>

                <template v-for="item in data.input">
                    <tr :key="item.key">
                        <td class="py-2">
                            <div class="d-flex justify-space-between align-center">
                                <div>
                                    {{ item.key }}
                                </div>
                                <div class="text-end ps-4">
                                    {{ item.value }}
                                </div>
                            </div>
                        </td>
                    </tr>
                </template>

                <tr>
                    <td class="text-uppercase grey darken-3 text-center">
                        Sonuçlar
                    </td>
                </tr>

                <template v-for="item in data.output">
                    <tr :key="item.key">
                        <td class="py-2">
                            <div class="d-flex justify-space-between align-center">
                                <div>
                                    {{ item.key }}
                                </div>
                                <div class="text-end ps-4">
                                    {{ item.value }}
                                </div>
                            </div>
                        </td>
                    </tr>
                </template>

                <tr>
                    <td class="text-center pt-2 pb-2 px-1">
                        <div class="white--text font-weight-bold mb-2">
                            vergihesaplayici.com v{{ version }}
                        </div>

                        <div class="grey--text caption">
                            {{ date.toLocaleString("tr-TR") }}
                        </div>
                    </td>
                </tr>
                </tbody>
            </v-simple-table>
        </div>

        <v-divider class="my-6" />

        <div class="text-center">
            <div class="position-relative d-inline-block">
                <v-btn
                    @click="download()"
                    outlined=""
                    color="primary">
                    <v-icon left="">
                        mdi-download
                    </v-icon>
                    İndir
                </v-btn>

                <v-btn
                    @click="copy()"
                    outlined=""
                    color="primary">
                    <v-icon left="">
                        mdi-content-copy
                    </v-icon>
                    Kopyala
                </v-btn>

                <v-fade-transition>
                    <v-overlay
                        v-if="isDownloaded || isCopied || isLoading"
                        :value="true"
                        absolute=""
                        opacity="1"
                        class="rounded"
                        style="width:100%">
                        <v-alert
                            color="primary"
                            text=""
                            outlined=""
                            class="pa-0 d-flex align-center flex-row justify-center w-100 h-100">
                            <v-progress-circular
                                v-if="isLoading"
                                indeterminate=""
                                size="24"
                                width="2"
                                color="primary" />

                            <template v-else>
                                <div class="text-uppercase d-flex align-center">
                                    <v-icon
                                        left=""
                                        color="primary">
                                        mdi-check
                                    </v-icon>

                                    <span v-if="isDownloaded" class="screenshot__success-text">İndirildi</span>
                                    <span v-else-if="isCopied" class="screenshot__success-text">Kopyalandı</span>
                                </div>
                            </template>
                        </v-alert>
                    </v-overlay>
                </v-fade-transition>
            </div>
        </div>
    </div>
</template>

<script>
import JsFileDownloader from "js-file-downloader";
import { version } from "@/package.json";

export default {
    data: () => ({
        version,
        date: new Date(),
        isLoading: false,
        isDownloaded: false,
        isCopied: false
    }),
    props: {
        data: {
            type: Object,
            required: true
        },
        title: {
            type: String,
            required: true
        }
    },
    methods: {
        async captureScreenshot() {
            const vm = this;
            return await vm.$html2canvas(vm.$refs.table, {
                logging: false,
                width: 342,
                backgroundColor: "#fff",
                type: "dataURL"
            });
        },
        async copy() {
            const vm = this;

            vm.isLoading = true;

            try {
                const screenshot = await vm.captureScreenshot();

                await navigator.permissions.query({
                    name: "clipboard-write",
                    allowWithoutGesture: false
                });

                const screenshotToBlog = await fetch(screenshot).then(response => response.blob());

                await window.navigator.clipboard.write([
                    new window.ClipboardItem({
                        "image/png": screenshotToBlog
                    })
                ]);

                setTimeout(() => {
                    vm.isLoading = false;

                    vm.isCopied = true;
                    setTimeout(() => {
                        vm.isCopied = false;
                    }, 1500);
                }, 375);
            } catch (e) {
                console.error(e);

                if (confirm("Kullandığınız tarayıcı bu özelliği desteklemiyor. Kopyalamak yerine indirmek ister misiniz")) {
                    await vm.download();
                } else {
                    vm.isLoading = false;
                }
            }
        },
        async download() {
            const vm = this;

            vm.isLoading = true;

            try {
                const screenshot = await vm.captureScreenshot();

                await new JsFileDownloader({
                    url: screenshot,
                    contentType: "image/png",
                    nameCallback: () => `vergihesaplayici-${vm.date.getTime()}.png`
                });

                setTimeout(() => {
                    vm.isLoading = false;

                    vm.isDownloaded = true;
                    setTimeout(() => {
                        vm.isDownloaded = false;
                    }, 1500);
                }, 375);
            } catch (e) {
                console.error(e);

                alert("Bir hata oluştu.");

                vm.isLoading = false;
            }
        }
    }
};
</script>

<style lang="scss" scoped="">
.screenshot {
    position: relative;
    width: 342px;
    margin: 0 auto;
    padding: 1px;
    pointer-events: none;
    background: #fff;

    &__header {
        letter-spacing: -.25px;
        color: #00262C;
        font-size: 19px;
        font-weight: 500
    }

    &__success-text {
        // Same as button
        font-size: .875rem;
        font-weight: 500
    }
}
</style>

<style scoped="">
/deep/ .v-overlay__content {
    width: 100%;
    height: 100%
}
</style>
