<template>
    <AdsterraBanner
        ad-key="ea41998ee0ef1f5b532cd70152165ba2"
        :order="order"
        :width="160"
        :height="300" />
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
