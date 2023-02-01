<template>
    <v-alert
        :icon="icon"
        text=""
        type="warning">
        Ürünlerin ülkeye giriş fiyatını bilmediğimiz için yurt dışı satış fiyatından hesaplanmıştır.
        <br />
        Piyasadaki satış fiyatı bu yüzden farklı olabilir.
    </v-alert>
</template>

<script>
import { mdiAlertDecagram } from "@mdi/js";

export default {
    data: () => ({
        icon: mdiAlertDecagram
    })
};
</script>
