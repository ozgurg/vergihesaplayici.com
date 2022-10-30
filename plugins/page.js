import { mdiBrightnessPercent, mdiCellphone, mdiController } from "@mdi/js";
import { buildHeadTags } from "@/utils/build-head-tags.js";

const AnaSayfa = (() => {
    const title = "Vergi Hesaplayıcı";
    const description = "Türkiye'de telefon ve oyun konsolu gibi farklı ürün gruplarının yurt içi ve yurt dışı fiyatlarına ne kadar vergi uygulandığını hesaplayın.";
    const url = "/";
    const head = {
        titleTemplate: null,
        ...buildHeadTags({
            title,
            description,
            ogImageName: "ana-sayfa.jpg"
        })
    };

    return {
        title,
        description,
        url,
        head
    };
})();

const Hesaplayicilar = (() => {
    const title = "Hesaplayıcılar";
    const description = "Türkiye'de telefon ve oyun konsolu gibi farklı ürün gruplarının yurt içi ve yurt dışı fiyatlarına ne kadar vergi uygulandığını hesaplayın.";
    const url = "/hesaplayicilar/";
    const head = buildHeadTags({
        title,
        description,
        ogImageName: "ana-sayfa.jpg"
    });
    const breadcrumbs = [
        { title, url }
    ];

    return {
        title,
        description,
        url,
        head,
        breadcrumbs
    };
})();

const TelefonVergisiHesaplayici = (() => {
    const icon = mdiCellphone;
    const title = "Telefon Vergisi Hesaplayıcı";
    const shortTitle = "Telefon Vergisi";
    const description = "Satın aldığınız bir telefonun yurt içi ve yurt dışı fiyatlarına ne kadar vergi uygulandığını hesaplayın.";
    const url = "/hesaplayicilar/telefon-vergisi-hesaplayici/";
    const head = buildHeadTags({
        title,
        description,
        ogImageName: "telefon-vergisi-hesaplayici.jpg"
    });
    const breadcrumbs = [
        ...Hesaplayicilar.breadcrumbs,
        { title, url }
    ];
    const summary = "\"O ney vatandaş, bir tane de bana ver\"<br /><i>- Vergili Mıçı</i>";

    return {
        icon,
        title,
        shortTitle,
        description,
        url,
        head,
        breadcrumbs,
        summary
    };
})();

const KonsolVergisiHesaplayici = (() => {
    const icon = mdiController;
    const title = "Konsol Vergisi Hesaplayıcı";
    const shortTitle = "Konsol Vergisi";
    const description = "Satın aldığınız bir oyun konsolunun yurt içi ve yurt dışı fiyatlarına ne kadar vergi uygulandığını hesaplayın.";
    const url = "/hesaplayicilar/konsol-vergisi-hesaplayici/";
    const head = buildHeadTags({
        title,
        description,
        ogImageName: "konsol-vergisi-hesaplayici.jpg"
    });
    const breadcrumbs = [
        ...Hesaplayicilar.breadcrumbs,
        { title, url }
    ];
    const summary = "- Oyun oynamak hiç bu kadar vergili olmamıştı.<br />+ Meydan okuma kabul edildi.";

    return {
        icon,
        title,
        shortTitle,
        description,
        url,
        head,
        breadcrumbs,
        summary
    };
})();

const KdvHesaplayici = (() => {
    const icon = mdiBrightnessPercent;
    const title = "KDV Hesaplayıcı";
    const shortTitle = "KDV";
    const description = "Namıdiğer her şeyin vergisini hariç ve dahil olarak hesaplayın.";
    const url = "/hesaplayicilar/kdv-hesaplayici/";
    const head = buildHeadTags({
        title,
        description,
        ogImageName: "kdv-hesaplayici.jpg"
    });
    const breadcrumbs = [
        ...Hesaplayicilar.breadcrumbs,
        { title, url }
    ];
    const summary = "\"Her şey değerlidir.\"<br /><i>- Katma Değer</i>";

    return {
        icon,
        title,
        shortTitle,
        description,
        url,
        head,
        breadcrumbs,
        summary
    };
})();

const site = {
    AnaSayfa,
    Hesaplayicilar
};

const calculators = {
    TelefonVergisiHesaplayici,
    KonsolVergisiHesaplayici,
    KdvHesaplayici
};

export default (_, inject) => {
    inject("page", {
        ...site,
        ...calculators
    });
};

export {
    site,
    calculators
};
