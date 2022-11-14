<template>
    <div>
        <FormRow
            v-intersect="vIntersect"
            :class="{'vh-result-tabs--stuck': isStuck}"
            class="vh-result-tabs mb-4">
            <v-tabs
                :value="value"
                background-color="transparent"
                fixed-tabs=""
                @change="emit($event)">
                <v-tab :disabled="!shouldShowResults">
                    <v-icon left="">
                        {{ icons.mdiFormatListBulletedType }}
                    </v-icon>
                    <span>Sonuçlar</span>
                </v-tab>
                <v-tab>
                    <v-icon left="">
                        {{ icons.mdiCommentMultipleOutline }}
                    </v-icon>
                    <span>Yorumlar</span>
                </v-tab>
            </v-tabs>
        </FormRow>

        <template v-if="value === 0">
            <slot />
        </template>

        <!-- FIXME: Adding v-if directly to the component (or <template />) breaks the component. That's why it's wrapped with <div />. -->
        <div v-if="value === 1">
            <DisqusComments />
        </div>
    </div>
</template>

<script>
import { mdiCommentMultipleOutline, mdiFormatListBulletedType } from "@mdi/js";

export default {
    data: () => ({
        icons: {
            mdiFormatListBulletedType,
            mdiCommentMultipleOutline
        },
        isStuck: false
    }),
    props: {
        value: {
            type: Number,
            required: true
        },
        shouldShowResults: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        emit(value) {
            const vm = this;
            vm.$emit("input", value);
        },
        onIntersect(entries) {
            const vm = this;
            vm.isStuck = !entries[0].isIntersecting;
        }
    },
    computed: {
        vIntersect() {
            const vm = this;
            return {
                handler: vm.onIntersect,
                options: {
                    threshold: 1,
                    rootMargin: "-56px 0px 100% 0px" // 56px = top offset (AppBar height) / 100% makes disable bottom
                }
            };
        }
    }
};
</script>

<style lang="scss" scoped="">
@import "~vuetify/src/styles/styles.sass";

.vh-result-tabs {
    background: #121212; // Fallback color while the transition is playing/running/working? (What we called it? 🙂)
    @media #{map-get($display-breakpoints, "sm-and-down")} {
        position: sticky;
        z-index: 5; // Same as .v-app-bar.v-app-bar--fixed
        transition: $secondary-transition;
        top: 55px // 55px = top offset (AppBar height) - 1px
    }

    &--stuck {
        @media #{map-get($display-breakpoints, "sm-and-down")} {
            background: map-get($material-dark-elevation-colors, "4");

            $px6: $spacer * 6;
            $px8: $spacer * 8;

            // Negative of MainContainer v-container .px-6
            margin-left: -$px6;
            margin-right: -$px6;
            @media #{map-get($display-breakpoints, "sm-and-up")} {
                // Negative of MainContainer v-container .px-sm-8
                margin-left: -$px8;
                margin-right: -$px8
            }
        }
    }
}
</style>

<style scoped="">
:deep(.v-tabs-items) {
    background: 0 !important
}

/*
We set negative margin for .vh-result-tabs when it's stuck,
and then the transition of .v-tabs-slider-wrapper works and makes it look swinging.
I didn't like this behavior, so I disabled the transition.
*/
@media (max-width: 959.98px) {
    :deep(.v-tabs-slider-wrapper) {
        transition: none !important
    }
}
</style>
