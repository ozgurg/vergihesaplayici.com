<template>
    <!-- TODO: Make v-chip one -->
    <div class="vh-presets">
        <template v-for="_preset in presets">
            <template v-if="$scopedSlots.tooltip">
                <v-tooltip
                    :key="_preset.id"
                    top="">
                    <template #activator="{ on, attrs }">
                        <v-chip
                            v-bind="attrs"
                            :class="{'primary--text primary': value.includes(_preset.id)}"
                            role="button"
                            outlined=""
                            @click="choosePreset(_preset)"
                            v-on="on">
                            {{ _preset.title }}
                        </v-chip>
                    </template>
                    <div>
                        <slot
                            name="tooltip"
                            :preset="_preset" />
                    </div>
                </v-tooltip>
            </template>
            <template v-else>
                <v-chip
                    :key="_preset.id"
                    :class="{'primary--text primary': value.includes(_preset.id)}"
                    role="button"
                    outlined=""
                    @click="choosePreset(_preset)">
                    {{ _preset.title }}
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
.vh-presets {
    display: flex;
    flex-wrap: wrap;
    gap: 8px
}
</style>
