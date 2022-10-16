<template>
    <v-dialog
        :value="value"
        :fullscreen="$vuetify.breakpoint.mdAndDown"
        :transition="transition"
        content-class="vh-dialog"
        overlay-color="#000"
        overlay-opacity=".75"
        width="700"
        @click:outside="close()"
        @close="close()">
        <div class="vh-dialog__header">
            <v-toolbar
                class="px-2"
                elevation="0">
                <v-toolbar-title class="text-center">
                    Paylaş
                </v-toolbar-title>

                <v-spacer />

                <v-btn
                    icon=""
                    @click="close()">
                    <v-icon>
                        {{ icons.mdiClose }}
                    </v-icon>
                </v-btn>
            </v-toolbar>

            <v-tabs
                v-model="currentTab"
                class="vh-share-tabs"
                grow=""
                background-color="transparent">
                <v-tab>
                    <v-icon left="">
                        {{ icons.mdiLink }}
                    </v-icon>
                    <span>Bağlantı</span>
                </v-tab>
                <v-tab>
                    <v-icon left="">
                        {{ icons.mdiCellphoneScreenshot }}
                    </v-icon>
                    <span>Ekran görüntüsü</span>
                </v-tab>
            </v-tabs>
        </div>

        <div class="vh-dialog__content">
            <template v-if="currentTab === 0">
                <div class="d-flex flex-column h-100">
                    <div class="mt-auto py-10 px-6 py-lg-12 px-lg-8">
                        <CalculatorShareDialogUrl :data="formData" />
                    </div>
                </div>
            </template>
            <template v-else-if="currentTab === 1">
                <div class="px-6 py-10 pa-lg-8">
                    <CalculatorShareDialogScreenshot
                        :data="screenshotData"
                        :calculator-title="calculatorTitle"
                        :preset-title="presetTitle" />
                </div>
            </template>
        </div>
    </v-dialog>
</template>

<script>
import { mdiCellphoneScreenshot, mdiClose, mdiLink } from "@mdi/js";

export default {
    data: () => ({
        icons: {
            mdiClose,
            mdiLink,
            mdiCellphoneScreenshot
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
        calculatorTitle: {
            type: String,
            required: true
        },
        presetTitle: {
            type: String,
            default: null
        }
    },
    methods: {
        close() {
            const vm = this;
            vm.$emit("input", false);
        }
    },
    computed: {
        transition() {
            const vm = this;
            return vm.$vuetify.breakpoint.mdAndDown ?
                "dialog-bottom-transition" :
                "dialog-transition";
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
