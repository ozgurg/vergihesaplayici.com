<template>
    <div class="utilities">
        <template v-for="_utilityPage in props.items" :key="_utilityPage.id">
            <utility-card-item
                :title-tag="props.titleTag"
                :page="_utilityPage" />
        </template>
    </div>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_div } from "@/types/html.js";
import type { Props as UtilityCardProps } from "@/components/utility-card-item.vue";
import type { UtilityPage } from "@/types/page-def.js";

export type Props = {
    titleTag: UtilityCardProps["titleTag"]
    items: UtilityPage[];
} & /* @vue-ignore */ Partial<HtmlAttrs_div>;

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
.utilities {
    display: grid;
    gap: var(--vh-spacer);
    grid-template-columns: 1fr;
    @include vh-media-breakpoint-up(md) {
        grid-template-columns: 1fr 1fr
    }
}
</style>
