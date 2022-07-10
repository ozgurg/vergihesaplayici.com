<template>
    <div>
        <AppHeader>{{ head.title }}</AppHeader>

        <InnerContainer>
            <CalculatorFormRow
                class="mb-5"
                :label="priceLabel">
                <v-text-field
                    v-model.number="form.price"
                    hide-details=""
                    outlined=""
                    step="any"
                    min="1"
                    type="number"
                    aria-label="Fiyat" />
            </CalculatorFormRow>

            <CalculatorFormRow class="mb-5">
                <v-radio-group v-model.number="form.mode">
                    <v-radio
                        label="KDV hariç fiyattan KDV dahil fiyatı hesapla"
                        :value="1" />

                    <v-radio
                        label="KDV dahil fiyattan KDV hariç fiyatı hesapla"
                        :value="2" />
                </v-radio-group>
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
            price: "",
            mode: 1
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
        priceLabel() {
            const vm = this;
            return {
                1: "KDV dahil fiyat",
                2: "KDV hariç fiyat"
            }[vm.form.mode];
        },
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
