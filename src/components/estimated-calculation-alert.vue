<template>
    <alert :color="COLOR">
        Ürün fiyatları; giriş maliyetleri, ülke vergileri ve diğer etkenlere göre değişebilir. Belirtilen fiyatlar satış fiyatı üzerinden tahmini olarak hesaplanmıştır.
    </alert>
</template>

<script lang="ts" setup>
import type { Props as AlertProps } from "@/components/common/alert.vue";

export type Props = AlertProps;

defineProps<Props>();

const COLOR = "warning";
</script>
