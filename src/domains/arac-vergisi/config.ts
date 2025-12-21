import type { Form, VehicleEngineVolume, VehicleType } from "@/domains/arac-vergisi/types.js";

export const DEFAULT_FORM: Form = {
    mode: "tax-free-to-tax-added",
    price: 0,
    currency: "TRY",
    vehicleType: "automobile",
    vehicleEngineVolume: null
};

export const TAX_FREE_LABEL_BY_MODE = {
    "tax-added-to-tax-free": "Tahmini vergisiz fiyat",
    "tax-free-to-tax-added": "Vergisiz fiyat"
};

export const TAX_ADDED_LABEL_BY_MODE = {
    "tax-added-to-tax-free": "Vergili fiyat",
    "tax-free-to-tax-added": "Tahmini vergili fiyat"
};

export const PRICE_LABEL_BY_MODE = {
    "tax-added-to-tax-free": "Vergili araç fiyatı",
    "tax-free-to-tax-added": "Vergisiz araç fiyatı"
};

export const VEHICLE_TYPE_LABEL_BY_VEHICLE_TYPE: { [key in VehicleType]: string } = {
    "automobile": "Otomobil",
    "electric-automobile": "Elektrikli",
    "hybrid-automobile": "Hibrit",
    "motorcycle": "Motosiklet",
    "bus": "Otobüs",
    "midibus": "Midibüs",
    "minibus": "Minibüs",
    "helicopter": "Helikopter",
    "plane": "Uçak",
    "boat": "Gemi",
    "yacht": "Yat"
};

export const VEHICLE_ENGINE_VOLUME_LABEL_BY_VEHICLE_TYPE: { [key in VehicleType]: string } = {
    "automobile": "Motor hacmi (cm³)",
    "electric-automobile": "Motor gücü (kW)",
    "hybrid-automobile": "Motor gücü (kW) ve hacmi (cm³)",
    "motorcycle": "Motor hacmi (cm³)",
    "bus": "Motor gücü",
    "midibus": "Motor gücü",
    "minibus": "Motor gücü",
    "helicopter": "Motor gücü",
    "plane": "Motor gücü",
    "boat": "Motor gücü",
    "yacht": "Motor gücü"
};

export const VEHICLE_ENGINE_VOLUME_LABEL_BY_VEHICLE_ENGINE_VOLUME: { [key in VehicleEngineVolume]: string } = {
    "automobile.0-1400": "1.400 ve altı",
    "automobile.1401-1600": "1.401-1600",
    "automobile.1601-2000": "1.601-2.000",
    "automobile.2001-up": "2.001 ve üzeri",

    "electric-automobile.0-160": "160 ve altı",
    "electric-automobile.161-up": "161 ve üzeri",

    "hybrid-automobile.50-up.0-1800": "50 kW ve üzeri,<br />1.800 cm³ ve altı",
    "hybrid-automobile.100-up.0-2500": "100 kW ve üzeri,<br />2.500 cm³ ve altı",
    "hybrid-automobile.other": "Diğer",

    "motorcycle.0-250": "250 ve altı",
    "motorcycle.251-up": "251 ve üzeri"
};

export const LAST_UPDATE = new Date("Sat Sep 06 2025 03:00:00 GMT+0300 (GMT+03:00)");
