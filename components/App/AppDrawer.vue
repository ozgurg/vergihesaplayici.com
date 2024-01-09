<template>
    <div>
        <v-navigation-drawer
            app=""
            touchless="">
            <div class="pa-4">
                <AppLogo />
            </div>
            <v-divider class="mx-4 mb-4" />

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

            <template #append>
                <app-footer class="d-none d-md-block pa-4" />
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
