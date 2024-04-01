<template>
    <div
        class="vh-icon"
        :style="style">
        <template v-if="isCustomIcon(icon)">
            <!-- eslint-disable vue/no-v-html -->
            <!-- FIXME: We don't need the wrapping "span" for it to work properly. It needs to be removed somehow. -->
            <span
                aria-hidden="true"
                v-html="loadCustomIconAsHtml(icon)" />
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
            default: "inherit"
        },
        size: {
            type: Number,
            default: 24
        }
    },
    methods: {
        isCustomIcon,
        loadCustomIconAsHtml
    },
    computed: {
        style() {
            const vm = this;
            return {
                "--vh-icon-size": `${vm.size}px`,
                "--vh-icon-color": vm.color
            };
        }
    }
};
</script>

<style>
.vh-icon {
    color: var(--vh-icon-color);
    width: var(--vh-icon-size);
    height: var(--vh-icon-size);

    svg {
        fill: currentColor
    }
}
</style>
