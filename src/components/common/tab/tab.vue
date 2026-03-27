<template>
    <button
        ref="buttonEl"
        :id="ID"
        :aria-controls="ARIA_CONTROLS"
        :aria-selected="isSelected ? 'true' : 'false'"
        :tabindex="isSelected ? undefined : '-1'"
        @click="select()"
        @keydown="handleKeydown($event)"
        class="tab"
        role="tab"
        type="button">
        <span class="tab-content">
            <slot name="default" />
        </span>
    </button>
</template>

<script lang="ts" setup>
import type { HtmlAttrs_button } from "@/types/html.js";

type Tab = HTMLButtonElement;

export type Props = {
    value: string;
} & /* @vue-ignore */ Partial<HtmlAttrs_button>;

const props = defineProps<Props>();
const tabsModelValue = inject("tabs.modelValue", ref());
const tabsId = inject("tabs.id", null);

const buttonEl = useTemplateRef<Tab>("buttonEl");

const ID = props["id"] || `${tabsId}-tab-${props.value}`;
const ARIA_CONTROLS = props["aria-controls"] || `${tabsId}-tab-panel-${props.value}`;

const isSelected = computed<boolean>(() => {
    return tabsModelValue.value === props.value;
});

const select = (): void => {
    tabsModelValue.value = props.value;
};

const handleKeydown = (event: KeyboardEvent): void => {
    let tabToNavigate: Tab | null = null;

    if (event.key === "Home") {
        tabToNavigate = _getFirstTab();
    } else if (event.key === "End") {
        tabToNavigate = _getLastTab();
    } else if (event.key === "ArrowLeft") {
        tabToNavigate = _getPreviousTab() ?? _getLastTab();
    } else if (event.key === "ArrowRight") {
        tabToNavigate = _getNextTab() ?? _getFirstTab();
    }

    if (tabToNavigate) {
        event.preventDefault();
        event.stopPropagation();
        _navigateToTab(tabToNavigate);
    }
};

const _getFirstTab = (): Tab | null => {
    return buttonEl.value?.parentElement?.firstElementChild as Tab;
};

const _getLastTab = (): Tab | null => {
    return buttonEl.value?.parentElement?.lastElementChild as Tab;
};

const _getPreviousTab = (): Tab | null => {
    return buttonEl.value?.previousElementSibling as Tab;
};

const _getNextTab = (): Tab | null => {
    return buttonEl.value?.nextElementSibling as Tab;
};

const _navigateToTab = (tab: Tab): void => {
    tab.focus();
    tab.dispatchEvent(new Event("click"));
};

onBeforeMount(() => {
    if (!tabsId) {
        throw new Error("`<tab />` components must be placed within a `<tab-list />`, and `<tab-list /> component must be nested within a `<tabs />`.");
    }
});
</script>

<style lang="scss" scoped>
.tab {
    --_text-hsl: var(--text-hsl, var(--vh-clr-body-text-hsl));
    --_text-alpha: var(--text-alpha, .5);
    position: relative;
    @include vh-reset-button;
    font-size: var(--vh-fs-sm);
    flex: 1;
    color: hsla(var(--_text-hsl), var(--_text-alpha));
    @include vh-hover {
        transition: vh-transition(color, var(--vh-duration-short));
        &:hover {
            --text-alpha: .75
        }
        &:active {
            --text-alpha: 1
        }
    }
    &[aria-selected="true"] {
        --text-hsl: var(--vh-clr-primary-hsl);
        --text-alpha: 1;
        span {
            @supports (anchor-name: var(--_anchor-name)) {
                anchor-name: --_anchor-name
            }
            @supports (not(anchor-name: var(--_anchor-name))) {
                &::after {
                    opacity: 1;
                    transform: scaleX(1)
                }
            }
        }
    }
    & + &::before {
        position: absolute;
        display: inline-block;
        content: "";
        pointer-events: none;
        background: hsla(var(--vh-clr-border-hsl), var(--vh-clr-border-alpha));
        inset-inline-start: 0;
        inset-block-start: calc(50% - ((var(--vh-spacer) * 1.25) / 2));
        block-size: calc(var(--vh-spacer) * 1.25);
        inline-size: 1px
    }
    &-content {
        display: inline-flex;
        align-items: center;
        flex-flow: row wrap;
        justify-content: center;
        text-align: start;
        padding-inline: calc(var(--vh-spacer) * .25);
        gap: calc(var(--vh-spacer) * .5);
        block-size: calc(var(--vh-spacer) * 3);
        @supports (not(anchor-name: var(--_anchor-name))) {
            position: relative;
            &::after {
                position: absolute;
                content: "";
                background: var(--vh-clr-primary);
                block-size: 3px;
                border-radius: var(--vh-br-normal) var(--vh-br-normal) 0 0;
                transition: vh-transition(opacity transform, var(--vh-duration-long));
                inset-block-end: 0;
                inset-inline: 0;
                inline-size: 100%;
                opacity: 0;
                transform-origin: center;
                transform: scaleX(0)
            }
        }
    }
}
</style>
