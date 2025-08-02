import type { CalculationResults, Prices, TaxFees, TaxRates } from "@/domains/telefon-vergisi-hesaplayici/types.js";
import { Registration } from "@/domains/telefon-vergisi-hesaplayici/types.js";

export class Calculator {
    private taxFees: TaxFees = {
        total: 0,
        ministryOfCulture: 0,
        trtImport: 0,
        specialConsumptionTax: 0,
        valueAddedTax: 0,
        trtPassport: 0,
        registration: 0
    };

    private taxRates: TaxRates = {
        total: 0,
        ministryOfCulture: 0,
        trtImport: 0,
        specialConsumptionTax: 0,
        valueAddedTax: 0,
        trtPassport: 0,
        registration: 0
    };

    private readonly prices: Prices = {
        taxFree: 0,
        taxAdded: 0
    };

    private price: number;
    private readonly registration: Registration;
    private readonly eurToTryCurrency: number;
    private readonly calculateFromTaxAddedPrice: boolean;

    public constructor(
        params: {
            price: number,
            registration: Registration
            eurToTryCurrency: number
        },
        options: {
            calculateFromTaxAddedPrice: boolean
        }
    ) {
        this.price = params.price;
        this.registration = params.registration;
        this.eurToTryCurrency = params.eurToTryCurrency;
        this.calculateFromTaxAddedPrice = options.calculateFromTaxAddedPrice;

        if (this.calculateFromTaxAddedPrice) {
            this.prices.taxAdded = params.price;
        } else {
            this.prices.taxFree = params.price;
        }
    }

    public calculate(): CalculationResults {
        if (this.registration === Registration.IMPORT) {
            this.calculateTax_ministryOfCulture();
            this.calculateTax_trtImport();
            this.calculateTax_specialConsumptionTax();
            this.calculateTax_valueAddedTax();
        } else if (this.registration === Registration.PASSPORT) {
            this.calculateTax_trtPassport();
            this.calculateTax_registration();
        }


        if (this.calculateFromTaxAddedPrice) {
            this.prices.taxFree = this.price;
        } else {
            this.prices.taxAdded = this.price;
        }

        this.taxFees.total = this.calculateTotalTaxFee();
        this.taxRates.total = calculateTotalTaxRate(this.taxFees.total, this.prices.taxFree);

        return normalizeCalculatorResults({
            taxFees: this.taxFees,
            taxRates: this.taxRates,
            prices: this.prices
        });
    }

    private calculatePrice(price: number): void {
        if (this.calculateFromTaxAddedPrice) {
            this.price -= price;
        } else {
            this.price += price;
        }
    }

    private calculateTax(price: number, rate: number): number {
        return this.calculateFromTaxAddedPrice ?
            calculateTaxFromTaxAddedPrice(price, rate) :
            calculateTaxFromTaxFreePrice(price, rate);
    }

    private calculateTotalTaxFee(): number {
        if (this.registration === Registration.IMPORT) {
            return this.taxFees.ministryOfCulture +
                this.taxFees.trtImport +
                this.taxFees.specialConsumptionTax +
                this.taxFees.valueAddedTax;
        }
        return this.taxFees.trtPassport +
            this.taxFees.registration;
    }

    // "Kültür Bakanlığı" | TRY | RateType.PERCENT | BaseAmountMode.PREVIOUS_AMOUNT
    private calculateTax_ministryOfCulture(): void {
        this.taxRates.ministryOfCulture = 1;
        this.taxFees.ministryOfCulture = this.calculateTax(this.price, this.taxRates.ministryOfCulture);
        this.calculatePrice(this.taxFees.ministryOfCulture);
    }

    // "TRT bandrolü" (Registration.IMPORT) | TRY | RateType.PERCENT | BaseAmountMode.PREVIOUS_AMOUNT
    private calculateTax_trtImport(): void {
        this.taxRates.trtImport = 12;
        this.taxFees.trtImport = this.calculateTax(this.price, this.taxRates.trtImport);
        this.calculatePrice(this.taxFees.trtImport);
    }

    // "Özel Tüketim Vergisi (ÖTV)" | TRY | RateType.PERCENT | BaseAmountMode.PREVIOUS_AMOUNT
    private calculateTax_specialConsumptionTax(): void {
        this.taxRates.specialConsumptionTax = ((price: number) => {
            if (price <= 640) return 25;
            if (price < 1_500) return 40;
            return 50;
        })(this.price);
        this.taxFees.specialConsumptionTax = this.calculateTax(this.price, this.taxRates.specialConsumptionTax);
        this.calculatePrice(this.taxFees.specialConsumptionTax);
    }

    // "Katma Değer Vergisi (KDV)" | TRY | RateType.PERCENT | BaseAmountMode.PREVIOUS_AMOUNT
    private calculateTax_valueAddedTax(): void {
        this.taxRates.valueAddedTax = 20;
        this.taxFees.valueAddedTax = this.calculateTax(this.price, this.taxRates.valueAddedTax);
        this.calculatePrice(this.taxFees.valueAddedTax);
    }

    // "TRT bandrolü" (Registration.PASSPORT) | EUR | RateType.UNIT
    private calculateTax_trtPassport(): void {
        this.taxRates.trtPassport = 20;
        this.taxFees.trtPassport = this.taxRates.trtPassport * this.eurToTryCurrency;
        this.calculatePrice(this.taxFees.trtPassport);
    }

    // "Kayıt ücreti" | TRT | RateType.UNIT
    private calculateTax_registration(): void {
        this.taxRates.registration = 45_614;
        this.taxFees.registration = this.taxRates.registration;
        this.calculatePrice(this.taxFees.registration);
    }
}
