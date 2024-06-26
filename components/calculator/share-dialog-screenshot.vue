<template>
    <div
        class="screenshot"
        :class="{'screenshot--is-short': isTableShort}">
        <div class="screenshot__overlay d-flex justify-center">
            <div class="screenshot__actions primary d-inline-flex flex-column flex-grow-0 pa-6">
                <v-btn
                    :loading="isDownloading"
                    class="mb-3"
                    elevation="0"
                    color="secondary"
                    large=""
                    width="128"
                    @click="download()">
                    <template v-if="isDownloaded">
                        <v-icon size="24">
                            {{ icons.mdiCheck }}
                        </v-icon>
                    </template>
                    <template v-else>
                        <v-icon left="">
                            {{ icons.mdiDownload }}
                        </v-icon>
                        <span>İndir</span>
                    </template>
                </v-btn>

                <template v-if="isWebShareApiSupported">
                    <v-btn
                        :loading="isSharing"
                        class="mb-3"
                        outlined=""
                        elevation="0"
                        color="secondary"
                        large=""
                        width="128"
                        @click="shareViaWebShareApi()">
                        <v-icon left="">
                            {{ icons.mdiExportVariant }}
                        </v-icon>
                        <span>Paylaş…</span>
                    </v-btn>
                </template>

                <v-btn
                    :loading="isCopying"
                    outlined=""
                    elevation="0"
                    color="secondary"
                    large=""
                    width="128"
                    @click="copy()">
                    <template v-if="isCopied">
                        <v-icon size="24">
                            {{ icons.mdiCheck }}
                        </v-icon>
                    </template>
                    <template v-else>
                        <v-icon left="">
                            {{ icons.mdiContentCopy }}
                        </v-icon>
                        <span>Kopyala</span>
                    </template>
                </v-btn>
            </div>
        </div>

        <div
            ref="table"
            class="screenshot__table">
            <v-simple-table dense="">
                <tbody>
                <template v-if="presetTitle">
                    <tr>
                        <td class="secondary text-caption text-center py-1">
                            {{ calculatorTitle }}
                        </td>
                    </tr>

                    <tr>
                        <td class="primary secondary--text text-center font-weight-medium text-body-1 py-2">
                            {{ presetTitle }}
                            <div
                                v-if="presetOptionTitle"
                                class="text-body-2">
                                {{ presetOptionTitle }}
                            </div>
                        </td>
                    </tr>
                </template>
                <template v-else>
                    <tr>
                        <td class="primary secondary--text text-center font-weight-medium text-body-1 py-2">
                            {{ calculatorTitle }}
                        </td>
                    </tr>
                </template>

                <template v-for="_item in input">
                    <tr :key="_item.key">
                        <td class="py-3">
                            <div class="d-flex justify-space-between align-center">
                                <div class="text-start flex-grow-1 flex-shrink-0">
                                    {{ _item.key }}
                                </div>
                                <div class="text-end font-weight-medium ps-4">
                                    {{ _item.value }}
                                </div>
                            </div>
                        </td>
                    </tr>
                </template>

                <template v-if="input.length > 0">
                    <tr>
                        <td class="text-uppercase text-center  caption grey darken-3 py-1">
                            Sonuçlar
                        </td>
                    </tr>
                </template>

                <template v-for="_item in output">
                    <tr :key="_item.key">
                        <td class="py-3">
                            <div class="d-flex justify-space-between align-center">
                                <div class="text-start flex-grow-1 flex-shrink-0">
                                    {{ _item.key }}
                                </div>
                                <div class="text-end font-weight-medium ps-4">
                                    {{ _item.value }}
                                </div>
                            </div>
                        </td>
                    </tr>
                </template>

                <tr>
                    <td class="screenshot__table__footer text-center py-1">
                        <v-row no-gutters="">
                            <v-col
                                v-for="_currencyCode in currencyCodes"
                                :key="_currencyCode">
                                <lazy-calculator-share-dialog-screenshot-exchange-rate-item :currency-code="_currencyCode" />
                            </v-col>
                        </v-row>
                    </td>
                </tr>

                <tr>
                    <td class="text-center pt-1 pb-2">
                        <div class="grey--text text--lighten-1 caption">
                            {{ date.toLocaleString("tr-TR") }}
                        </div>

                        <div class="d-flex align-center justify-center flex-row primary--text caption">
                            <img
                                :src="require('@/assets/img/logo-screenshot.webp')"
                                class="me-1"
                                loading="eager"
                                decoding="async"
                                alt="Logo"
                                width="136"
                                height="18" />
                            <span>v{{ version }}</span>
                        </div>
                    </td>
                </tr>
                </tbody>
            </v-simple-table>
        </div>
    </div>
</template>

<script>
import { mdiCheck, mdiContentCopy, mdiDownload, mdiExportVariant } from "@mdi/js";
import { version } from "@/package.json";
import { downloadFile } from "@/utils/download-file.js";
import { dataUrlToBlob } from "@/utils/data-url-to-blob.js";

export default {
    data: () => ({
        icons: {
            mdiContentCopy,
            mdiDownload,
            mdiCheck,
            mdiExportVariant
        },

        isTableShort: false,

        date: new Date(),
        version,

        isDownloading: false,
        isDownloaded: false,

        isSharing: false,

        isCopying: false,
        isCopied: false
    }),
    props: {
        input: {
            type: Array,
            default: () => ([])
        },
        output: {
            type: Array,
            required: true
        },
        calculatorTitle: {
            type: String,
            required: true
        },
        presetTitle: {
            type: String,
            default: null
        },
        presetOptionTitle: {
            type: String,
            default: null
        }
    },
    methods: {
        async download() {
            const vm = this;

            vm.isDownloading = true;
            vm.isDownloaded = false;

            try {
                const screenshot = await vm._captureScreenshotOfTable();
                const fileName = `vergihesaplayici-${vm.date.getTime()}.png`;
                await downloadFile(screenshot, fileName);
            } catch {
                alert("Ekran görüntüsü indirilemiyor.");
            } finally {
                vm.isDownloading = false;
                vm.isDownloaded = true;

                setTimeout(() => {
                    vm.isDownloading = false;
                    vm.isDownloaded = false;
                }, 1500);
            }
        },
        async shareViaWebShareApi() {
            const vm = this;

            vm.isSharing = true;

            try {
                const screenshot = await vm._captureScreenshotOfTable();
                const fileName = `vergihesaplayici-${vm.date.getTime()}.png`;
                const screenshotToBlob = await dataUrlToBlob(screenshot);

                const screenshotFile = new File(
                    [screenshotToBlob],
                    fileName,
                    {
                        type: "image/jpeg",
                        lastModified: vm.date.getTime()
                    }
                );

                await navigator.share({
                    title: document.title,
                    text: document.title,
                    files: [screenshotFile]
                });
            } catch (error) {
            } finally {
                vm.isSharing = false;
            }
        },
        // This feature requires https.
        // So if you are running it on your local IP (Like http://192.168.*) it will not work.
        // Do not try to look for the cause of the error like me. :)
        async copy() {
            const vm = this;

            vm.isCopying = true;
            vm.isCopied = false;

            try {
                await vm._requestClipboardPermission();
                const screenshot = await vm._captureScreenshotOfTable();
                const screenshotToBlob = await dataUrlToBlob(screenshot);
                await vm._copyScreenshotToClipboard(screenshotToBlob);

                vm.isCopying = false;
                vm.isCopied = true;

                setTimeout(() => {
                    vm.isCopying = false;
                    vm.isCopied = false;
                }, 1500);
            } catch {
                vm.isCopying = false;
                vm.isCopied = false;

                if (confirm("Ekran görüntüsü kopyalanamıyor. Kopyalamak yerine indirmek ister misiniz?")) {
                    await vm.download();
                }
            }
        },
        _captureScreenshotOfTable() {
            const vm = this;
            return vm.$html2canvas(vm.$refs.table, {
                width: vm.$refs.table.offsetWidth,
                logging: false,
                backgroundColor: "#fff",
                type: "dataURL"
            });
        },
        _requestClipboardPermission() {
            return navigator.permissions.query({
                name: "clipboard-write",
                allowWithoutGesture: false
            });
        },
        _copyScreenshotToClipboard(screenshot) {
            // "navigator.clipboard" requires HTTPS.
            // Don't make the same mistake I did if you're running it on your local IP. :)
            return navigator.clipboard.write([
                new window.ClipboardItem({
                    "image/png": screenshot
                })
            ]);
        }
    },
    computed: {
        isWebShareApiSupported() {
            return navigator.share;
        },
        currencyCodes() {
            const vm = this;
            return vm.$store.getters["exchange-rates/availableCurrenciesExceptTRY"];
        }
    },
    mounted() {
        const vm = this;
        setTimeout(() => {
            vm.isTableShort = vm.$refs.table.clientHeight < 400;
        }, 0);
    }
};
</script>

<style lang="scss" scoped="">
@import "~vuetify/src/styles/styles.sass";

.screenshot {
    $self: &;
    position: relative;
    width: 300px;
    max-width: 100%;
    margin: 0 auto;
    &__overlay {
        position: absolute;
        z-index: 2;
        inset: 0;
        width: 100%;
        height: 100%;
        background: rgba(#000, .5);
        align-items: center;
        #{$self}:not(#{$self}--is-short) & {
            @media #{map-get($display-breakpoints, "md-and-down")} {
                align-items: start;
                padding-block-start: 8rem
            }
        }
    }
    &__table {
        position: relative;
        z-index: 1;
        border: 2px solid #fff;
        .v-data-table {
            border-radius: 0
        }
        &__footer {
            border-block-start: 2px solid #fff
        }
    }
    &__actions {
        border-radius: 2rem
    }
}

:deep(.v-icon) {
    transition: none !important
}
</style>
