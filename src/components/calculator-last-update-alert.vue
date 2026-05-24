<template>
    <alert color="warning">
        <p>
            Son güncelleme: <b>{{ props.date.toLocaleString("tr-TR") }}</b>.
            <br />
            Güncel vergi değişikliklerini içermeyebilir.
        </p>
    </alert>
</template>

<script lang="ts" setup>
import type { Props as AlertProps } from "@/components/common/alert.vue";

export type Props = {
    date: Date
} & AlertProps;

const props = defineProps<Props>();
</script>
