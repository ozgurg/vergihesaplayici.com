<template>
    <div class="d-flex flex-wrap gap-2">
        <template v-for="_preset in presets">
            <v-chip
                :key="_preset.title"
                :to="_preset.url"
                pill=""
                outlined="">
                <v-avatar
                    :color=" _preset.color"
                    left="">
                    <v-icon size="24">
                        {{ _preset.icon }}
                    </v-icon>
                </v-avatar>
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
