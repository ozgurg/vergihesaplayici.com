<template>
    <v-alert
        :icon="icon"
        text=""
        type="warning">
        Ürünlerin ülkeye giriş fiyatını bilmediğimiz için yurtdışı satış fiyatından tahmini olarak hesaplanmıştır.
        Gerçek satış fiyatı çoğunlukla hesaplanandan daha azdır.
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
