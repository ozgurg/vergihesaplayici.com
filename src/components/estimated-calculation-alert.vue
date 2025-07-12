<template>
    <alert :color="COLOR">
        Ürün fiyatları; ülkeye giriş maliyetleri, menşei ülkenin vergi oranları ve diğer ilgili faktörlere bağlı olarak değişiklik gösterebilir. Belirtilen fiyatlar, satış fiyatı üzerinden tahmini olarak hesaplanmıştır.
    </alert>
</template>

<script lang="ts" setup>
import type { Props as AlertProps } from "@/components/common/alert.vue";

export type Props = AlertProps;

defineProps<Props>();

const COLOR = "warning";
</script>
