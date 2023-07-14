<template>
    <div class="vh-result-list">
        <CalculatorResultFormRow
            v-for="_item in items"
            :key="_item.key"
            :value="_item.value"
            :label="_item.key" />
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
    display: flex;
    flex-flow: column wrap;
    gap: 1.125rem
}
</style>
