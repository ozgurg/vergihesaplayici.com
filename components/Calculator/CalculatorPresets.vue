<template>
    <!-- TODO: Make v-chip one -->
    <div
        v-bind="$attrs"
        class="chips">
        <template v-for="(preset, index) in presets">
            <template v-if="$scopedSlots.tooltip">
                <v-tooltip
                    :key="index"
                    top="">
                    <template #activator="{ on, attrs }">
                        <v-chip
                            @click="choosePreset(preset)"
                            v-on="on"
                            v-bind="attrs"
                            role="button"
                            :class="{'primary--text primary': value.includes(preset.id)}"
                            outlined="">
                            {{ preset.title }}
                        </v-chip>
                    </template>
                    <div>
                        <slot
                            name="tooltip"
                            :preset="preset" />
                    </div>
                </v-tooltip>
            </template>
            <template v-else>
                <v-chip
                    :key="index"
                    @click="choosePreset(preset)"
                    role="button"
                    :class="{'primary--text primary': value.includes(preset.id)}"
                    outlined="">
                    {{ preset.title }}
                </v-chip>
            </template>
        </template>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Array,
            required: true
        },
        presets: {
            type: Array,
            required: true
        }
    },
    methods: {
        choosePreset(preset) {
            const vm = this;
            vm.$emit("click", preset);
        }
    }
};
</script>

<style scoped="">
.chips {
    margin: -4px
}

:deep(.v-chip) {
    margin: 4px
}
</style>
