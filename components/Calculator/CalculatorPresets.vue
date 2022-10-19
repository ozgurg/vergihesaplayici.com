<template>
    <div class="vh-presets">
        <template v-for="_preset in presets">
            <v-chip
                :key="_preset.id"
                :class="{'primary--text primary': value.includes(_preset.id)}"
                role="button"
                outlined=""
                @click="choosePreset(_preset)">
                {{ _preset.title }}
            </v-chip>
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
