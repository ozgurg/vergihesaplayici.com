<template>
    <div>
        <app-breadcrumbs :items="page.breadcrumbs" />

        <heading-1>
            {{ page.title }}
        </heading-1>

        <calculator-inner-container>
            <form-row
                class="mb-10"
                label="Hesaplama modu">
                <radio-grid
                    v-model="form.mode"
                    :items="ui.modeOptions" />
            </form-row>

            <form-row
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
            </form-row>

            <form-row
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
                            class="py-6 justify-center rounded-pill flex-1"
                            @click="choosePreset(_preset)">
                            {{ _preset.title }}
                        </v-chip>
                    </template>
                </div>
            </form-row>

            <template v-if="shouldShowResults">
                <calculator-result-list
                    :items="resultList"
                    class="mb-10" />

                <form-row
                    label="Sonuçları paylaş"
                    direction="horizontal">
                    <calculator-quick-share
                        :query-string="form"
                        @click:other="showShareDialog()" />
                    <calculator-share-dialog
                        v-model="ui.isShareDialogShown"
                        :screenshot-output="resultList"
                        :form="form"
                        :calculator-title="page.title" />
                </form-row>
            </template>
        </calculator-inner-container>
    </div>
</template>

<script>
import Calculator, { Mode } from "@/domain/kdv-hesaplayici/calculator.js";
import { modeOptions } from "@/domain/kdv-hesaplayici/mode-options.js";
import { buildResultList, handleQuery, shouldShowResults } from "@/domain/kdv-hesaplayici/utils.js";
import { KdvHesaplayiciPageDef } from "@/domain/kdv-hesaplayici/index.page-def.js";

const kdvHesaplayiciPage = KdvHesaplayiciPageDef();

export default {
    head() {
        return this.page.head;
    },
    data: () => ({
        page: kdvHesaplayiciPage,
        ui: {
            modeOptions,
            presets: [
                {
                    title: "%1",
                    form: { rate: 1 }
                },
                {
                    title: "%8",
                    form: { rate: 8 }
                },
                {
                    title: "%10",
                    form: { rate: 10 }
                },
                {
                    title: "%18",
                    form: { rate: 18 }
                },
                {
                    title: "%20",
                    form: { rate: 20 }
                }
            ],
            isShareDialogShown: false
        },
        form: {
            price: "",
            rate: 20,
            mode: Mode.TaxFreePriceToTaxAddedPrice
        },
        results: {}
    }),
    methods: {
        showShareDialog() {
            const vm = this;
            vm.ui.isShareDialogShown = true;
        },
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
