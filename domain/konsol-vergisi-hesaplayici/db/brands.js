import { mdiMicrosoftXbox, mdiNintendoSwitch, mdiSonyPlaystation } from "@mdi/js";

/** @type {KonsolVergisiHesaplayiciBrand[]} */
const brands = [
    {
        id: 3,
        title: "Sony",
        icon: mdiSonyPlaystation,
        color: "#00439C"
    },
    {
        id: 4,
        title: "Microsoft",
        icon: mdiMicrosoftXbox,
        color: "#107C10"
    },
    {
        id: 5,
        title: "Nintendo",
        icon: mdiNintendoSwitch,
        color: "#e60012"
    },
    {
        id: 6,
        title: "Valve",
        icon: "valve-steam-deck.svg",
        color: "#5c96d6"
    }
];

export default brands;
