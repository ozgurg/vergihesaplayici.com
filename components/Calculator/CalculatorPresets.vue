<template>
    <div
        v-bind="$attrs"
        class="chips">
        <v-tooltip
            v-for="(preset, index) in presets"
            :key="index"
            top="">
            <template #activator="{ on, attrs }">
                <v-chip
                    @click="choosePreset(preset)"
                    v-on="on"
                    v-bind="attrs"
                    :class="{'primary--text primary': value.includes(preset.id)}"
                    outlined="">
                    {{ preset.title }}
                </v-chip>
            </template>
            <span>{{ $moneyFormat(preset.price, preset.currency) }}</span>
        </v-tooltip>
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

/deep/ .v-chip {
    margin: 4px
}
</style>
