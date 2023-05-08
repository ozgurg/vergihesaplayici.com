<template>
    <AdsterraBanner
        ad-key="51184b214d2090fa752c7315ee766b9f"
        :order="order"
        :width="320"
        :height="50" />
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
