/* oxlint-disable no-magic-numbers */

export const PLACEHOLDERS = [
    "Nefes alma vergisi",
    "Zart zurt vergisi",
    "Vergi muafiyeti vergisi",
    "Hava soluma katkı payı",
    "Fiyat etiketine şaşırma vergisi",
    "Eşitlik hayal etme cezası",
    "Eğitim kalitesizliği destek fonu",
    "Vasıflı olma cezası",
    "Beyin kullanma ücreti",
    "Başarı cezası",
    "Ay sonunu getirememe vergisi",
    "Zengin olmama cezası",
    "Asgari geçim sıkıntısı fonu",
    "Haline şükretme teşviği",
    "Hayal kurma lisans ücreti",
    "Fatura şokuna dayanma fonu",
    "Üç kuruş biriktirme harcı",
    "Kadın olma cezası",
    "Kira ödeyememe tazminatı",
    "Et reyonuna bakma vergisi",
    "Zam gelmeden alma harcı",
    "Kur korumalı sabır testi ücreti",
    "Yoksulluk içinde zengin hissetme fonu",
    "Eksi bakiye dayanışma vergisi",
    "İndirim sandığın bindirim fonu",
    "Emekli olma cesareti fonu",
    "Kendi kendine yetememe katkı payı",
    "Asgari umuda ulaşamama vergisi",
    "Yarın daha kötü olma garantisi fonu"
] as const;

type Placeholder = typeof PLACEHOLDERS[number];

let queue: Placeholder[] = [];
let index = 0;

const shuffleArray = <T>(array: readonly T[]): T[] => {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // @ts-expect-error: FIXME
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
};

export const pickRandomPlaceholder = (): Placeholder => {
    if (index >= queue.length) {
        queue = shuffleArray(PLACEHOLDERS);
        index = 0;
    }
    // oxlint-disable-next-line no-non-null-assertion
    return queue[index++]!;
};
