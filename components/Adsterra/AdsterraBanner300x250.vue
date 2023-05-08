<template>
    <AdsterraBanner
        ad-key="0d3d674f38bac18d6cee3ee7be286a99"
        :order="order"
        :width="300"
        :height="250" />
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
