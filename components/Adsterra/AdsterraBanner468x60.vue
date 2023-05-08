<template>
    <AdsterraBanner
        ad-key="d3cf4aba5ef0cdc8fa7bf42835fb7c5a"
        :order="order"
        :width="468"
        :height="60" />
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
