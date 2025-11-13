<template>
    <modal
        v-model="modelValue"
        :aria-labelledby="HEADING_ID">
        <tabs v-model="tabValue">
            <modal-header>
                <div>
                    <modal-title
                        :id="HEADING_ID"
                        is="h6">
                        Hesaplayıcıyı paylaş
                    </modal-title>
                    <modal-close-button @click="close()" />
                </div>
                <div>
                    <tab-list>
                        <tab value="link">
                            <svg-icon :icon="icon_link" />
                            <span>Bağlantı</span>
                        </tab>
                        <tab value="screenshot">
                            <svg-icon :icon="icon_screenshot" />
                            <span>Ekran görüntüsü</span>
                        </tab>
                    </tab-list>
                </div>
            </modal-header>
            <modal-body>
                <tab-panel value="link">
                    <calculator-share-modal-link-tab v-bind="props.link" />
                </tab-panel>
                <tab-panel value="screenshot">
                    <calculator-share-modal-screenshot-tab v-bind="props.screenshot" />
                </tab-panel>
            </modal-body>
        </tabs>
    </modal>
</template>

<script lang="ts" setup>
import type {
    Props as CalculatorShareModalLinkTabProps
} from "@/components/calculator-share-modal/calculator-share-modal-link-tab.vue";
import type {
    Props as CalculatorShareModalScreenshotTabProps
} from "@/components/calculator-share-modal/calculator-share-modal-screenshot-tab.vue";
import type { Props as ModalProps } from "@/components/common/modal/modal.vue";
import { icon_link, icon_screenshot } from "@/utils/icons.js";

export type Props = {
    link: CalculatorShareModalLinkTabProps;
    screenshot: CalculatorShareModalScreenshotTabProps;
} & ModalProps;

const props = defineProps<Props>();

const modelValue = defineModel<boolean>();
const tabValue = ref<"link" | "screenshot">("link");

const HEADING_ID = `modal-heading-${useId()}`;

const close = (): void => {
    modelValue.value = false;
};
</script>
