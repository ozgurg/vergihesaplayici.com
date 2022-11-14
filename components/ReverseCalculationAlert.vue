<template>
    <v-alert
        :icon="icon"
        text=""
        type="warning">
        Para birimi TRY olduğu için ters hesaplama yapıldı.
    </v-alert>
</template>

<script>
import { mdiBackupRestore } from "@mdi/js";

export default {
    data: () => ({
        icon: mdiBackupRestore
    })
};
</script>
