<template>
	<v-chip-group
        :value="value"
        @change="$emit('input', $event)"
        column="">
        <v-chip
            v-for="(preset, index) in presets"
            :key="index"
            :value="index"
            outlined="">
            {{ preset.title }}
        </v-chip>
    </v-chip-group>
</template>

<script>
export default {
    name: "Presets",
    props: {
        value: {
            type: Number,
            required: true
        },
        presets: {
            type: Array,
            required: true
        }
    }
};
</script>
