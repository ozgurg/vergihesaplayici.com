<template>
    <div
        aria-expanded="true"
        class="calculator">
        <div class="container">
            <div class="calculator-box">
                <div class="calculator-box-left">
                    <form
                        :aria-label="props.page.title"
                        class="calculator-form"
                        @submit.prevent>
                        <form-group label="iPhone modeli">
                            <form-check-group
                                v-model="selectedSlug"
                                :items="PRESET_OPTIONS"
                                :required="true"
                                type="radio"
                                class="preset-options">
                                <template #preset="{ item }">
                                    <div class="preset-item">
                                        <img
                                            :src="staticUrl(`/img/thumb/${item.thumb}`).href"
                                            :alt="item.title"
                                            width="48"
                                            height="56"
                                            loading="lazy"
                                            decoding="async"
                                            aria-hidden="true"
                                            draggable="false"
                                            class="preset-item-thumb" />
                                        <div class="preset-item-info">
                                            <b>{{ item.title }}</b>
                                            <small>{{ item.description }}</small>
                                        </div>
                                    </div>
                                </template>
                            </form-check-group>
                        </form-group>

                        <form-group label="Para birimi">
                            <form-check-group
                                v-model="currencyMode"
                                :items="CURRENCY_OPTIONS"
                                :required="true"
                                scale="small"
                                type="radio"
                                class="currency-options" />
                        </form-group>
                    </form>

                    <hr />

                    <div class="calculator-alerts">
                        <alert color="info">
                            <p>
                                Fiyatlar <b>apple.com</b>'da aktif satılan resmi modellerden alınmakta ve döviz
                                kurlarıyla <b>günlük</b> güncellenmektedir.
                            </p>
                            <p>
                                Ülkesine göre vergi dahil veya hariç (örneğin ABD eyalet vergisi hariç) olabileceğinden,
                                veriler yalnızca <b>bilgilendirme</b> ve karşılaştırma amaçlıdır.
                            </p>
                        </alert>
                    </div>
                </div>

                <template v-if="comparison !== null">
                    <transition name="calculator-results-transition">
                        <div class="calculator-box-right">
                            <heading-3 tag="h2">
                                <string-carousel :text="`Apple ${comparison.preset.title} ülke fiyatları`" />
                            </heading-3>
                            <div class="calculator-results">
                                <country-price-bar-chart
                                    :items="comparison.items"
                                    :currency-mode="currencyMode"
                                    :usd-rate="usdRate" />
                            </div>
                        </div>
                    </transition>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Page } from "@/types/page-def.js";
import type { ExchangeRates } from "@/types/common.js";
import type { Item as FormCheckGroupItem } from "@/components/common/form/form-check-group.vue";
import { staticUrl } from "@/utils/url.js";
import {
    getActiveIphonePresets,
    getComparisonBySlug,
    getDefaultModelSlug
} from "@/domains/iphone-ulke-fiyatlari/db.js";
import CountryPriceBarChart from "@/domains/iphone-ulke-fiyatlari/components/country-price-bar-chart.vue";
import type { Preset } from "@/domains/telefon-vergisi/types.js";

export type CurrencyMode = "USD" | "TRY" | "local";

export type Props = {
    page: Page;
    EXCHANGE_RATES: ExchangeRates;
};

const props = defineProps<Props>();

const activePresets = getActiveIphonePresets();

const PRESET_OPTIONS = activePresets.map(_preset => ({
    title: _preset.title,
    description: _preset.options[0]?.title,
    thumb: _preset.thumb,
    input: {
        value: _preset.slug
    }
}));

const CURRENCY_OPTIONS: FormCheckGroupItem<CurrencyMode>[] = [
    {
        title: "USD",
        input: {
            value: "USD"
        }
    },
    {
        title: "TRY",
        input: {
            value: "TRY"
        }
    },
    {
        title: "Yerel",
        input: {
            value: "local"
        }
    }
];

const selectedSlug = ref<Preset["slug"]>(getDefaultModelSlug());
const currencyMode = ref<CurrencyMode>("USD");

const usdRate = computed<number>(() => {
    return props.EXCHANGE_RATES?.rates?.USD ?? 1;
});

const comparison = computed(() => {
    return getComparisonBySlug(selectedSlug.value);
});

onMounted(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const modelParam = searchParams.get("preset") as Preset["slug"];
    if (modelParam && activePresets.some(_preset => _preset.slug === modelParam)) {
        selectedSlug.value = modelParam;
    }
});
</script>

<style lang="scss" scoped>
.preset-options {
    grid-template-columns: repeat(2, 1fr);
    :deep(.preset-item) {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        gap: calc(var(--vh-spacer) * .5);
        @include vh-media-breakpoint-up(sm) {
            align-items: center;
            flex-direction: row;
            gap: var(--vh-spacer)
        }
    }
    :deep(.preset-item-thumb) {
        inline-size: calc(var(--vh-spacer) * 3);
        block-size: calc(var(--vh-spacer) * 3.5);
        object-fit: contain;
        flex-shrink: 0
    }
    :deep(.preset-item-info) {
        display: flex;
        flex-direction: column;
        min-inline-size: 0
    }
    :deep(small) {
        font-weight: var(--vh-fw-semibold)
    }
}

.currency-options {
    grid-template-columns: repeat(3, 1fr)
}
</style>
