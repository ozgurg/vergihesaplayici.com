<template>
    <v-alert
        v-bind="$attrs"
        :icon="icon"
        text=""
        type="warning">
        Para birimi TRY olduğu için tersten hesaplama yapıldı.
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
