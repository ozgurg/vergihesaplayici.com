export const buildPageMeta = (phoneNameWithPossession: string): { pageTitle: string, pageDescription: string } => ({
    pageTitle: `${phoneNameWithPossession} vergisi ne kadar?`,
    pageDescription: `Satın aldığınız ${phoneNameWithPossession} yurt içi ve yurt dışı fiyatlarına uygulanan ÖTV, KDV ve gümrük vergilerini en güncel oranlarla hesaplayın.`
});
