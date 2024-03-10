import { Registration } from "@/domain/pages/telefon-vergisi-hesaplayici/telefon-vergisi-hesaplayici.calculator.js";

const registrationOptions = [
    {
        title: "İthalat ile",
        description: "İthalatçıların ithal edip sattığı ürünlerdir.",
        value: Registration.Import
    },
    {
        title: "Pasaport ile",
        description: "Yurt dışına giden kişinin yanında getirip kayıt ettirdiği ürünlerdir.",
        value: Registration.Passport
    }
];

export {
    registrationOptions
};
