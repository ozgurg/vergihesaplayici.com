<template>
    <div>
        <AppHeader>{{ head.title }}</AppHeader>

        <InnerContainer>
            <CalculatorHorizontalForm label="// TODO">
                // TODO
            </CalculatorHorizontalForm>

            <CalculatorResultTabs
                v-model="ui.tab"
                :show-results="showResults"
                ref="resultTabs"
                class="mt-10">
                <template v-if="showResults">
                    // TODO
                </template>
            </CalculatorResultTabs>
        </InnerContainer>
    </div>
</template>

<script>
import openGraphImage from "@/assets/img/open-graph/vat-calculator.jpg";
import { VatCalculator as meta } from "@/data/calculators.js";

export default {
    layout: "default/index",
    data: () => ({
        head: {
            title: meta.title,
            meta: [
                { hid: "title", name: "title", content: meta.title },
                { hid: "description", name: "description", content: meta.description },
                { hid: "og:title", name: "og:title", content: meta.title },
                { hid: "og:description", name: "og:description", content: meta.description },
                { hid: "og:image", name: "og:image", content: openGraphImage },
                { name: "twitter:image", content: openGraphImage }
            ]
        },
        ui: {
            tab: 1
        },
        form: {
            price: ""
        },
        results: {
            prices: {},
            taxFees: {},
            taxRates: {}
        }
    }),
    methods: {
        calculate() {
            // TODO
        },
        handleQuery() {
            const vm = this;

            const query = vm.$route.query;
            if (!query) return;

            if (query.price) {
                vm.form.price = parseFloat(query.price);
            }
        },
        setBreadcrumbs() {
            const vm = this;
            vm.$store.set("ui/breadcrumbs", [
                { text: "Ana Sayfa", to: "/" },
                { text: "Hesaplayıcılar", to: "/hesaplayicilar" },
                { text: meta.title, to: vm.$route.path }
            ]);
        },
        scrollToResultTabs() {
            const vm = this;
            vm.$vuetify.goTo(vm.$refs["resultTabs"], {
                easing: "easeInQuad",
                duration: 375
            });
        }
    },
    computed: {
        showResults() {
            const vm = this;
            return vm.form.price > 0;
        }
    },
    watch: {
        form: {
            deep: true,
            handler() {
                const vm = this;

                if (!vm.showResults) return;

                vm.calculate();

                // Show results tab when calculated
                vm.ui.tab = 0;

                vm.$router.push({ query: vm.form });

                vm.scrollToResultTabs();
            }
        }
    },
    head() {
        const vm = this;
        return vm.head;
    },
    mounted() {
        const vm = this;

        vm.$nextTick(() => {
            setTimeout(() => vm.handleQuery(), 100);
        });

        vm.setBreadcrumbs();
    }
};
</script>
