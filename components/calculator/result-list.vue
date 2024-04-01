<template>
    <div class="vh-result-list d-flex flex-column">
        <calculator-result-form-row
            v-for="_item in items"
            :key="_item.key"
            :value="_item.value"
            :label="_item.key"
            :is-highlighted="_item.isHighlighted ?? false" />
    </div>
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

<style scoped="">
.vh-result-list {
    gap: 1.125rem
}
</style>
