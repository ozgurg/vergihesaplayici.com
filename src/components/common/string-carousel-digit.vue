<template>
    <div class="string-carousel-digit">
        <template v-for="_d in DIGITS" :key="_d">
            <div :aria-current="_d == props.digit ? 'true' : 'false'">
                {{ _d }}
            </div>
        </template>
    </div>
</template>

<script lang="ts" setup>
// oxlint-disable-next-line no-magic-numbers
const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export type Props = {
    digit: string | number;
};

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
.string-carousel-digit {
    --_value: var(--value, 0);
    transition: vh-transition(transform, var(--string-carousel-duration));
    transform: translateY(calc((var(--_value) * var(--string-carousel-block-size)) * -1));
    @for $i from 0 through 9 {
        &:has(div:nth-child(#{$i + 1})[aria-current="true"]) {
            --value: #{$i}
        }
    }
}
</style>
