<template>
    <!-- TODO: Make v-chip one -->
    <div class="vh-presets">
        <template v-for="preset in presets">
            <template v-if="$scopedSlots.tooltip">
                <v-tooltip
                    :key="preset.id"
                    top="">
                    <template #activator="{ on, attrs }">
                        <v-chip
                            v-bind="attrs"
                            role="button"
                            :class="{'primary--text primary': value.includes(preset.id)}"
                            outlined=""
                            @click="choosePreset(preset)"
                            v-on="on">
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
                    :key="preset.id"
                    role="button"
                    :class="{'primary--text primary': value.includes(preset.id)}"
                    outlined=""
                    @click="choosePreset(preset)">
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
.vh-presets {
    display: flex;
    flex-wrap: wrap;
    gap: 8px
}
</style>
