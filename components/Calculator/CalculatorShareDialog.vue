<template>
    <v-dialog
        :value="value"
        overlay-color="#000"
        overlay-opacity=".75"
        @close="close()"
        @click:outside="close()"
        width="700">
        <v-card>
            <v-toolbar flat="">
                <v-toolbar-title class="text-center">Paylaş</v-toolbar-title>

                <v-spacer />

                <v-btn
                    @click="close()"
                    icon="">
                    <v-icon>mdi-close</v-icon>
                </v-btn>

                <template v-slot:extension>
                    <v-tabs
                        v-model="currentTab"
                        grow="">
                        <v-tab>
                            <v-icon left="">mdi-link</v-icon>
                            Bağlantı
                        </v-tab>

                        <v-tab>
                            <v-icon left="">mdi-cellphone-screenshot</v-icon>
                            Ekran görüntüsü
                        </v-tab>

                        <v-tab>
                            <v-icon left="">mdi-share-variant</v-icon>
                            Sosyal medya
                        </v-tab>
                    </v-tabs>
                </template>
            </v-toolbar>

            <v-tabs-items v-model="currentTab">
                <v-tab-item>
                    <CalculatorShareDialogUrl :data="data" />
                </v-tab-item>

                <v-tab-item class="pa-8">
                    <v-alert
                        color="info"
                        text=""
                        class="ma-0">
                        Yakında 😉
                    </v-alert>
                </v-tab-item>

                <v-tab-item>
                    <CalculatorShareDialogSocialMedia :data="data" />
                </v-tab-item>
            </v-tabs-items>
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
        data: {
            type: Object,
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
