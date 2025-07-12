<template>
    <form-button
        :disabled="isLoading"
        :loading="isLoading"
        @click="share()"
        aria-label="Hesaplayıcı bağlantısını cihazınızdaki uygulamalarda paylaş"
        color="light"
        scale="medium"
        type="button"
        variant="outlined">
        Diğer…
    </form-button>
</template>

<script lang="ts" setup>
const url = inject<URL>("url");
const isLoading = ref<boolean>(false);

const _share = (): Promise<void> => {
    return shareUrl({
        text: document.title,
        // oxlint-disable-next-line no-non-null-assertion
        url: url!
    });
};

const share = async (): Promise<void> => {
    try {
        isLoading.value = true;
        await _share();
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
