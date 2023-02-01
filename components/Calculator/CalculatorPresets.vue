<template>
    <div class="d-flex flex-wrap gap-2">
        <template v-for="_preset in presets">
            <v-chip
                :key="_preset.title"
                :to="_preset.url"
                pill=""
                outlined="">
                <v-avatar
                    :color=" _preset.color"
                    left="">
                    <template v-if="isCustomIcon(_preset)">
                        <!-- eslint-disable vue/no-v-html -->
                        <!-- TODO: Needs refactor -->
                        <span style="width:24px;height:24px" v-html="loadCustomIconAsHtml(_preset)" />
                    </template>
                    <template v-else>
                        <v-icon size="24">
                            {{ _preset.icon }}
                        </v-icon>
                    </template>
                </v-avatar>
                <span>
                    {{ _preset.title }}
                </span>
            </v-chip>
        </template>
    </div>
</template>

<script>
import { isCustomIcon, loadCustomIconAsHtml } from "@/utils/load-custom-icon-as-html.js";

export default {
    props: {
        presets: {
            type: Array,
            required: true
        }
    },
    methods: {
        isCustomIcon(item) {
            return isCustomIcon(item.icon);
        },
        loadCustomIconAsHtml(item) {
            return loadCustomIconAsHtml(item.icon);
        }
    }
};
</script>
