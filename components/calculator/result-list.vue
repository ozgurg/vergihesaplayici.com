<template>
    <div class="d-flex flex-column gap-10">
        <template v-for="_item in props.items">
            <calculator-result-form-row
                :key="_item.key"
                :value="_item.value"
                :label="_item.key"
                :is-highlighted="_item.isHighlighted ?? false" />
        </template>
    </div>
</template>

<script setup="">
const props = defineProps({
    items: {
        type: Array,
        required: true
    }
});
</script>
