<template>
    <div
        v-bind="$attrs"
        class="chips">
        <v-tooltip
            v-for="(preset, index) in presets"
            :key="index"
            top="">
            <template v-slot:activator="{ on, attrs }">
                <v-chip
                    @click="emit(index)"
                    v-on="on"
                    v-bind="attrs"
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
