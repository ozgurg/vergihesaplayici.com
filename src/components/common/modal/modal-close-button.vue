<template>
    <form-button
        aria-label="Kapat"
        class="modal-close-button"
        color="light"
        tabindex="0"
        type="button"
        variant="outlined">
        <svg-icon :icon="icon_close" />
    </form-button>
</template>

<script lang="ts" setup>
import type { Props as FormButtonProps } from "@/components/common/form/form-button.vue";
import { icon_close } from "@/utils/icons.js";

export type Props = FormButtonProps;

defineProps<Props>();
</script>

<style lang="scss" scoped>
.modal-close-button {
    // FIXME: There is a specificity issue during build. `!important` is used as an override.
    --border-alpha: 0 !important;
    @include vh-squircle(0 var(--vh-br-normal) 0 var(--vh-br-normal))
}
</style>
