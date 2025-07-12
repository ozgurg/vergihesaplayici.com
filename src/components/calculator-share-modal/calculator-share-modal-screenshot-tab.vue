<template>
    <div class="screenshot">
        <div class="screenshot-overlay">
            <div class="screenshot-buttons">
                <calculator-share-modal-screenshot-tab-download-button />
                <calculator-share-modal-screenshot-tab-share-button />
                <calculator-share-modal-screenshot-tab-copy-button />
            </div>
        </div>

        <calculator-share-modal-screenshot-tab-screenshot
            ref="screenshotEl"
            :calculator-title="props.calculatorTitle"
            :option-title="props.optionTitle"
            :brand-title="props.brandTitle"
            :preset-title="props.presetTitle"
            :screenshot-data="props.screenshotData"
            class="screenshot-table" />
    </div>
</template>

<script lang="ts" setup>
import type {
    CalculatorShareModalScreenshotTabScreenshot,
    Props as CalculatorShareModalScreenshotTabScreenshotProps
} from "@/components/calculator-share-modal/calculator-share-modal-screenshot-tab-screenshot.vue";

export type CalculatorShareModalScreenshotTabScreenshotInstance = InstanceType<typeof CalculatorShareModalScreenshotTabScreenshot>;

export type Props = CalculatorShareModalScreenshotTabScreenshotProps;

const props = defineProps<Props>();

const screenshotEl = useTemplateRef<CalculatorShareModalScreenshotTabScreenshotInstance>("screenshotEl");
const SCREENSHOT_FILE_NAME = "vergihesaplayici.jpg";

provide("screenshotEl", screenshotEl);
provide<string>("screenshotFileName", SCREENSHOT_FILE_NAME);
</script>

<style lang="scss" scoped>
.screenshot {
    position: relative;
    overflow: hidden;
    border-radius: var(--vh-br-normal);
    inline-size: 18rem;
    margin-inline: auto;
    &-table {
        position: relative;
        z-index: 1
    }
    &-overlay {
        position: absolute;
        z-index: 2;
        inset: 0;
        display: flex;
        background: hsla(var(--vh-clr-black-hsl), .5);
        block-size: 100%;
        inline-size: 100%
    }
    &-buttons {
        @include vh-card();
        display: flex;
        flex-direction: column;
        margin: auto;
        padding: var(--vh-spacer);
        border-radius: calc(var(--vh-br-normal) + var(--vh-spacer));
        background: var(--vh-clr-primary);
        inline-size: max-content;
        gap: calc(var(--vh-spacer) * .5);
        .form-button {
            inline-size: 100%
        }
    }
}
</style>
