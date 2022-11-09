<template>
    <div class="vh-presets">
        <template v-for="_preset in presets">
            <v-chip
                :key="_preset.title"
                :to="_preset.url"
                class="vh-presets__item"
                outlined="">
                <div
                    class="vh-presets__item__icon"
                    :style="{backgroundColor: _preset.color}">
                    <v-icon
                        size="28"
                        color="#fff">
                        {{ _preset.icon }}
                    </v-icon>
                </div>
                <span>
                    {{ _preset.title }}
                </span>
            </v-chip>
        </template>
    </div>
</template>

<script>
export default {
    props: {
        presets: {
            type: Array,
            required: true
        }
    }
};
</script>

<style scoped="" lang="scss">
.vh-presets {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    &__item {
        height: auto;
        padding-left: 0;
        &__icon {
            margin-right: 12px;
            border-radius: 100%;
            padding: 4px
        }
    }
}
</style>
