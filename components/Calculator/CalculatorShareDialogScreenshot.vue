<template>
    <div
        v-bind="$attrs"
        class="text-center">
        <div class="position-relative d-inline-block mb-4">
            <v-btn
                outlined=""
                color="primary"
                @click="download()">
                <v-icon left="">
                    {{ icons.mdiDownload }}
                </v-icon>
                <span>İndir</span>
            </v-btn>

            <v-btn
                outlined=""
                color="primary"
                @click="copy()">
                <v-icon left="">
                    {{ icons.mdiContentCopy }}
                </v-icon>
                <span>Kopyala</span>
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
                        <template v-if="isLoading">
                            <v-progress-circular
                                indeterminate=""
                                size="20"
                                width="2"
                                color="primary" />
                        </template>
                        <template v-else>
                            <v-icon
                                left=""
                                size="18"
                                class="me-2 ms-n2"
                                color="primary">
                                {{ icons.mdiCheck }}
                            </v-icon>
                            <div class="success-text">
                                <template v-if="isDownloaded">
                                    İndirildi
                                </template>
                                <template v-else-if="isCopied">
                                    Kopyalandı
                                </template>
                            </div>
                        </template>
                    </v-alert>
                </v-overlay>
            </v-fade-transition>
        </div>

        <div
            ref="table"
            class="screenshot">
            <v-simple-table class="rounded-0">
                <tbody>
                <tr>
                    <td class="screenshot__title py-1 text-center">
                        {{ title }}
                    </td>
                </tr>

                <tr>
                    <td
                        v-ripple=""
                        title="Başlığı değiştir"
                        role="button"
                        class="screenshot__header primary text-center py-2 pointer-events-all"
                        @click="changeTitle">
                        <template v-if="hasTitle">
                            <!-- eslint-disable vue/no-v-html -->
                            <span
                                class="screenshot__header"
                                v-html="actualTitle" />
                        </template>
                        <template v-else>
                            <i class="screenshot__header font-weight-thin">Başlıksız</i>
                        </template>
                    </td>
                </tr>

                <template v-for="item in data.input">
                    <tr :key="item.key">
                        <td class="py-3">
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
                    <td class="text-uppercase grey darken-3 text-center py-3">
                        Sonuçlar
                    </td>
                </tr>

                <template v-for="item in data.output">
                    <tr :key="item.key">
                        <td class="py-3">
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
                        class="text-center pt-2 pb-1"
                        style="border-top:1px solid #fff">
                        <v-row no-gutters>
                            <v-col
                                v-for="_currencyCode in currencies"
                                :key="_currencyCode">
                                <CalculatorShareDialogScreenshotExchangeRateItem :currency-code="_currencyCode" />
                            </v-col>
                        </v-row>
                    </td>
                </tr>

                <tr>
                    <td class="text-center py-2 caption">
                        <div class="grey--text text--lighten-1">
                            {{ date.toLocaleString("tr-TR") }}
                        </div>

                        <div class="d-flex align-center justify-center flex-row primary--text">
                            <img
                                :src="require('@/assets/img/logo-screenshot.png')"
                                class="me-1"
                                loading="lazy"
                                decoding="async"
                                alt="Vergi Hesaplayıcı Logo"
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
import { mdiCheck, mdiContentCopy, mdiDownload } from "@mdi/js";
import { version } from "@/package.json";
import { downloadFile } from "@/utils/download-file.js";
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
                width: 330,
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
@import "vuetify/src/components/VBtn/VBtn.sass";

.screenshot {
    position: relative;
    width: 330px;
    min-width: 330px;
    max-width: 100%;
    margin: 0 auto;
    padding: 1px;
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
    td {
        height: auto !important
    }
}

.success-text {
    font-size: map-deep-get($btn-font-sizes, "default")
}

.position-relative {
    position: relative
}

.pointer-events-all {
    pointer-events: all
}

:deep(.v-overlay__content) {
    width: 100%;
    height: 100%
}

:deep(.v-alert) {
    border-radius: $btn-border-radius
}
</style>
