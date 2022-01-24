<template>
    <div>
        <AppHeader>{{ head.title }}</AppHeader>

        <InnerContainer>
            <CalculatorFormRow label="// TODO">
                // TODO
            </CalculatorFormRow>

            <CalculatorResultTabs
                v-model="ui.tab"
                :show-results="showResults"
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
    }
};
</script>
