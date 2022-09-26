<template>
    <div v-bind="$attrs">
        <div
            ref="table"
            class="screenshot">
            <v-simple-table>
                <tbody>
                <tr>
                    <td class="screenshot__title text-uppercase text-center">
                        {{ title }}
                    </td>
                </tr>

                <tr>
                    <td
                        v-ripple=""
                        @click="changeTitle"
                        title="Başlığı değiştir"
                        role="button"
                        class="screenshot__header primary text-center py-2 pointer-events-all">
                        <template v-if="hasTitle">
                            <!-- eslint-disable vue/no-v-html -->
                            <span
                                v-html="actualTitle"
                                class="screenshot__header" />
                        </template>
                        <template v-else>
                            <i class="screenshot__header font-weight-thin">Başlıksız</i>
                        </template>
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
                    <td
                        class="text-center pa-2"
                        style="border-top:2px solid #fff">
                        <v-row no-gutters>
                            <v-col
                                v-for="(currency, index) in currencies"
                                :key="index">
                                <CalculatorShareDialogScreenshotExchangeRateItem :currency="currency" />
                            </v-col>
                        </v-row>
                    </td>
                </tr>

                <tr>
                    <td class="text-center py-2 caption">
                        <div class="grey--text text--lighten-1 mb-1">
                            {{ date.toLocaleString("tr-TR") }}
                        </div>

                        <div class="d-flex align-center justify-center flex-row primary--text">
                            <img
                                :src="require('@/assets/img/logo-screenshot.png')"
                                class="me-1"
                                alt="Vergi Hesaplayıcı Logo"
                                draggable="false"
                                height="18"
                                width="136" />
                            <span>v{{ version }}</span>
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
                        {{ icons.mdiDownload }}
                    </v-icon>
                    İndir
                </v-btn>

                <v-btn
                    @click="copy()"
                    outlined=""
                    color="primary">
                    <v-icon left="">
                        {{ icons.mdiContentCopy }}
                    </v-icon>
                    Kopyala
                </v-btn>

                <v-fade-transition>
                    <v-overlay
                        v-if="isDownloaded || isCopied || isLoading"
                        :value="true"
                        absolute=""
                        opacity="1">
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
                                <div class="d-flex align-center">
                                    <v-icon
                                        left=""
                                        color="primary">
                                        {{ icons.mdiCheck }}
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
import { mdiCheck, mdiContentCopy, mdiDownload } from "@mdi/js";
import { version } from "@/package.json";
import { downloadFile } from "@/utils/download-file";
import { dataUrlToBlob } from "@/utils/data-url-to-blob.js";
import { createCalculatorMatchingPresetTitles } from "@/utils/find-calculator-matching-presets.js";

export default {
    data: () => ({
        icons: {
            mdiContentCopy,
            mdiDownload,
            mdiCheck
        },
        version,
        date: new Date(),
        isLoading: false,
        isDownloaded: false,
        isCopied: false,
        customTitle: null,
        hasTitle: true
    }),
    props: {
        data: {
            type: Object,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        matchingPresets: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        changeTitle() {
            const vm = this;

            const customTitle = prompt("Başlığı değiştirin", vm.actualTitle);
            if (customTitle) {
                vm.customTitle = customTitle;
                vm.hasTitle = true;
            } else {
                vm.hasTitle = false;
            }
        },
        async captureScreenshot() {
            const vm = this;
            return await vm.$html2canvas(vm.$refs.table, {
                logging: false,
                width: 342,
                backgroundColor: "#fff",
                type: "dataURL"
            });
        },
        async requestClipboardPermission() {
            return await navigator.permissions.query({
                name: "clipboard-write",
                allowWithoutGesture: false
            });
        },
        async copyScreenshotToClipboard(screenshot) {
            return await navigator.clipboard.write([
                new window.ClipboardItem({
                    "image/png": screenshot
                })
            ]);
        },
        async copy() {
            const vm = this;

            vm.isLoading = true;

            try {
                await vm.requestClipboardPermission();

                const screenshot = await vm.captureScreenshot();
                const screenshotToBlob = await dataUrlToBlob(screenshot);

                await vm.copyScreenshotToClipboard(screenshotToBlob);

                setTimeout(() => {
                    vm.isLoading = false;

                    vm.isCopied = true;
                    setTimeout(() => {
                        vm.isCopied = false;
                    }, 1500);
                }, 375);
            } catch {
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
                const fileName = `vergihesaplayici-${vm.date.getTime()}.png`;

                await downloadFile(screenshot, () => fileName);

                setTimeout(() => {
                    vm.isLoading = false;

                    vm.isDownloaded = true;
                    setTimeout(() => {
                        vm.isDownloaded = false;
                    }, 1500);
                }, 375);
            } catch {
                alert("Bir hata oluştu.");

                vm.isLoading = false;
            }
        }
    },
    computed: {
        currencies() {
            const vm = this;
            return vm.$store.getters["exchange-rates/availableCurrenciesExceptTRY"];
        },
        presetTitle() {
            const vm = this;
            return vm.matchingPresets !== undefined ? createCalculatorMatchingPresetTitles(vm.matchingPresets).join("<br />") : false;
        },
        actualTitle() {
            const vm = this;
            return vm.customTitle ? vm.customTitle : vm.presetTitle;
        }
    },
    mounted() {
        const vm = this;
        vm.hasTitle = vm.actualTitle;
    }
};
</script>

<style lang="scss" scoped="">
.screenshot {
    position: relative;
    width: 342px;
    min-width: 300px;
    max-width: 100%;
    margin: 0 auto;
    padding: 2px;
    pointer-events: none;
    background: #fff;

    &__title {
        background: #00262C
    }

    &__header {
        color: #00262C;
        line-height: 24px;
        font-size: 16px;
        font-weight: 500
    }

    &__success-text {
        // Same as button
        font-size: .875rem
    }
}
</style>

<style scoped="">
:deep(.v-overlay__content) {
    width: 100%;
    height: 100%
}

:deep(.v-alert) {
    border-radius: 12px
}
</style>
