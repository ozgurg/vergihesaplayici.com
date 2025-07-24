<template>
    <alert color="warning">
        Hesaplayıcı, en son <b>{{ props.date.toLocaleString("tr-TR") }}</b> tarihinde güncellenmiştir. Bu tarihten sonra yürürlüğe girmiş olabilecek vergi değişikliklerini yansıtmayabilir.
        <br />
        Eğer hesaplayıcıda bir hata tespit ettiyseniz; <b><a :href="hataBildirPage.url.href">{{ hataBildirPage.title }}</a></b> sayfasından bildirebilirsiniz.
    </alert>
</template>

<script lang="ts" setup>
import type { Props as AlertProps } from "@/components/common/alert.vue";
import { HataBildirPageDef } from "@/domains/hata-bildir/page-def.js";

export type Props = {
    date: Date;
} & AlertProps;

const props = defineProps<Props>();

const hataBildirPage = HataBildirPageDef();
</script>
