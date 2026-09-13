import type { Country } from "@/domains/iphone-ulke-fiyatlari/types.js";

const defineCountries = <T extends { [K in keyof T]: Country<K & Lowercase<string>> }>(
    countries: T
): { [countryCode: string]: Country } => countries;

export const COUNTRIES = defineCountries({
    us: { code: "us", prefix: "", name: "Amerika", flag: "🇺🇸", currency: "USD" },
    ca: { code: "ca", prefix: "/ca", name: "Kanada", flag: "🇨🇦", currency: "CAD" },
    mx: { code: "mx", prefix: "/mx", name: "Meksika", flag: "🇲🇽", currency: "MXN" },
    br: { code: "br", prefix: "/br", name: "Brezilya", flag: "🇧🇷", currency: "BRL" },
    cl: { code: "cl", prefix: "/cl", name: "Şili", flag: "🇨🇱", currency: "CLP" },

    tr: { code: "tr", prefix: "/tr", name: "Türkiye", flag: "🇹🇷", currency: "TRY" },
    de: { code: "de", prefix: "/de", name: "Almanya", flag: "🇩🇪", currency: "EUR" },
    uk: { code: "uk", prefix: "/uk", name: "İngiltere", flag: "🇬🇧", currency: "GBP" },
    fr: { code: "fr", prefix: "/fr", name: "Fransa", flag: "🇫🇷", currency: "EUR" },
    it: { code: "it", prefix: "/it", name: "İtalya", flag: "🇮🇹", currency: "EUR" },
    es: { code: "es", prefix: "/es", name: "İspanya", flag: "🇪🇸", currency: "EUR" },
    nl: { code: "nl", prefix: "/nl", name: "Hollanda", flag: "🇳🇱", currency: "EUR" },
    be: { code: "be", prefix: "/be-fr", name: "Belçika", flag: "🇧🇪", currency: "EUR" },
    ch: { code: "ch", prefix: "/ch-de", name: "İsviçre", flag: "🇨🇭", currency: "CHF" },
    at: { code: "at", prefix: "/at", name: "Avusturya", flag: "🇦🇹", currency: "EUR" },
    se: { code: "se", prefix: "/se", name: "İsveç", flag: "🇸🇪", currency: "SEK" },
    no: { code: "no", prefix: "/no", name: "Norveç", flag: "🇳🇴", currency: "NOK" },
    dk: { code: "dk", prefix: "/dk", name: "Danimarka", flag: "🇩🇰", currency: "DKK" },
    fi: { code: "fi", prefix: "/fi", name: "Finlandiya", flag: "🇫🇮", currency: "EUR" },
    pl: { code: "pl", prefix: "/pl", name: "Polonya", flag: "🇵🇱", currency: "PLN" },
    cz: { code: "cz", prefix: "/cz", name: "Çekya", flag: "🇨🇿", currency: "CZK" },
    hu: { code: "hu", prefix: "/hu", name: "Macaristan", flag: "🇭🇺", currency: "HUF" },
    ie: { code: "ie", prefix: "/ie", name: "İrlanda", flag: "🇮🇪", currency: "EUR" },
    pt: { code: "pt", prefix: "/pt", name: "Portekiz", flag: "🇵🇹", currency: "EUR" },
    lu: { code: "lu", prefix: "/lu", name: "Lüksemburg", flag: "🇱🇺", currency: "EUR" },

    jp: { code: "jp", prefix: "/jp", name: "Japonya", flag: "🇯🇵", currency: "JPY" },
    kr: { code: "kr", prefix: "/kr", name: "Güney Kore", flag: "🇰🇷", currency: "KRW" },
    cn: { code: "cn", prefix: "/cn", name: "Çin", flag: "🇨🇳", currency: "CNY" },
    in: { code: "in", prefix: "/in", name: "Hindistan", flag: "🇮🇳", currency: "INR" },
    sg: { code: "sg", prefix: "/sg", name: "Singapur", flag: "🇸🇬", currency: "SGD" },
    hk: { code: "hk", prefix: "/hk", name: "Hong Kong", flag: "🇭🇰", currency: "HKD" },
    tw: { code: "tw", prefix: "/tw", name: "Tayvan", flag: "🇹🇼", currency: "TWD" },
    au: { code: "au", prefix: "/au", name: "Avustralya", flag: "🇦🇺", currency: "AUD" },
    nz: { code: "nz", prefix: "/nz", name: "Yeni Zelanda", flag: "🇳🇿", currency: "NZD" },
    th: { code: "th", prefix: "/th", name: "Tayland", flag: "🇹🇭", currency: "THB" },
    my: { code: "my", prefix: "/my", name: "Malezya", flag: "🇲🇾", currency: "MYR" },
    vn: { code: "vn", prefix: "/vn", name: "Vietnam", flag: "🇻🇳", currency: "VND" },
    ph: { code: "ph", prefix: "/ph", name: "Filipinler", flag: "🇵🇭", currency: "PHP" },

    ae: { code: "ae", prefix: "/ae", name: "BAE (Dubai)", flag: "🇦🇪", currency: "AED" },
    sa: { code: "sa", prefix: "/sa", name: "Suudi Arabistan", flag: "🇸🇦", currency: "SAR" }
});
