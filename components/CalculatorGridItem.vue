<template>
    <v-col
        cols="12"
        sm="6">
        <v-card
            :to="url"
            outlined=""
            class="vh-calculator-grid__item px-5 py-7 pa-sm-8 d-flex flex-column justify-space-between align-start h-100 overflow-hidden">
            <v-icon
                class="vh-calculator-grid__item__bg-icon"
                size="128">
                {{ icon }}
            </v-icon>

            <div class="vh-calculator-grid__item__icon d-inline-block pa-3 pa-lg-5 rounded">
                <v-icon
                    class="primary--text"
                    size="40">
                    {{ icon }}
                </v-icon>
            </div>

            <h2 class="text-h6 mt-5 mb-3 text--primary h-100">
                {{ title }}
            </h2>

            <!-- eslint-disable vue/no-v-text-v-html-on-component vue/no-v-html -->
            <p
                class="text-subtitle-2 mb-0 text--secondary"
                v-html="summary" />
        </v-card>
    </v-col>
</template>

<script>
export default {
    props: {
        url: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        summary: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="scss">
.vh-calculator-grid__item {
    position: relative;

    &__bg-icon {
        position: absolute !important;
        right: 0;
        bottom: 0;
        transform: translate(25%, 25%) rotate(-45deg);

        svg {
            fill: transparentize(#88DF95, .96)
        }
    }

    &__icon {
        background: transparentize(#88DF95, .92)
    }

    &:hover {
        &::before {
            opacity: .08
        }
    }
}
</style>
