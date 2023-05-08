<template>
    <AdsterraBanner
        ad-key="e259de126279f411f0ec373b2fb0d224"
        :order="order"
        :width="728"
        :height="90" />
</template>

<script>
export default {
    props: {
        order: {
            type: Number,
            required: true
        }
    }
};
</script>
