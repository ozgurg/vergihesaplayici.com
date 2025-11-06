<!-- `main-` is used to avoid conflicts with the native `<footer />` element -->

<template>
    <footer class="main-footer">
        <container>
            <div
                class="exchange-rates"
                role="region"
                aria-label="Döviz kurları">
                <ul class="exchange-rates-list">
                    <template v-for="([_currencyCode, _rate]) in exchangeRates" :key="_currencyCode">
                        <li>
                            <small>{{ _currencyCode }}</small>
                            <b class="text-number">
                                {{ formatMoney(_rate, PRIMARY_CURRENCY_CODE) }}
                            </b>
                        </li>
                    </template>
                </ul>

                <div class="exchange-rates-info">
                    <div>
                        <small>Güncellenme tarihi</small>
                        <b>
                            <time :datetime="dateUpdated.toISOString()">
                                {{ dateUpdated.toLocaleString("tr-TR") }}
                            </time>
                        </b>
                    </div>
                    <div>
                        <small>Döviz verisi sağlayıcı</small>
                        <b>
                            <a
                                :href="API_PROVIDER_CREDIT.url.href"
                                class="link"
                                target="_blank"
                                rel="nofollow noopener noreferrer">
                                {{ API_PROVIDER_CREDIT.title }}
                            </a>
                        </b>
                    </div>
                </div>
            </div>

            <hr />

            <rich-text>
                <a href="https://github.com/ozgurg" target="_blank" rel="nofollow noopener noreferrer">@ozgurg</a> tarafından AGPL-3.0 lisansı altında <a href="https://github.com/ozgurg/vergihesaplayici.com" target="_blank" rel="nofollow noopener noreferrer">açık kaynaklı</a> olarak geliştirilmektedir
                <br />
                <a :href="hataBildirPage.url.href">{{ hataBildirPage.title }}</a> – v{{ VERSION }}
            </rich-text>
        </container>
    </footer>
</template>

<script lang="ts" setup>
import type { ExchangeRates } from "@/types/common.js";
import { formatMoney } from "@/utils/formatter.js";
import { API_PROVIDER_CREDIT } from "@/utils/exchange-rates.js";
import { version as VERSION } from "@root/package.json";
import { HataBildirPageDef } from "@/domains/hata-bildir/page-def.js";

const PRIMARY_CURRENCY_CODE = "TRY";

export type Props = {
    EXCHANGE_RATES: ExchangeRates;
}

const props = defineProps<Props>();

const exchangeRates = Object.entries(props.EXCHANGE_RATES.rates).filter(([currencyCode]) => currencyCode !== PRIMARY_CURRENCY_CODE);
const dateUpdated = new Date(props.EXCHANGE_RATES.dateUpdated);
const hataBildirPage = HataBildirPageDef();
</script>

<style lang="scss" scoped>
.main-footer {
    --_padding-block: calc(var(--vh-spacer) * 2);
    text-align: center;
    margin-block-start: auto;
    background: linear-gradient(to bottom, transparent, hsla(var(--vh-clr-primary-hsl), .02));
    padding-block-start: var(--_padding-block);
    padding-block-end: max(env(safe-area-inset-bottom), var(--_padding-block));
    hr {
        margin-block: var(--vh-spacer)
    }
    .exchange-rates {
        display: flex;
        flex-direction: column;
        align-items: center;
        &-list {
            display: inline-flex;
            flex-direction: row;
            gap: calc(var(--vh-spacer) * .75);
            margin-block-end: calc(var(--vh-spacer) * .75);
            li {
                padding-block: calc(var(--vh-spacer) * .75);
                min-inline-size: 5.625rem;
                background: hsla(var(--vh-clr-white-hsl), .06);
                @include vh-squircle(var(--vh-br-normal));
                display: flex;
                flex-direction: column;
                small {
                    opacity: .875
                }
                b {
                    font-weight: var(--vh-fw-bold)
                }
            }
        }
        &-info {
            display: inline-flex;
            flex-direction: row;
            gap: calc(var(--vh-spacer) * 1.25);
            div {
                display: flex;
                flex-direction: column;
                min-inline-size: 10rem;
                font-size: var(--vh-fs-sm);
                &:first-child {
                    text-align: end
                }
                &:last-child {
                    text-align: start
                }
                small {
                    opacity: .75
                }
                b {
                    opacity: .875;
                    font-weight: var(--vh-fw-bold)
                }
            }
        }
    }
}
</style>
