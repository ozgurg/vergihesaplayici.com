<template>
    <form-check-group
        v-bind="props"
        :items="ITEMS"
        type="radio"
        class="registration" />
</template>

<script lang="ts" setup>
import type {
    Item as FormCheckProps,
    Props as FormCheckGroupProps
} from "@/components/common/form/form-check-group.vue";
import type { Registration } from "@/domains/telefon-vergisi-hesaplayici/types.js";
import { REGISTRATION_LABEL_BY_REGISTRATION } from "@/domains/telefon-vergisi-hesaplayici/config.js";

export type Props = Partial<FormCheckGroupProps>;

const props = defineProps<Props>();

const ITEMS: FormCheckProps<Registration>[] = [
    {
        title: REGISTRATION_LABEL_BY_REGISTRATION["import"],
        description: "İthalatçı tarafından satılan ürünler",
        input: {
            value: "import"
        }
    },
    {
        title: REGISTRATION_LABEL_BY_REGISTRATION["passport"],
        description: "Yolcu beraberinde getirilen ürünler",
        input: {
            value: "passport"
        }
    }
];
</script>

<style lang="scss" scoped>
.registration {
    grid-template-columns: repeat(2, 1fr)
}
</style>
