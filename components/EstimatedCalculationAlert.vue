<template>
    <v-alert
        :icon="icon"
        text=""
        type="warning">
        Ürünlerin ülkeye giriş fiyatını bilmediğimiz için yurtdışı satış fiyatından tahmini olarak
        hesaplanmıştır.<br />Türkiye'deki satış fiyatı muhtemelen daha az olacaktır.
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
