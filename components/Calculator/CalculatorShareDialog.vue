<template>
    <v-dialog
        @click:outside="close()"
        @close="close()"
        v-bind="$attrs"
        :value="value"
        content-class="vh-dialog"
        :fullscreen="$vuetify.breakpoint.mdAndDown"
        :transition="$vuetify.breakpoint.mdAndDown ? 'dialog-bottom-transition' : 'dialog-transition'"
        width="700">
        <v-toolbar
            class="px-2"
            elevation="0">
            <v-toolbar-title class="text-center">
                Paylaş
            </v-toolbar-title>

            <v-spacer />

            <v-btn
                @click="close()"
                icon="">
                <v-icon>{{ icons.mdiClose }}</v-icon>
            </v-btn>
        </v-toolbar>

        <div class="vh-dialog__content py-10">
            <v-expansion-panels
                :value="0"
                flat=""
                tile=""
                accordion=""
                focusable="">
                <v-expansion-panel>
                    <v-expansion-panel-header>
                        <div class="d-flex align-center">
                            <v-icon
                                class="mr-4"
                                left="">
                                {{ icons.mdiLink }}
                            </v-icon>
                            Bağlantı
                        </div>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div class="pl-2 pr-2 pt-8 pb-4">
                            <CalculatorShareDialogUrl :data="formData" />
                        </div>
                    </v-expansion-panel-content>

                    <v-divider />
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header>
                        <div class="d-flex align-center">
                            <v-icon
                                class="mr-4"
                                left="">
                                {{ icons.mdiCellphoneScreenshot }}
                            </v-icon>
                            Ekran görüntüsü
                        </div>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div class="pl-2 pr-2 pt-8 pb-4">
                            <CalculatorShareDialogScreenshot
                                :data="screenshotData"
                                :title="title"
                                :matching-presets="matchingPresets" />
                        </div>
                    </v-expansion-panel-content>

                    <v-divider />
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header>
                        <div class="d-flex align-center">
                            <v-icon
                                class="mr-4"
                                left="">
                                {{ icons.mdiShareVariant }}
                            </v-icon>
                            Sosyal medya
                        </div>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div class="pl-2 pr-2 pt-8 pb-4">
                            <CalculatorShareDialogSocialMedia :data="formData" />
                        </div>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </div>
    </v-dialog>
</template>

<script>
import { mdiCellphoneScreenshot, mdiClose, mdiLink, mdiShareVariant } from "@mdi/js";

export default {
    data: () => ({
        icons: {
            mdiClose,
            mdiLink,
            mdiCellphoneScreenshot,
            mdiShareVariant
        },
        currentTab: 0
    }),
    props: {
        value: {
            type: Boolean
        },
        formData: {
            type: Object,
            required: true
        },
        screenshotData: {
            type: Object,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        matchingPresets: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        close() {
            const vm = this;
            vm.$emit("input", false);
        }
    }
};
</script>
