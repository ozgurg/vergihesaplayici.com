<template>
    <div class="vh-icon">
        <template v-if="isCustomIcon(icon)">
            <!-- eslint-disable vue/no-v-html -->
            <div v-html="loadCustomIconAsHtml(icon)" />
        </template>
        <template v-else>
            <v-icon
                :color="color"
                :size="size">
                {{ icon }}
            </v-icon>
        </template>
    </div>
</template>

<script>
import { isCustomIcon, loadCustomIconAsHtml } from "@/utils/custom-icon.js";

export default {
    props: {
        icon: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        size: {
            type: Number,
            default: 24
        }
    },
    methods: {
        isCustomIcon,
        loadCustomIconAsHtml
    }
};
</script>

<style lang="scss" scoped="">
.vh-icon {
    > div {
        width: 24px;
        height: 24px
    }
    :deep(svg) {
        fill: v-bind(color)
    }
}
</style>
