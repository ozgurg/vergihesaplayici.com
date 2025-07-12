<template>
    <form-button
        :disabled="isLoading"
        :loading="isLoading"
        @click="share()"
        aria-label="Hesaplayıcı ekran görüntüsünü cihazınızdaki uygulamalarda paylaş"
        color="secondary"
        scale="medium"
        variant="outlined">
        <svg-icon :icon="icon_share" />
        <span>Paylaş…</span>
    </form-button>
</template>

<script lang="ts" setup>
import type {
    CalculatorShareModalScreenshotTabScreenshotInstance
} from "@/components/calculator-share-modal/calculator-share-modal-screenshot-tab.vue";
import { icon_share } from "@/utils/icons.js";

const screenshotEl = inject<Ref<CalculatorShareModalScreenshotTabScreenshotInstance>>("screenshotEl");
const screenshotFileName = inject<string>("screenshotFileName");
const isLoading = ref<boolean>(false);

const _capture = (): Promise<Blob> => {
    return htmlToBlob(screenshotEl?.value.$el);
};

const _share = (blob: Blob): Promise<void> => {
    return sharePngFile({
        text: document.title,
        // oxlint-disable-next-line no-non-null-assertion
        fileName: screenshotFileName!,
        lastModifiedDate: new Date(),
        blob
    });
};

const share = async (): Promise<void> => {
    try {
        isLoading.value = true;
        const screenshot = await _capture();
        await _share(screenshot);
    } catch (error: unknown) {
        if ((error as Error)?.name !== "AbortError") {
            console.error((error as Error)?.message);
            alert("Bir hata oluştu");
        }
    } finally {
        isLoading.value = false;
    }
};
</script>
