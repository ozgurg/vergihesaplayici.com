<template>
    <div>
        <FormRow
            ref="resultTabs"
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
        isStuck: false,
        scrollListener: null
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
        _initScrollListener() {
            const vm = this;

            // I'm not using debounce or throttle here.
            // Because on iOS elastic scrolling makes it behave weird.
            // Maybe it's checked too often, but it's not "that much" important for now.
            vm.scrollListener = () => {
                vm.isStuck = vm.$refs.resultTabs.$el.offsetTop <= window.scrollY;
            };

            document.addEventListener("scroll", vm.scrollListener, { passive: true });
        }
    },
    mounted() {
        const vm = this;

        // TODO: Do the same behavior using IntersectionObserver if possible
        vm._initScrollListener();
    },
    destroyed() {
        const vm = this;
        document.removeEventListener("scroll", vm.scrollListener);
    }
};
</script>

<style lang="scss" scoped="">
@import "~vuetify/src/styles/styles.sass";

.vh-result-tabs {
    background: #121212; // Fallback color while the transition is playing/running/working? (What we called it? 🙂)
    @media(max-width: 959.98px) {
        position: sticky;
        z-index: 5; // Same as .v-app-bar.v-app-bar--fixed
        transition: $secondary-transition;
        top: 56px // AppBar height
    }
    &--stuck {
        @media(max-width: 959.98px) {
            background: map-get($material-dark-elevation-colors, "4");

            // Negative of MainContainer v-container .px-6
            margin-left: -24px;
            margin-right: -24px;
            @media (min-width: 600px) {
                // Negative of MainContainer v-container .px-sm-8
                margin-left: -32px;
                margin-right: -32px
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
@media(max-width: 959.98px) {
    :deep(.v-tabs-slider-wrapper) {
        transition: none !important
    }
}
</style>
