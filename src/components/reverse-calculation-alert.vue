<template>
    <alert color="warning">
        Para birimi <b>TRY</b> olduğu için vergili fiyat üzerinden vergisiz fiyat hesaplaması yapıldı.
    </alert>
</template>

<script lang="ts" setup>
import type { Props as AlertProps } from "@/components/common/alert.vue";

export type Props = AlertProps;

defineProps<Props>();
</script>
