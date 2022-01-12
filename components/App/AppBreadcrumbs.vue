<template>
    <v-breadcrumbs :items="items">
        <template v-slot:item="{ item }">
            <v-breadcrumbs-item
                :to="item.to"
                active-class=""
                nuxt="">
                {{ item.text }}
            </v-breadcrumbs-item>
        </template>
    </v-breadcrumbs>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            required: true
        }
    }
};
</script>
