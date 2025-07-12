<template>
    <component
        :is="props.is"
        class="string-carousel">
        <!--
        This can be done without `&-wrapper`,
        but to make all of them look like a group with
        chars and a11y text, I wrapped them
        -->
        <div
            aria-hidden="true"
            role="presentation"
            class="string-carousel-wrapper">
            <template v-for="(_char, _index) in chars" :key="_index">
                <template v-if="isDigit(_char)">
                    <string-carousel-digit :digit="_char" />
                </template>
                <template v-else>
                    <span>{{ _char === " " ? "&nbsp;" : _char }}</span>
                </template>
            </template>
        </div>
        <span class="visually-hidden">
            {{ props.text }}
        </span>
    </component>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_div } from "@/types/html.js";

export type Props = {
    is?: string;
    text: string | number;
} & /* @vue-ignore */ Partial<HtmlAttrs_div>;

const props = withDefaults(defineProps<Props>(), {
    is: "div"
});

const chars = computed<string[]>(() => [...String(props.text)]);

const isDigit = (char: string): boolean => /\d/.test(char);
</script>

<style lang="scss" scoped>
.string-carousel {
    --string-carousel-block-size: var(--_block-size);
    --string-carousel-duration: var(--_duration);
    --_block-size: 1.125em;
    --_duration: var(--duration, var(--vh-duration-longer));
    display: inline-flex;
    &-wrapper {
        line-height: var(--_block-size);
        display: inline-flex;
        overflow: hidden;
        flex-flow: row wrap;
        block-size: var(--_block-size)
    }
    .visually-hidden {
        user-select: none;
        pointer-events: none
    }
}
</style>
