import {
    calculateTaxFromTaxAddedPrice,
    calculateTaxFromTaxFreePrice,
    calculateTotalTaxRate
} from "@/utils/calculate-tax.js";
import { normalizeCalculatorResults } from "@/utils/normalize-calculator-results.js";

/**
 * @param {number} price
 * @returns {number}
 */
const getSpecialConsumptionTaxRateByPrice = price => {
    if (price <= 640) {
        return 25;
    } else if (price > 640 && price < 1500) {
        return 40;
    }

    // price >= 1500
    return 50;
};

/**
 * @typedef Registration
 * @type {{Passport: string, Import: string}}
 */
const Registration = {
    Import: "import",
    Passport: "passport"
};

/**
 * `null` values will be assigned while calculating.
 * TRT: Turkish Radio and Television Corporation (@link https://en.wikipedia.org/wiki/Turkish_Radio_and_Television_Corporation)
 */
class Calculator {
    /**
     * @type {{[key: string]: number|null}}
     */
    #taxFees = {
        total: null,
        ministryOfCulture: null, // TRY | Turkish: Kültür Bakanlığı
        trtImport: null, // TRY | Turkish: İthalat yoluyla kayıtlı: TRT bandrolü
        specialConsumptionTax: null, // TRY | Turkish: Özel Tüketim Vergisi (ÖTV)
        valueAddedTax: null, // TRY | Turkish: Katma Değer Vergisi (KDV)
        trtPassport: null, // TRY | Turkish: Pasaport yoluyla kayıtlı: TRT bandrolü
        registration: 20000 // TRY | Turkish: Pasaport yoluyla kayıtlı: Kayıt ücreti
    };

    /**
     * @type {{[key: string]: number|null}}
     */
    #taxRates = {
        total: null,
        ministryOfCulture: 1, // Percentage of previous price | Turkish: Kültür Bakanlığı
        trtImport: 12, // Percentage of previous price | Turkish: İthalat yoluyla kayıtlı: TRT bandrolü
        specialConsumptionTax: null, // Percentage of previous price. Varies by the price (See @link getSpecialConsumptionTaxRateByPrice) | Turkish: Özel Tüketim Vergisi (ÖTV)
        valueAddedTax: 20, // Percentage of previous price | Turkish: Katma Değer Vergisi (KDV)
        trtPassport: 20 // EUR | Turkish: Pasaport yoluyla kayıtlı: TRT bandrolü
    };

    /**
     * @type {{[key: string]: number|null}}
     */
    #prices = {
        taxFree: null,
        taxAdded: null
    };

    #price;
    #registration;
    #eurToTryCurrency;
    #calculateFromTaxAddedPrice;

    /**
     * @param {object} params
     * @param {number} params.price
     * @param {Registration} params.registration
     * @param {number} params.eurToTryCurrency
     * @param {object} options
     * @param {boolean} options.calculateFromTaxAddedPrice
     */
    constructor({ price, registration, eurToTryCurrency }, { calculateFromTaxAddedPrice = false } = {}) {
        this.#price = price;
        this.#registration = registration;
        this.#eurToTryCurrency = eurToTryCurrency;
        this.#calculateFromTaxAddedPrice = calculateFromTaxAddedPrice;

        if (this.#calculateFromTaxAddedPrice) {
            this.#prices.taxAdded = price;
        } else {
            this.#prices.taxFree = price;
        }
    }

    /**
     * @private
     * @param {number} price
     */
    #doCalculation(price) {
        this.#calculateFromTaxAddedPrice ? this.#price -= price : this.#price += price;
    }

    /**
     * @private
     * @param {{[key: string]: number|null}} taxFees
     * @returns {number}
     */
    #calculateTotalTaxFee(taxFees) {
        if (this.#registration === Registration.Import) {
            return taxFees.ministryOfCulture + taxFees.trtImport + taxFees.specialConsumptionTax + taxFees.valueAddedTax;
        }

        // this.#registration === Registration.Passport
        return taxFees.trtPassport + taxFees.registration;
    }

    /**
     * @param {number} price
     * @param {number} rate
     * @returns {number}
     */
    #calculateTax(price, rate) {
        return this.#calculateFromTaxAddedPrice ? calculateTaxFromTaxAddedPrice(price, rate) : calculateTaxFromTaxFreePrice(price, rate);
    }

    /**
     * @private
     */
    #_ministryOfCulture() {
        this.#taxFees.ministryOfCulture = this.#calculateTax(this.#price, this.#taxRates.ministryOfCulture);
        this.#doCalculation(this.#taxFees.ministryOfCulture);
    }

    /**
     * @private
     */
    #_trtImport() {
        this.#taxFees.trtImport = this.#calculateTax(this.#price, this.#taxRates.trtImport);
        this.#doCalculation(this.#taxFees.trtImport);
    }

    /**
     * @private
     */
    #_specialConsumptionTax() {
        this.#taxRates.specialConsumptionTax = getSpecialConsumptionTaxRateByPrice(this.#price);
        this.#taxFees.specialConsumptionTax = this.#calculateTax(this.#price, this.#taxRates.specialConsumptionTax);
        this.#doCalculation(this.#taxFees.specialConsumptionTax);
    }

    /**
     * @private
     */
    #_valueAddedTax() {
        this.#taxFees.valueAddedTax = this.#calculateTax(this.#price, this.#taxRates.valueAddedTax);
        this.#doCalculation(this.#taxFees.valueAddedTax);
    }

    /**
     * @private
     */
    #_trtPassport() {
        this.#taxFees.trtPassport = this.#taxRates.trtPassport * this.#eurToTryCurrency;
        this.#doCalculation(this.#taxFees.trtPassport);
    }

    /**
     * @private
     */
    #_registration() {
        this.#doCalculation(this.#taxFees.registration);
    }

    /**
     * @public
     * @returns {{[key: string]: {[key: string]: number|null}}}
     */
    calculate() {
        if (this.#registration === Registration.Import) {
            this.#_ministryOfCulture();
            this.#_trtImport();
            this.#_specialConsumptionTax();
            this.#_valueAddedTax();
        } else if (this.#registration === Registration.Passport) {
            this.#_trtPassport();
            this.#_registration();
        }

        if (this.#calculateFromTaxAddedPrice) {
            this.#prices.taxFree = this.#price;
        } else {
            this.#prices.taxAdded = this.#price;
        }

        this.#taxFees.total = this.#calculateTotalTaxFee(this.#taxFees);
        this.#taxRates.total = calculateTotalTaxRate(this.#taxFees.total, this.#prices.taxFree);

        return normalizeCalculatorResults({
            taxFees: this.#taxFees,
            taxRates: this.#taxRates,
            prices: this.#prices
        });
    }
}

export default Calculator;

export {
    getSpecialConsumptionTaxRateByPrice,
    Registration
};
