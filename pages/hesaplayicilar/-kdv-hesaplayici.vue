<template>
    <div>
        <AppHeader>{{ head.title }}</AppHeader>

        <InnerContainer>
            <CalculatorFormRow class="mb-10" label="Hesaplama modu">
                <v-radio-group
                    v-model="form.mode"
                    hide-details=""
                    class="pa-0 ma-0">
                    <v-radio
                        v-for="item in ui.mode"
                        :key="item.value"
                        :label="item.title"
                        :value="item.value" />
                </v-radio-group>
            </CalculatorFormRow>

            <CalculatorFormRow
                class="mb-10"
                :label="priceLabel">
                <v-text-field
                    v-model.number="form.price"
                    :aria-label="priceLabel"
                    hide-details=""
                    outlined=""
                    step="any"
                    min="1"
                    type="number" />
            </CalculatorFormRow>

            <CalculatorFormRow class="mb-4">
                <CalculatorPresets
                    @click="choosePreset($event)"
                    :value="matchingPresetIds"
                    :presets="ui.presets" />
            </CalculatorFormRow>

            <CalculatorFormRow
                label="KDV oranı">
                <v-text-field
                    v-model.number="form.rate"
                    prefix="%"
                    hide-details=""
                    outlined=""
                    step="1"
                    min="1"
                    type="number"
                    aria-label="KDV oranı" />
            </CalculatorFormRow>

            <CalculatorResultTabs
                v-model="ui.tab"
                :show-results="shouldShowResults"
                class="mt-10">
                <template v-if="shouldShowResults">
                    <CalculatorResultFormRow
                        v-for="(item, index) in resultList"
                        :key="index"
                        :value="item.value"
                        :label="item.key"
                        class="mb-5" />
                </template>
            </CalculatorResultTabs>
        </InnerContainer>
    </div>
</template>

<script>
import openGraphImage from "@/assets/img/open-graph/vat-calculator.jpg";
import { VatCalculator as meta } from "@/data/calculators.js";
import VatCalculator, { Mode } from "@/calculators/VatCalculator.js";
import {
    createCalculatorMatchingPresetIds
} from "~/utils/find-calculator-matching-presets.js";

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
            tab: 1,
            presets: [
                { id: 1, title: "Yüzde 1", form: { rate: 1 } },
                { id: 2, title: "Yüzde 8", form: { rate: 8 } },
                { id: 3, title: "Yüzde 18", form: { rate: 18 } }
            ],
            mode: [
                { title: "KDV hariç fiyattan KDV dahil fiyatı hesapla", value: Mode.TaxFreePriceToTaxAddedPrice },
                { title: "KDV dahil fiyattan KDV hariç fiyatı hesapla", value: Mode.TaxAddedPriceToTaxFreePrice }
            ]
        },
        form: {
            price: null,
            rate: 18,
            mode: Mode.TaxFreePriceToTaxAddedPrice
        },
        results: {
            prices: {},
            taxFees: {},
            taxRates: {}
        }
    }),
    methods: {
        calculate() {
            const vm = this;

            const calculator = new VatCalculator({
                price: vm.form.price,
                mode: vm.mode
            });
            const results = calculator.calculate().results();

            vm.results.prices = results.prices;
            vm.results.taxFees = results.taxFees;
            vm.results.taxRates = results.taxRates;
        },
        handleQuery() {
            const vm = this;

            const query = vm.$route.query;
            if (!query) return;

            if (query.price) {
                vm.form.price = parseFloat(query.price);
            }

            if (query.mode && vm.ui.mode.some(object => object.value === query.mode)) {
                vm.form.mode = query.mode;
            }
        },
        choosePreset(preset) {
            const vm = this;
            Object.assign(vm.form, preset.form);
        }
    },
    computed: {
        resultList() {
            const vm = this;
            return [
                {
                    key: vm.priceLabel,
                    value: vm.$moneyFormat(vm.form.price, "TRY")
                }
            ];
        },
        priceLabel() {
            const vm = this;
            return {
                [Mode.TaxFreePriceToTaxAddedPrice]: "KDV hariç fiyat",
                [Mode.TaxAddedPriceToTaxFreePrice]: "KDV dahil fiyat"
            }[vm.form.mode];
        },
        shouldShowResults() {
            const vm = this;
            return vm.form.price > 0;
        },
        matchingPresets() {
            const vm = this;
            return vm.ui.presets.filter(preset => preset.form.rate === vm.form.rate);
        },
        matchingPresetIds() {
            const vm = this;
            return createCalculatorMatchingPresetIds(vm.matchingPresets);
        }
    },
    watch: {
        form: {
            deep: true,
            handler() {
                const vm = this;

                if (!vm.shouldShowResults) return;

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
