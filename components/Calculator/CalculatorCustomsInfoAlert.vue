<template>
    <v-alert
        v-bind="$attrs"
        :icon="icon"
        text=""
        type="warning">
        Ürünlerin ülkeye giriş fiyatını bilmediğimiz için yurtdışı satış fiyatından tahmini olarak
        hesaplanmıştır. Türkiye'deki satış fiyatı muhtemelen daha az olacaktır.
    </v-alert>
</template>

<script>
import { mdiNoteSearch } from "@mdi/js";

export default {
    data: () => ({
        icon: mdiNoteSearch
    })
};
</script>

<style scoped="">
:deep(.v-alert__icon) {
    align-self: center
}
</style>
