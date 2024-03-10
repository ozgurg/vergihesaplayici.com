import { Registration } from "@/domain/telefon-vergisi-hesaplayici/calculator.js";
import { isCurrencyAvailable } from "@/utils/is-currency-available.js";
import { moneyFormat } from "@/utils/formatter.js";

/**
 * Decides whether to show the calculator results or not.
 * It doesn't validate the inputs. They must be validated before it can be used.
 *
 * @param {{[key: string]: *}} form
 * @returns {boolean}
 */
const shouldShowResults = form => {
    return form.price > 0 &&
        form.currency !== "" &&
        form.registration !== "";
};

/**
 * @param {{[key: string]: *}} query
 * @param {object} requirements
 * @param {string[]} requirements.availableCurrencies
 * @param {{value: string}[]} requirements.registration
 * @returns {{price: number, currency: string, registration: string}|void}
 */
const handleQuery = (query, { availableCurrencies, registration }) => {
    const form = {};

    if (!query) return;

    if (query.price && query.price > 0) {
        form.price = parseFloat(query.price);
    }

    if (query.currency && isCurrencyAvailable(query.currency, availableCurrencies)) {
        form.currency = query.currency;
    }

    const isValidRegistrationValue = registration.some(object => object.value === query.registration);
    if (query.registration && isValidRegistrationValue) {
        form.registration = query.registration;
    }

    return form;
};

/**
 * @param {{[key: string]: {[key: string]: number}}} results
 * @param {Registration} registration
 * @returns {{key: string, value: string}[]}
 */
const buildResultList = (results, registration) => {
    return [
        {
            key: "Vergisiz fiyat",
            value: moneyFormat(results.prices.taxFree, "TRY")
        },
        ...(() => {
            if (registration === Registration.Import) {
                return [
                    {
                        key: `Kültür Bakanlığı (%${results.taxRates.ministryOfCulture})`,
                        value: moneyFormat(results.taxFees.ministryOfCulture, "TRY")
                    },
                    {
                        key: `TRT bandrolü (%${results.taxRates.trtImport})`,
                        value: moneyFormat(results.taxFees.trtImport, "TRY")
                    },
                    {
                        key: `ÖTV (%${results.taxRates.specialConsumptionTax})`,
                        value: moneyFormat(results.taxFees.specialConsumptionTax, "TRY")
                    },
                    {
                        key: `KDV (%${results.taxRates.valueAddedTax})`,
                        value: moneyFormat(results.taxFees.valueAddedTax, "TRY")
                    }
                ];
            } else {
                return [
                    {
                        key: `TRT bandrolü (${moneyFormat(results.taxRates.trtPassport, "EUR")})`,
                        value: moneyFormat(results.taxFees.trtPassport, "TRY")
                    },
                    {
                        key: "Kayıt ücreti",
                        value: moneyFormat(results.taxFees.registration, "TRY")
                    }
                ];
            }
        })(),
        {
            key: `Toplam vergi (%${results.taxRates.total})`,
            value: moneyFormat(results.taxFees.total, "TRY")
        },
        {
            key: "Tahmini satış fiyatı",
            value: moneyFormat(results.prices.taxAdded, "TRY")
        }
    ];
};

/**
 * @param {object} opts
 * @param {number} opts.price
 * @param {string} opts.currency
 * @param {string} opts.registrationTitle
 * @returns {{key: string, value: string}[]}
 */
const buildScreenshotInput = ({ price, currency, registrationTitle }) => {
    return [
        {
            key: "Telefon fiyatı",
            value: moneyFormat(price, currency)
        },
        {
            key: "Kayıt yolu",
            value: registrationTitle
        }
    ];
};

export {
    shouldShowResults,
    handleQuery,
    buildResultList,
    buildScreenshotInput
};
