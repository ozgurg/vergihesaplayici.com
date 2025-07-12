<template>
    <i
        aria-hidden="true"
        class="svg-icon">
        <cached-svg :svg="props.icon" />
    </i>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_i } from "@/types/html.js";
import type { SvgIcon } from "@/types/common.js";

export type Props = {
    icon: SvgIcon;
} & /* @vue-ignore */ Partial<HtmlAttrs_i>;

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
.svg-icon {
    --_size: var(--size, calc(var(--vh-spacer) * 1.25));
    font-size: 0;
    line-height: 1;
    display: inline-block;
    flex: 0 0 var(--_size);
    inline-size: var(--_size);
    block-size: var(--_size);
    svg {
        fill: currentColor;
        inline-size: 100%;
        block-size: 100%
    }
}
</style>
