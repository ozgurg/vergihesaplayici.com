<template>
    <div
        v-bind="$attrs"
        class="chips">
        <v-chip
            v-for="(preset, index) in presets"
            :key="index"
            @click="emit(index)"
            outlined="">
            {{ preset.title }}
        </v-chip>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Number,
            required: true
        },
        presets: {
            type: Array,
            required: true
        }
    },
    methods: {
        emit(value) {
            const vm = this;
            vm.$emit("input", value);
        }
    }
};
</script>

<style scoped="">
.chips {
    margin: -4px
}

/deep/ .v-chip {
    margin: 4px
}
</style>
