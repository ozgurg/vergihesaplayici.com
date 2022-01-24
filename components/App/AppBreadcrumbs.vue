<template>
    <v-breadcrumbs
        v-if="items.length > 0"
        :items="items">
        <template v-slot:item="{ item }">
            <v-breadcrumbs-item
                :to="item.to"
                active-class=""
                nuxt="">
                {{ item.title }}
            </v-breadcrumbs-item>
        </template>
    </v-breadcrumbs>
</template>

<script>
import calculators from "@/data/calculators";

export default {
    computed: {
        /**
         * Taken from https://dev.to/lukeocodes/breadcrumbs-in-nuxt-5f2m with some improvements (@lukeocodes)
         * @return {[{to: string, title: string}]}
         */
        items() {
            const vm = this;

            const routeTitles = {
                "hesaplayicilar": "Hesaplayıcılar",
                "konsol-vergisi-hesaplayici": calculators.ConsoleTaxCalculator.title,
                "telefon-vergisi-hesaplayici": calculators.PhoneTaxCalculator.title
            };

            const fullPath = vm.$route.fullPath;
            const params = fullPath.startsWith("/") ? fullPath.substring(1).split("/") : fullPath.split("/");

            const breadcrumbs = [
                {
                    to: "/",
                    title: "Ana Sayfa"
                }
            ];

            let path = "";
            params.forEach(param => {
                // Remove query string
                param = param.split("?")[0];
                path = `${path}/${param}`;

                const route = vm.$router.match(path);

                if (route.name !== null && route.path !== "/") {
                    breadcrumbs.push({
                        to: path,
                        title: routeTitles[param] !== undefined ? routeTitles[param] : param
                    });
                }
            });

            return breadcrumbs;
        }
    }
};
</script>

<style scoped="">
.v-breadcrumbs {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    padding-left: 0 !important;
    padding-right: 0;
    -webkit-overflow-scrolling: touch
}
</style>
