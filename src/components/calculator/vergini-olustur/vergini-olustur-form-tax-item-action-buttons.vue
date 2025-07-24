<template>
    <transition name="fade-transition" mode="out-in">
        <div
            :key="isDeleteMode.toString()"
            class="tax-item-action-buttons">
            <template v-if="isDeleteMode">
                <form-button
                    @click="emit('click:delete')"
                    type="button"
                    color="danger"
                    scale="small"
                    variant="filled">
                    Sil
                </form-button>
                <form-button
                    @click="toggle()"
                    type="button"
                    color="light"
                    scale="small"
                    variant="text">
                    İptal
                </form-button>
            </template>
            <template v-else>
                <form-button
                    type="button"
                    color="light"
                    scale="small"
                    variant="text"
                    data-sortable-handle="">
                    <svg-icon :icon="icon_draggable" />
                </form-button>
                <form-button
                    @click="toggle()"
                    type="button"
                    color="danger"
                    scale="small"
                    variant="outlined">
                    Sil…
                </form-button>
            </template>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { icon_draggable } from "@/utils/icons.js";

export type Events = (event: "click:delete") => void;

const emit = defineEmits<Events>();
const isDeleteMode = defineModel<boolean>("is-delete-mode", { default: false });

const toggle = (): void => {
    isDeleteMode.value = !isDeleteMode.value;
};
</script>

<style lang="scss" scoped>
.tax-item-action-buttons {
    display: inline-flex;
    flex-flow: row nowrap;
    gap: calc(var(--vh-spacer) * .5)
}
</style>
