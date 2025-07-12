<template>
    <form-button
        :aria-label="isCopied ? 'Hesaplayıcı ekran görüntüsü panoya kopyalandı' : 'Hesaplayıcı ekran görüntüsünü panoya kopyala'"
        @click="copy()"
        aria-live="polite"
        color="secondary"
        scale="medium"
        type="button"
        variant="outlined">
        <transition name="fade-scale-transition" mode="out-in">
            <template v-if="isCopied">
                <svg-icon :icon="icon_check" />
            </template>
            <template v-else>
                <svg-icon :icon="icon_copy" />
            </template>
        </transition>
        <span>Kopyala</span>
    </form-button>
</template>

<script lang="ts" setup>
import type {
    CalculatorShareModalScreenshotTabScreenshotInstance
} from "@/components/calculator-share-modal/calculator-share-modal-screenshot-tab.vue";
import { icon_check, icon_copy } from "@/utils/icons.js";

const COPIED_FLASH_TIMEOUT_IN_MS = 1_000;

const screenshotEl = inject<Ref<CalculatorShareModalScreenshotTabScreenshotInstance>>("screenshotEl");
const isCopied = ref<boolean>(false);

let copiedTimeout: ReturnType<typeof setTimeout> | null = null;

const _capture = (): Promise<Blob> => {
    return htmlToBlob(screenshotEl?.value.$el);
};

const _copy = (blob: Blob): Promise<void> => {
    return copyPngFileToClipboard(blob);
};

const _resetCopyState = (): void => {
    isCopied.value = false;

    if (copiedTimeout !== null) {
        clearTimeout(copiedTimeout);
        copiedTimeout = null;
    }
};

const _flashCopyState = (): void => {
    isCopied.value = true;
    copiedTimeout = setTimeout(_resetCopyState, COPIED_FLASH_TIMEOUT_IN_MS);
};

const copy = async (): Promise<void> => {
    try {
        _resetCopyState();
        const screenshot = await _capture();
        await _copy(screenshot);
        _flashCopyState();
    } catch (error: unknown) {
        console.error((error as Error)?.message);
        alert("Bir hata oluştu");
    }
};
</script>
