export const buildPageMeta = (phoneNameWithPossession: string): { pageTitle: string, pageDescription: string } => ({
    pageTitle: `${phoneNameWithPossession} vergisi ne kadar?`,
    pageDescription: `Telefon Vergisi Hesaplama ile ${phoneNameWithPossession} ÖTV, KDV, TRT ve Kültür Bakanlığı payı dahil tüm vergilerini hesaplayın, yurt dışı fiyatıyla karşılaştırın.`
});
