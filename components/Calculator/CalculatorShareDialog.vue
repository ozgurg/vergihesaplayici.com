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
        <div class="vh-dialog__header">
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

            <v-tabs
                v-model="currentTab"
                class="vh-share-tabs"
                grow=""
                background-color="transparent">
                <v-tab>
                    <v-icon left>
                        {{ icons.mdiLink }}
                    </v-icon>
                    <span>Bağlantı</span>
                </v-tab>
                <v-tab>
                    <v-icon left>
                        {{ icons.mdiCellphoneScreenshot }}
                    </v-icon>
                    <span>Ekran görüntüsü</span>
                </v-tab>
            </v-tabs>
        </div>

        <div class="vh-dialog__content">
            <v-tabs-items
                :value="currentTab"
                touchless="">
                <v-tab-item class="pa-5 pa-lg-8">
                    <CalculatorShareDialogUrl :data="formData" />
                </v-tab-item>

                <v-tab-item class="pa-5 pa-lg-8">
                    <CalculatorShareDialogScreenshot
                        :data="screenshotData"
                        :title="title"
                        :matching-presets="matchingPresets" />
                </v-tab-item>
            </v-tabs-items>
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

<style lang="scss" scoped="">
@import "~vuetify/src/styles/styles.sass";

.vh-share-tabs {
    background: map-get($material-dark-elevation-colors, "4")
}
</style>
