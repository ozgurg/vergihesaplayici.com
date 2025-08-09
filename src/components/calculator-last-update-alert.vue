<template>
    <alert
        :class="CLASSES"
        color="warning">
        <p>Hesaplayıcı en son <b>{{ props.date.toLocaleString("tr-TR") }}</b> tarihinde güncellendi. Bu tarihten sonraki vergi değişikliklerini yansıtmaz.</p>
        <p>Hata tespit ettiyseniz; <b><a :href="hataBildirPage.url.href">{{ hataBildirPage.title }}</a></b> sayfasından bildirebilirsiniz.</p>
    </alert>
</template>

<script lang="ts" setup>
import type { Props as AlertProps } from "@/components/common/alert.vue";
import { HataBildirPageDef } from "@/domains/hata-bildir/page-def.js";

export type Props = {
    date: Date;
    alignToLabel?: boolean;
} & AlertProps;

const props = withDefaults(defineProps<Props>(), {
    alignToLabel: true
});

const hataBildirPage = HataBildirPageDef();

const CLASSES = [
    "calculator-last-update-alert",
    props.alignToLabel ? `calculator-last-update-alert-label-aligned` : undefined
];
</script>

<style lang="scss" scoped>
.calculator-last-update-alert {
    &-label-aligned {
        @include vh-media-breakpoint-up(sm) {
            // `2px` is for optical alignment
            margin-block-start: calc((1lh + (var(--vh-spacer) * .25)) - 2px)
        }
    }
}
</style>
