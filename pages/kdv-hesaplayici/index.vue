<template>
    <div>
        <AppBreadcrumbs :items="page.breadcrumbs" />

        <Heading1>
            {{ page.title }}
        </Heading1>

        <div class="mb-12">
            <template v-if="$vuetify.breakpoint.lgAndUp">
                <AdsterraBanner728x90 :order="0" />
            </template>
            <template v-else-if="$vuetify.breakpoint.mdAndDown">
                <AdsterraBanner300x250 :order="0" />
            </template>
        </div>

        <CalculatorInnerContainer>
            <FormRow
                class="mb-10"
                label="Hesaplama modu">
                <RadioGrid
                    v-model="form.mode"
                    :items="ui.modeOptions"
                    style="--vh-radio-grid-optimal-width:224px" />
            </FormRow>

            <FormRow
                class="mb-10"
                :label="priceLabel">
                <v-text-field
                    v-model.number="form.price"
                    v-number=""
                    :aria-label="priceLabel"
                    class="tabular-nums"
                    hide-details=""
                    hide-spin-buttons=""
                    filled=""
                    outlined=""
                    min="1"
                    inputmode="decimal"
                    type="number" />
            </FormRow>

            <FormRow
                class="mb-10"
                label="KDV oranı">
                <v-text-field
                    v-model.number="form.rate"
                    v-number=""
                    prefix="%"
                    hide-details=""
                    hide-spin-buttons=""
                    filled=""
                    outlined=""
                    min="1"
                    inputmode="decimal"
                    type="number"
                    aria-label="KDV oranı" />

                <div class="d-flex flex-wrap gap-2 mt-4">
                    <template v-for="_preset in ui.presets">
                        <v-chip
                            :key="_preset.title"
                            :class="{'primary--text primary': isPresetActive(_preset)}"
                            outlined=""
                            @click="choosePreset(_preset)">
                            {{ _preset.title }}
                        </v-chip>
                    </template>
                </div>
            </FormRow>

            <template v-if="shouldShowResults">
                <CalculatorResultList
                    :items="resultList"
                    class="mb-10" />

                <FormRow :is-horizontal="true">
                    <CalculatorShareButton
                        :screenshot-output="resultList"
                        :form="form"
                        :calculator-title="page.title" />
                </FormRow>
            </template>
        </CalculatorInnerContainer>

        <div class="mt-16">
            <template v-if="$vuetify.breakpoint.lgAndUp">
                <AdsterraBanner468x60 :order="1" />
            </template>
            <template v-else-if="$vuetify.breakpoint.mdAndDown">
                <AdsterraBanner320x50 :order="1" />
            </template>

            <AdsterraNative
                :order="2"
                ad-key="18d820d42a43bbb54b363d01dc952cf3"
                class="mt-8" />
        </div>
    </div>
</template>

<script>
import Calculator, { Mode } from "@/data/pages/kdv-hesaplayici/kdv-hesaplayici.calculator.js";
import page, { modeOptions } from "@/data/pages/kdv-hesaplayici/kdv-hesaplayici.page.js";
import { buildResultList, handleQuery, shouldShowResults } from "@/data/pages/kdv-hesaplayici/kdv-hesaplayici.utils.js";

export default {
    head() {
        return this.page.head;
    },
    data: () => ({
        page,
        ui: {
            modeOptions,
            presets: [
                { title: "Yüzde 1", form: { rate: 1 } },
                { title: "Yüzde 10", form: { rate: 10 } },
                { title: "Yüzde 20", form: { rate: 20 } }
            ]
        },
        form: {
            price: "",
            rate: 20,
            mode: Mode.TaxFreePriceToTaxAddedPrice
        },
        results: {}
    }),
    methods: {
        isPresetActive(preset) {
            const vm = this;
            return preset.form.rate === vm.form.rate;
        },
        choosePreset(preset) {
            const vm = this;
            vm.form.rate = preset.form.rate;
        },
        _calculate() {
            const vm = this;

            const calculator = new Calculator({
                price: vm.form.price,
                rate: vm.form.rate,
                mode: vm.form.mode
            });

            vm.results = calculator.calculate();
        },
        _handleQuery() {
            const vm = this;

            const query = handleQuery(vm.$route.query, {
                modeOptions: vm.ui.modeOptions
            });
            if (query) {
                Object.assign(vm.form, query);
            }
        }
    },
    computed: {
        shouldShowResults() {
            const vm = this;
            return shouldShowResults(vm.form);
        },
        resultList() {
            const vm = this;
            return buildResultList(vm.results);
        },
        priceLabel() {
            const vm = this;
            return {
                [Mode.TaxFreePriceToTaxAddedPrice]: "KDV hariç fiyat",
                [Mode.TaxAddedPriceToTaxFreePrice]: "KDV dahil fiyat"
            }[vm.form.mode];
        }
    },
    watch: {
        form: {
            deep: true,
            handler() {
                const vm = this;

                if (!vm.shouldShowResults) return;

                vm._calculate();

                vm.$router.push({ query: vm.form });
            }
        }
    },
    mounted() {
        const vm = this;
        vm.$nextTick(() => vm._handleQuery());
    }
};
</script>
