<template>
    <div>
        <div
            ref="table"
            class="screenshot">
            <v-simple-table>
                <template #default>
                    <tbody>
                    <tr>
                        <td class="screenshot__header primary black--text text-center" colspan="2">
                            <span class="screenshot__header">{{ title }}</span>
                        </td>
                    </tr>

                    <template v-for="(item, index) in data.input">
                        <tr :key="index">
                            <td class="py-2">
                                {{ item.key }}
                            </td>
                            <td class="py-2 text-right">
                                {{ item.value }}
                            </td>
                        </tr>
                    </template>

                    <tr>
                        <td class="text-uppercase grey darken-3 text-center" colspan="2">
                            Sonuçlar
                        </td>
                    </tr>

                    <template v-for="(item, index) in data.output">
                        <tr :key="index">
                            <td class="py-2">
                                {{ item.key }}
                            </td>
                            <td class="py-2 text-right">
                                {{ item.value }}
                            </td>
                        </tr>
                    </template>

                    <tr>
                        <td colspan="2" class="text-center grey--text text--lighten-1 pa-2">
                            <div><b>vergihesaplayici.com v{{ version }}</b></div>
                            <div>{{ date.toLocaleString("tr-TR") }}</div>
                        </td>
                    </tr>
                    </tbody>
                </template>
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
                        color="#1E1E1E"
                        opacity="1"
                        class="rounded"
                        style="width:100%">
                        <v-alert
                            color="primary"
                            class="pa-0 d-flex align-center flex-row justify-center w-100 h-100"
                            outlined="">
                            <v-progress-circular
                                v-if="isLoading"
                                indeterminate=""
                                size="24"
                                width="2"
                                color="primary" />

                            <template v-else>
                                <div class="text-uppercase d-flex align-center">
                                    <v-icon left color="primary">
                                        mdi-check
                                    </v-icon>

                                    <span v-if="isDownloaded">İndirildi</span>
                                    <span v-else-if="isCopied">Kopyalandı</span>
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
        },
        async download() {
            const vm = this;

            vm.isLoading = true;

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
        text-transform: uppercase;
        font-weight: 500;
        letter-spacing: 2px
    }
}
</style>

<style scoped="">
/deep/ .v-overlay__content {
    width: 100%;
    height: 100%
}
</style>
