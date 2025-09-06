<template>
    <nav
        ref="breadcrumbsEl"
        class="breadcrumbs">
        <ol>
            <template v-for="(_item, _index) in items" :key="_index">
                <li :aria-current="isLastItem(_index) ? 'page' : 'false'">
                    <template v-if="isLastItem(_index)">
                        <span>{{ _item.title }}</span>
                    </template>
                    <template v-else>
                        <a :href="_item.url.href">
                            {{ _item.title }}
                        </a>
                    </template>
                </li>

                <template v-if="!isLastItem(_index)">
                    <li
                        aria-hidden="true"
                        class="breadcrumbs-divider">
                    </li>
                </template>
            </template>
        </ol>
    </nav>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_div } from "@/types/html.js";
import type { Breadcrumbs } from "@/types/page-def.js";

export type Props = {
    items: Breadcrumbs;
} & /* @vue-ignore */ Partial<HtmlAttrs_div>;

const props = defineProps<Props>();

const breadcrumbsEl = useTemplateRef<HTMLOListElement>("breadcrumbsEl");

const isLastItem = (index: number) => index === props.items.length - 1;

onBeforeMount(() => nextTick(() => {
    const el = breadcrumbsEl.value;
    el?.scrollTo({
        left: el.scrollWidth,
        behavior: "instant"
    });
}));
</script>

<style lang="scss" scoped>
.breadcrumbs {
    font-size: var(--vh-fs-xs);
    overflow-x: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    @include vh-media-breakpoint-down(md) {
        margin-inline: calc(var(--container-padding-inline) * -1)
    }
    @include vh-media-breakpoint-up(md) {
        margin-inline: calc((var(--vh-spacer) * .5) * -1)
    }
    ol {
        display: flex;
        align-items: center;
        flex-flow: row nowrap;
        inline-size: max-content;
        min-inline-size: 100%;
        block-size: var(--breadcrumbs-block-size);
        @include vh-media-breakpoint-down(md) {
            justify-content: center;
            padding-inline: var(--container-padding-inline);
            margin-inline: calc((var(--vh-spacer) * .5) * -1);
            margin-block-start: var(--breadcrumbs-margin-block-start) // To avoid the toolbar being too close
        }
        li {
            &[aria-current="page"] {
                a,
                span {
                    --text-alpha: .75
                }
            }
            a,
            span {
                --_text-hsl: var(--text-hsl, var(--vh-clr-white-hsl));
                --_text-alpha: var(--text-alpha, 1);
                --_bg-hsl: var(--_text-hsl);
                --_bg-alpha: var(--bg-alpha, 0);
                display: flex;
                align-items: center;
                justify-content: center;
                color: hsla(var(--_text-hsl), var(--_text-alpha));
                @include vh-squircle(var(--vh-br-small));
                background: hsla(var(--_bg-hsl), var(--_bg-alpha));
                padding-inline: calc(var(--vh-spacer) * .5);
                block-size: var(--breadcrumbs-item-block-size)
            }
            a {
                @include vh-hover {
                    transition: vh-transition(background-color, var(--vh-duration-short));
                    &:hover {
                        --text-alpha: 1;
                        --bg-alpha: .08
                    }
                    &:active {
                        --bg-alpha: .16
                    }
                }
            }
        }
    }
    &-divider {
        opacity: .5;
        margin-inline: calc(var(--vh-spacer) * .25);
        &::after {
            content: "/"
        }
    }
}
</style>
