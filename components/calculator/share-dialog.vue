<template>
    <v-dialog
        :value="props.value"
        :fullscreen="$vuetify.breakpoint.smAndDown"
        :transition="$vuetify.breakpoint.smAndDown ? 'dialog-bottom-transition' : 'dialog-transition'"
        overlay-color="#000"
        overlay-opacity=".75"
        width="700"
        @click:outside="close()"
        @keydown.esc="close()"
        @close="close()">
        <v-toolbar flat="">
            <v-toolbar-title>
                Sonuçları paylaş
            </v-toolbar-title>

            <v-spacer />

            <v-btn
                icon=""
                @click="close()">
                <v-icon>
                    {{ mdiClose }}
                </v-icon>
            </v-btn>

            <template #extension>
                <v-tabs
                    v-model="currentTab"
                    fixed-tabs="">
                    <v-tab>
                        <v-icon left="">
                            {{ mdiLink }}
                        </v-icon>
                        <span>Bağlantı</span>
                    </v-tab>
                    <v-tab>
                        <v-icon left="">
                            {{ mdiCellphoneScreenshot }}
                        </v-icon>
                        <span>Ekran Görüntüsü</span>
                    </v-tab>
                </v-tabs>
            </template>
        </v-toolbar>

        <div class="body">
            <template v-if="currentTab === 0">
                <div class="mt-auto py-10 px-6 py-lg-12 px-lg-8">
                    <lazy-calculator-share-dialog-url :form="props.form" />
                </div>
            </template>
            <template v-else-if="currentTab === 1">
                <div class="mt-auto py-10 py-lg-6 px-2">
                    <calculator-share-dialog-screenshot
                        :input="props.screenshotInput"
                        :output="props.screenshotOutput"
                        :calculator-title="props.calculatorTitle"
                        :preset-title="props.presetTitle"
                        :preset-option-title="props.presetOptionTitle" />
                </div>
            </template>
        </div>
    </v-dialog>
</template>

<script setup="">
import { mdiCellphoneScreenshot, mdiClose, mdiLink } from "@mdi/js";
import { ref } from "vue";

const props = defineProps({
    value: {
        type: Boolean
    },
    form: {
        type: Object,
        required: true
    },
    screenshotInput: {
        type: Array,
        default: () => ([])
    },
    screenshotOutput: {
        type: Array,
        required: true
    },
    calculatorTitle: {
        type: String,
        required: true
    },
    presetTitle: {
        type: String,
        default: null
    },
    presetOptionTitle: {
        type: String,
        default: null
    }
});
const emit = defineEmits(["input"]);

const currentTab = ref(0);

const close = () => {
    emit("input", false);
};
</script>

<style lang="scss" scoped="">
@import "~vuetify/src/styles/styles.sass";

:deep(.v-dialog) {
    display: flex;
    flex-flow: column nowrap;
    background: map-get($material-dark-elevation-colors, "1");
    .v-toolbar {
        flex: 0
    }
    .body {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow-y: auto;
        flex: 1
    }
}

@media #{map-get($display-breakpoints, "sm-and-down")} {
    html:has(.v-dialog.v-dialog--active) {
        position: fixed;
        &, body {
            width: 100%;
            height: 100%;
            inset: 0;
            overflow: hidden
        }
        body {
            position: absolute
        }
    }
}
</style>
