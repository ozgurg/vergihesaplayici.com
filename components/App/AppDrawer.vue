<template>
    <div>
        <v-navigation-drawer
            app=""
            touchless="">
            <template #prepend>
                <div class="px-4 py-4">
                    <AppLogo class="py-4" />
                </div>
                <v-divider class="mx-4 mb-2" />
            </template>

            <div class="d-flex flex-column h-100">
                <CalculatorList />

                <v-list
                    class="mb-auto"
                    subheader="">
                    <v-subheader class="d-flex flex-row justify-space-between">
                        <span>Döviz kurları</span>
                        <v-btn
                            href="https://www.exchangerate-api.com"
                            target="_blank"
                            plain=""
                            small=""
                            rel="nofollow noopener noreferrer"
                            class="mx-n2">
                            Exchange Rate API
                            <v-icon
                                size="12"
                                right="">
                                {{ icons.mdiOpenInNew }}
                            </v-icon>
                        </v-btn>
                    </v-subheader>
                    <v-list-item>
                        <ExchangeRateGrid />
                    </v-list-item>
                </v-list>
            </div>

            <template #append>
                <div class="d-none d-md-block pa-4">
                    <AppFooter />
                </div>
            </template>
        </v-navigation-drawer>
        <v-overlay
            opacity=".75"
            color="#000"
            @click="closeDrawer()" />
    </div>
</template>

<script>
import { mdiOpenInNew } from "@mdi/js";
import { closeDrawer } from "@/utils/drawer.js";

export default {
    data: () => ({
        icons: {
            mdiOpenInNew
        }
    }),
    methods: {
        closeDrawer
    },
    watch: {
        "$route"() {
            closeDrawer();
        }
    }
};
</script>
