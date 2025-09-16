<template>
    <div class="calculator-card-item">
        <div class="icon">
            <svg-icon :icon="props.icon" />
        </div>
        <h2 class="title">
            <a
                :href="props.url.href"
                class="stretched-link">
                <span>{{ props.title }}</span>
            </a>
            <svg-icon :icon="icon_chevronRight" />
        </h2>
        <div
            v-html="props.description"
            class="summary">
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_a } from "@/types/html.js";
import type { SvgIcon } from "@/types/common.js";
import { icon_chevronRight } from "@/utils/icons.js";

export type Props = {
    title: string;
    description: string;
    url: URL;
    icon: SvgIcon;
} & /* @vue-ignore */ Partial<HtmlAttrs_a>;

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
@property --_color {
    syntax: "<color>";
    initial-value: #000;
    inherits: false
}

.calculator-card-item {
    --_h: var(--h, var(--vh-clr-primary-h));
    --_s: var(--s, var(--vh-clr-primary-s));
    --_l: var(--s, var(--vh-clr-primary-l));
    --_hsl: var(--_h), var(--_s), var(--_l);
    --_color: hsla(var(--_hsl), .12);
    position: relative;
    display: block;
    padding: calc(var(--vh-spacer) * 2) calc(var(--vh-spacer) * 1.5);
    color: var(--vh-clr-body-text);
    border: var(--vh-border-inline-size) solid hsla(var(--_hsl), var(--vh-clr-border-alpha));
    @include vh-squircle(var(--vh-br-normal));
    background: radial-gradient(ellipse at left top, var(--_color), transparent);
    @include vh-hover {
        transition: vh-transition(--_color, var(--vh-duration-short));
        &:hover {
            --_color: hsla(var(--_hsl), .20)
        }
        &:active {
            --_color: hsla(var(--_hsl), .24)
        }
    }
    &:focus-within {
        @include vh-focus-appearance()
    }
    .icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: calc(var(--vh-spacer) * .625);
        margin-inline-start: -.375rem;
        border-radius: var(--vh-br-pill);
        background: hsla(var(--_hsl), .24);
        margin-block-end: var(--vh-spacer);
        .svg-icon {
            --size: calc(var(--vh-spacer) * 2)
        }
    }
    .title {
        --_icon-size: calc(var(--vh-spacer) * 1.25);
        display: flex;
        align-items: flex-end;
        flex-flow: row nowrap;
        margin-block-end: calc(var(--vh-spacer) * .25);
        gap: calc(var(--vh-spacer) * .125);
        a {
            text-wrap: pretty;
            font-size: var(--vh-fs-md);
            font-weight: var(--vh-fw-bold);
            line-height: var(--vh-lh-lg);
            display: inline-block;
            max-inline-size: calc(100% - var(--_icon-size));
            @include vh-ellipsis-multiline(1);
            &:focus {
                @include vh-clear-focus-appearance()
            }
        }
        .svg-icon {
            --size: var(--_icon-size);
            transform: translateY(-3px);
            opacity: .75
        }
    }
    .summary {
        font-size: var(--vh-fs-sm);
        font-weight: var(--vh-fw-medium);
        line-height: var(--vh-lh-lg);
        opacity: .75;
        :deep(em) {
            font-style: italic
        }
    }
}
</style>
