import type { CalculationResults, Prices, TaxFees, TaxRates } from "@/domains/telefon-vergisi-hesaplayici/types.js";
import { Registration } from "@/domains/telefon-vergisi-hesaplayici/types.js";

export class Calculator {
    // Most of the calculation values will be assigned when `calculate()` is called.
    // Initially, I set them to `WILL_ASSIGNED_LATER`, but why not just assign `0`?
    // Because in some calculations, `0` can have a specific meaning.
    // Even if the value is `0`, the name will clarify its purpose,
    // making sure there's no confusion unless `0` really means something.
    // I also don't want to use `null` because handling it in TypeScript adds unnecessary complexity.
    private readonly WILL_ASSIGNED_LATER: number = 0;

    private readonly PASSPORT_REGISTRATION_FEE: number = 45_614; // TRT | "Kayıt ücreti"

    private taxFees: TaxFees = {
        total: this.WILL_ASSIGNED_LATER,
        ministryOfCulture: this.WILL_ASSIGNED_LATER, // TRY | "Kültür Bakanlığı"
        trtImport: this.WILL_ASSIGNED_LATER, // TRY | "Kayıt yolu > İthalat ile > TRT bandrolü"
        specialConsumptionTax: this.WILL_ASSIGNED_LATER, // TRY | "Özel Tüketim Vergisi (ÖTV)"
        valueAddedTax: this.WILL_ASSIGNED_LATER, // TRY | "Katma Değer Vergisi (KDV)"
        trtPassport: this.WILL_ASSIGNED_LATER, // TRY | "Kayıt yolu > Pasaport ile > TRT bandrolü"
        registration: this.WILL_ASSIGNED_LATER // TRY | "Kayıt yolu > Pasaport ile > Kayıt ücreti"
    };

    private taxRates: TaxRates = {
        total: this.WILL_ASSIGNED_LATER,
        ministryOfCulture: 1, // TRY | Applied as a percentage of the previous price | "Kültür Bakanlığı"
        trtImport: 12, // TRY | Applied as a percentage of the previous price | "Kayıt yolu > İthalat ile > TRT bandrolü"
        specialConsumptionTax: this.WILL_ASSIGNED_LATER, // TRY | Applied as a percentage of the previous price. Varies by ({@link this.getSpecialConsumptionTaxRateByPrice}) the previous price. | "Özel Tüketim Vergisi (ÖTV)"
        valueAddedTax: 20, // TRY | Applied as a percentage of the previous price | "Katma Değer Vergisi (KDV)"
        trtPassport: 20 // EUR | "Kayıt yolu > Pasaport ile > TRT bandrolü"
    };

    private readonly prices: Prices = {
        taxFree: this.WILL_ASSIGNED_LATER,
        taxAdded: this.WILL_ASSIGNED_LATER
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

    private getSpecialConsumptionTaxRateByPrice(price: number): number {
        if (price <= 640) {
            return 25;
        }
        if (price > 640 && price < 1_500) {
            return 40;
        }
        return 50;
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

    private calculateTax_ministryOfCulture(): void {
        this.taxFees.ministryOfCulture = this.calculateTax(this.price, this.taxRates.ministryOfCulture);
        this.calculatePrice(this.taxFees.ministryOfCulture);
    }

    private calculateTax_trtImport(): void {
        this.taxFees.trtImport = this.calculateTax(this.price, this.taxRates.trtImport);
        this.calculatePrice(this.taxFees.trtImport);
    }

    private calculateTax_specialConsumptionTax(): void {
        this.taxRates.specialConsumptionTax = this.getSpecialConsumptionTaxRateByPrice(this.price);
        this.taxFees.specialConsumptionTax = this.calculateTax(this.price, this.taxRates.specialConsumptionTax);
        this.calculatePrice(this.taxFees.specialConsumptionTax);
    }

    private calculateTax_valueAddedTax(): void {
        this.taxFees.valueAddedTax = this.calculateTax(this.price, this.taxRates.valueAddedTax);
        this.calculatePrice(this.taxFees.valueAddedTax);
    }

    private calculateTax_trtPassport(): void {
        this.taxFees.trtPassport = this.taxRates.trtPassport * this.eurToTryCurrency;
        this.calculatePrice(this.taxFees.trtPassport);
    }

    private calculateTax_registration(): void {
        this.taxFees.registration = this.PASSPORT_REGISTRATION_FEE;
        this.calculatePrice(this.taxFees.registration);
    }
}
