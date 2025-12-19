<template>
    <form-button
        :aria-label="isCopied ? 'Hesaplayıcı bağlantısı panoya kopyalandı' : 'Hesaplayıcı bağlantısını panoya kopyala'"
        @click="copy()"
        aria-live="polite"
        color="light"
        scale="medium"
        type="button"
        variant="filled"
        class="cursor-copy">
        <transition name="fade-scale-transition" mode="out-in">
            <template v-if="isCopied">
                <svg-icon :icon="icon_check" />
            </template>
            <template v-else>
                <div>Kopyala</div>
            </template>
        </transition>
    </form-button>
</template>

<script lang="ts" setup>
import { icon_check } from "@/utils/icons.js";

const COPIED_FLASH_TIMEOUT_IN_MS = 1_000;

const url = inject<URL>("url");
const isCopied = ref<boolean>(false);

let copiedTimeout: ReturnType<typeof setTimeout> | null = null;

const _copy = (): Promise<void> => {
    // oxlint-disable-next-line no-non-null-assertion
    return copyUrlToClipboard(url!);
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
        await _copy();
        _flashCopyState();
    } catch (error: unknown) {
        console.error((error as Error)?.message);
        alert("Bir hata oluştu");
    }
};
</script>
