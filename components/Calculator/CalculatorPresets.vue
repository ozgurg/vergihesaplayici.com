<template>
    <div class="vh-presets">
        <template v-for="_preset in presets">
            <v-chip
                :key="_preset.title"
                :to="_preset.url"
                outlined="">
                {{ _preset.title }}
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

<style scoped="">
.vh-presets {
    display: flex;
    flex-wrap: wrap;
    gap: 8px
}
</style>
