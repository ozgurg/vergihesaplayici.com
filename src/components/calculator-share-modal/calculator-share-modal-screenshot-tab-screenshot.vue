<template>
    <div
        class="screenshot"
        role="presentation">
        <template v-if="props.brandTitle && props.presetTitle && props.optionTitle">
            <div class="screenshot-title">
                {{ props.calculatorTitle }}
            </div>
            <header class="screenshot-header">
                <b>{{ props.brandTitle }} {{ props.presetTitle }}</b>
                <small>{{ props.optionTitle }}</small>
            </header>
        </template>
        <template v-else>
            <div class="screenshot-title screenshot-title-primary">
                {{ props.calculatorTitle }}
            </div>
        </template>

        <main>
            <template v-if="props.screenshotData.input.length > 0">
                <dl class="screenshot-list">
                    <template v-for="_item in props.screenshotData.input" :key="Math.random()">
                        <div class="screenshot-list-item">
                            <dt>{{ _item.label }}</dt>
                            <dd
                                v-html="_item.value"
                                :class="{'text-number': _item.isNumeric}">
                            </dd>
                        </div>
                    </template>
                </dl>

                <div class="screenshot-subheader">Sonuçlar</div>
            </template>

            <dl class="screenshot-list">
                <template v-for="_item in props.screenshotData.output" :key="Math.random()">
                    <div class="screenshot-list-item">
                        <dt>{{ _item.label }}</dt>
                        <dd :class="{'text-number': _item.isNumeric || true}">
                            {{ _item.value }}
                        </dd>
                    </div>
                </template>
            </dl>
        </main>

        <footer class="screenshot-footer">
            <cached-svg :svg="logoSvg" />
        </footer>
    </div>
</template>

<script lang="ts" setup>
import logoSvg from "@/assets/img/logo.svg?raw";

export type Input = {
    label: string;
    value: string;
    isNumeric?: boolean;
};

export type Output = {
    label: string;
    value: string;
    isNumeric?: boolean;
};

export type ScreenshotData = {
    input: Input[];
    output: Output[];
};

export type Props = {
    calculatorTitle: string;
    screenshotData: ScreenshotData;
    brandTitle?: string;
    presetTitle?: string;
    optionTitle?: string;
}

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
$_variants: (
    "tax-free-price": (
        --bg: vh-calculate-overlay-color($clr-body-bg, rgba(#fff, .04)),
        --font-weight: var(--vh-fw-bold)
    ),
    "total-tax": (
        --bg: vh-calculate-overlay-color($clr-body-bg, rgba($clr-primary, .04)),
        --font-weight: var(--vh-fw-medium)
    ),
    "tax-added-price": (
        --bg: vh-calculate-overlay-color($clr-body-bg, rgba($clr-primary, .16)),
        --font-weight: var(--vh-fw-bold)
    )
);

.screenshot {
    $parent: &;
    font-size: var(--vh-fs-sm);
    overflow: hidden;
    user-select: none;
    border: .125rem solid var(--vh-clr-white);
    border-radius: var(--vh-br-normal);
    background: var(--vh-clr-body-bg);
    &-title {
        font-size: var(--vh-fs-sm);
        padding: calc(var(--vh-spacer) * .5) calc(var(--vh-spacer) * .5);
        text-align: center;
        background: var(--vh-clr-secondary);
        &-primary {
            color: var(--vh-clr-secondary);
            background: var(--vh-clr-primary)
        }
    }
    &-header {
        line-height: var(--vh-lh-sm);
        display: flex;
        flex-flow: column wrap;
        padding: calc(var(--vh-spacer) * .375) calc(var(--vh-spacer) * .5);
        text-align: center;
        color: var(--vh-clr-secondary);
        background: var(--vh-clr-primary);
        b {
            font-size: var(--vh-fs-base);
            font-weight: var(--vh-fw-bold)
        }
    }
    &-list {
        display: flex;
        flex-flow: column wrap;
        &-item {
            --_bg: var(--bg, 0);
            --_font-weight: var(--font-weight, var(--vh-fw-normal));
            font-weight: var(--_font-weight);
            display: flex;
            align-items: center;
            flex-flow: row wrap;
            justify-content: space-between;
            padding: calc(var(--vh-spacer) * .625) var(--vh-spacer);
            background: var(--_bg);
            gap: var(--vh-spacer);
            &:first-child {
                // Giving the `first-child` and `last-child` a bit more space looks better
                padding-block-start: calc(var(--vh-spacer) * .875)
            }
            &:last-child {
                // Giving the `first-child` and `last-child` a bit more space looks better
                padding-block-end: calc(var(--vh-spacer) * .875)
            }
            @each $__variant, $__properties in $_variants {
                &-variant-#{$__variant} {
                    @include vh-map-to-properties($__properties)
                }
            }
            & + & {
                border-block-start: 1px solid hsla(var(--vh-clr-white-hsl), .12)
            }
            dt {
                text-align: start
            }
            dd {
                flex: 1;
                text-align: end;
                word-break: break-word
            }
        }
    }
    &-subheader {
        line-height: var(--vh-lh-sm);
        text-align: center;
        color: var(--vh-clr-white);
        background: hsla(var(--vh-clr-white-hsl), .12);
        padding-block: calc(var(--vh-spacer) * .5)
    }
    &-footer {
        text-align: center;
        border-block-start: .125rem solid var(--vh-clr-white);
        padding-block: calc(var(--vh-spacer) * .5);
        svg {
            display: inline-block;
            inline-size: 153px;
            block-size: 20px;
            fill: var(--vh-clr-primary)
        }
    }
}
</style>
