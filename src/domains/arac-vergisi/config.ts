import type { Form } from "@/domains/arac-vergisi/types.js";
import { Mode, VehicleEngineVolume, VehicleType } from "@/domains/arac-vergisi/types.js";

export const DEFAULT_FORM: Form = {
    mode: Mode.TAX_ADDED_TO_TAX_FREE,
    price: 0,
    currency: "TRY",
    vehicleType: VehicleType.AUTOMOBILE,
    vehicleEngineVolume: null
};

export const TAX_FREE_LABEL_BY_MODE = {
    [Mode.TAX_ADDED_TO_TAX_FREE]: "Tahmini vergisiz fiyat",
    [Mode.TAX_FREE_TO_TAX_ADDED]: "Vergisiz fiyat"
};

export const TAX_ADDED_LABEL_BY_MODE = {
    [Mode.TAX_ADDED_TO_TAX_FREE]: "Vergili fiyat",
    [Mode.TAX_FREE_TO_TAX_ADDED]: "Tahmini vergili fiyat"
};

export const PRICE_LABEL_BY_MODE = {
    [Mode.TAX_ADDED_TO_TAX_FREE]: "Vergili araç fiyatı",
    [Mode.TAX_FREE_TO_TAX_ADDED]: "Vergisiz araç fiyatı"
};

export const VEHICLE_TYPE_LABEL_BY_VEHICLE_TYPE: { [key in VehicleType]: string } = {
    [VehicleType.AUTOMOBILE]: "Otomobil",
    [VehicleType.ELECTRIC_AUTOMOBILE]: "Elektrikli",
    [VehicleType.HYBRID_AUTOMOBILE]: "Hibrit",
    [VehicleType.MOTORCYCLE]: "Motosiklet",
    [VehicleType.BUS]: "Otobüs",
    [VehicleType.MIDIBUS]: "Midibüs",
    [VehicleType.MINIBUS]: "Minibüs",
    [VehicleType.HELICOPTER]: "Helikopter",
    [VehicleType.PLANE]: "Uçak",
    [VehicleType.BOAT]: "Gemi",
    [VehicleType.YACHT]: "Yat"
};

export const VEHICLE_ENGINE_VOLUME_LABEL_BY_VEHICLE_TYPE: { [key in VehicleType]: string } = {
    [VehicleType.AUTOMOBILE]: "Motor hacmi (cm³)",
    [VehicleType.ELECTRIC_AUTOMOBILE]: "Motor gücü (kW)",
    [VehicleType.HYBRID_AUTOMOBILE]: "Motor gücü (kW) ve hacmi (cm³)",
    [VehicleType.MOTORCYCLE]: "Motor hacmi (cm³)",
    [VehicleType.BUS]: "Motor gücü",
    [VehicleType.MIDIBUS]: "Motor gücü",
    [VehicleType.MINIBUS]: "Motor gücü",
    [VehicleType.HELICOPTER]: "Motor gücü",
    [VehicleType.PLANE]: "Motor gücü",
    [VehicleType.BOAT]: "Motor gücü",
    [VehicleType.YACHT]: "Motor gücü"
};

export const VEHICLE_ENGINE_VOLUME_LABEL_BY_VEHICLE_ENGINE_VOLUME: { [key in VehicleEngineVolume]: string } = {
    [VehicleEngineVolume.AUTOMOBILE__0_1400]: "1.400 ve altı",
    [VehicleEngineVolume.AUTOMOBILE__1401_1600]: "1.401-1600",
    [VehicleEngineVolume.AUTOMOBILE__1601_2000]: "1.601-2.000",
    [VehicleEngineVolume.AUTOMOBILE__2001_UP]: "2.001 ve üzeri",

    [VehicleEngineVolume.ELECTRIC_AUTOMOBILE__0_160]: "160 ve altı",
    [VehicleEngineVolume.ELECTRIC_AUTOMOBILE__161_UP]: "161 ve üzeri",

    [VehicleEngineVolume.HYBRID_AUTOMOBILE__50_UP_0_1800]: "50 kW ve üzeri,<br />1.800 cm³ ve altı",
    [VehicleEngineVolume.HYBRID_AUTOMOBILE__100_UP_0_2500]: "100 kW ve üzeri,<br />2.500 cm³ ve altı",
    [VehicleEngineVolume.HYBRID_AUTOMOBILE__OTHER]: "Diğer",

    [VehicleEngineVolume.MOTORCYCLE__0_250]: "250 ve altı",
    [VehicleEngineVolume.MOTORCYCLE__251_UP]: "251 ve üzeri"
};

export const LAST_UPDATE = new Date("Sat Sep 06 2025 03:00:00 GMT+0300 (GMT+03:00)");
