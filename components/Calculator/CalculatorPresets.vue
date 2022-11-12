<template>
    <div class="d-flex flex-wrap gap-2">
        <template v-for="_preset in presets">
            <v-chip
                :key="_preset.title"
                :to="_preset.url"
                class="h-auto ps-0"
                outlined="">
                <div
                    class="rounded-pill pa-2 me-3"
                    :style="{backgroundColor: _preset.color}">
                    <v-icon
                        size="24"
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
