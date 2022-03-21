<template>
    <v-dialog
        @click:outside="close()"
        @close="close()"
        :value="value"
        :hide-overlay="$vuetify.breakpoint.smAndDown"
        :fullscreen="$vuetify.breakpoint.smAndDown"
        :transition="$vuetify.breakpoint.smAndDown ? 'dialog-bottom-transition' : 'dialog-transition'"
        overlay-color="#000"
        overlay-opacity=".75"
        width="700">
        <v-card>
            <v-toolbar
                class="dialog-toolbar px-2"
                flat="">
                <v-toolbar-title class="text-center">
                    Paylaş
                </v-toolbar-title>

                <v-spacer />

                <v-btn
                    @click="close()"
                    icon="">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>

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
                                mdi-link
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
                                mdi-cellphone-screenshot
                            </v-icon>
                            Ekran görüntüsü
                        </div>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div class="pl-2 pr-2 pt-8 pb-4">
                            <CalculatorShareDialogScreenshot
                                :data="screenshotData"
                                :title="title" />
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
                                mdi-share-variant
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
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    data: () => ({
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

<style scoped="">
.dialog-toolbar {
    position: sticky;
    top: 0;
    z-index: 50
}
</style>
