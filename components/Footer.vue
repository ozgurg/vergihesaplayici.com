<template>
    <div
        v-bind="$attrs"
        class="d-flex justify-center flex-column text-center pa-4">
        <p class="mb-4">vergihesaplayici.com, <a href="https://github.com/ozgurg" rel="nofollow noopener noreferrer" target="_blank">@ozgurg</a> tarafından açık kaynaklı olarak geliştirilmektedir</p>
        <div>
            <Ghbtns />
        </div>
    </div>
</template>

<script>
export default {
    name: "Footer"
};
</script>
