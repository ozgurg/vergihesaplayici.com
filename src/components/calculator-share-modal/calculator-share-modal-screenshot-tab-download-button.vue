<template>
    <form-button
        :aria-label="isDownloaded ? 'Hesaplayıcı ekran görüntüsü indirildi' : 'Hesaplayıcı ekran görüntüsünü indir'"
        @click="download()"
        aria-live="polite"
        color="secondary"
        scale="medium"
        type="button"
        variant="filled">
        <transition name="fade-scale-transition" mode="out-in">
            <template v-if="isDownloaded">
                <svg-icon :icon="icon_check" />
            </template>
            <template v-else>
                <svg-icon :icon="icon_download" />
            </template>
        </transition>
        <span>İndir</span>
    </form-button>
</template>

<script lang="ts" setup>
import type {
    CalculatorShareModalScreenshotTabScreenshotInstance
} from "@/components/calculator-share-modal/calculator-share-modal-screenshot-tab.vue";
import { icon_check, icon_download } from "@/utils/icons.js";

const DOWNLOADED_FLASH_TIMEOUT_IN_MS = 1_000;

const screenshotEl = inject<Ref<CalculatorShareModalScreenshotTabScreenshotInstance>>("screenshotEl");
const screenshotFileName = inject<string>("screenshotFileName");
const isDownloaded = ref<boolean>(false);

let downloadedTimeout: ReturnType<typeof setTimeout> | null = null;

const _capture = async (): Promise<URL> => {
    const canvas = await htmlToCanvas(screenshotEl?.value.$el);
    return new URL(canvas.toDataURL("image/jpeg"));
};

const _download = (dataUrl: URL): void => {
    // oxlint-disable-next-line no-non-null-assertion
    return downloadFile(dataUrl, screenshotFileName!);
};

const _resetDownloadState = (): void => {
    isDownloaded.value = false;

    if (downloadedTimeout !== null) {
        clearTimeout(downloadedTimeout);
        downloadedTimeout = null;
    }
};

const _flashDownloadState = (): void => {
    isDownloaded.value = true;
    downloadedTimeout = setTimeout(_resetDownloadState, DOWNLOADED_FLASH_TIMEOUT_IN_MS);
};

const download = async (): Promise<void> => {
    try {
        _resetDownloadState();
        const screenshot = await _capture();
        _download(screenshot);
        _flashDownloadState();
    } catch (error: unknown) {
        console.error((error as Error)?.message);
        alert("Bir hata oluştu");
    }
};
</script>
