<template>
    <alert color="warning">
        Hesaplayıcı, en son <b>{{ props.date.toLocaleString("tr-TR") }}</b> tarihinde güncellenmiştir. Bu tarihten sonra yürürlüğe girmiş olabilecek vergi değişikliklerini yansıtmayabilir.
    </alert>
</template>

<script lang="ts" setup>
import type { Props as AlertProps } from "@/components/common/alert.vue";

export type Props = {
    date: Date;
} & AlertProps;

const props = defineProps<Props>();
</script>
