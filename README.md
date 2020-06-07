[![Actions Status](https://github.com/ozgurg/vergihesaplayici.com/workflows/vergihesaplayici.com/badge.svg)](https://github.com/ozgurg/vergihesaplayici.com/actions)
![Version](https://img.shields.io/github/package-json/v/ozgurg/vergihesaplayici.com)

# vergihesaplayici.com
[vergihesaplayici.com](https://vergihesaplayici.com/)'un kaynak kodudur.

## Nereden çıktı bu fikir?
[teknoseyir.com](https://teknoseyir.com/)'daki [@temp](https://teknoseyir.com/u/temp)'in [Telefon Fiyatı Hesapla v2](https://teknoseyir.com/blog/telefon-fiyati-hesapla-v2) adlı masaüstü yazılımına kendi yorumumu katarak Vue ile yazma kararı aldım ve neden diğer hesaplamaları da -şu anda 1 tane olsa da- eklemeyeyim diye düşündüm. Ortaya vergihesaplayici.com çıktı. 

## Kurulum
`npm install`

## Çalıştırma
Development

`npm run serve`

Build

`npm run build`

## Linting
Linting çok önem verdiğim bir konu ve bu yüzden birçok kural -sinir bozucu olsa da- çok sıkı.

`npm run lint`

## Testler
Unit testler

`npm run test:unit`

E2E testleri

`npm run test:e2e`

## Kaputun altı
- [buefy](https://www.npmjs.com/package/buefy): [Bulma](https://github.com/jgthms/bulma)'nın Vue için genişletilmiş hali.
- [clipboard](https://www.npmjs.com/package/clipboard): Paylaşma URL'sini kopyalama işlevi.
- [vue-meta](https://www.npmjs.com/package/vue-meta): Meta etiketlerini daha kolay ayarlamamı sağlıyor.
- [Firebase Hosting](https://firebase.google.com/docs/hosting): Site burada barınıyor.
- [GitHub Actions](https://github.com/features/actions): Continuous Integration ile otomatik deploy ediyorum. (Teşekkürler [w9jds/firebase-action](https://github.com/w9jds/firebase-action))
- [exchangeratesapi](https://github.com/exchangeratesapi/exchangeratesapi): Kurları buradan çekiyorum.
- [register-service-worker](https://www.npmjs.com/package/register-service-worker)
- [core-js](https://www.npmjs.com/package/core-js)
- [vue](https://www.npmjs.com/package/vue)
- [vue-router](https://www.npmjs.com/package/vue-router)
- [axios](https://www.npmjs.com/package/axios)
- [vuex](https://www.npmjs.com/package/vuex)

## TODO
- [ ] Hesaplamayı paylaş özelliğinin kopyalama işlevinin kopyalayıp kopyalamadığının testi yazılacak.
- [ ] Oyun Konsolu Vergisi Hesaplayıcı eklenecek.
- [ ] .github/workflows/main.yml içinde "env" değerlerindeki kod tekrarı düzeltilecek.
- [ ] Navbar dropdown'ı için active state'i üzerinde çalışılacak.
- [ ] Koyu mod

## Logo
[Namechap Free Logo Maker](https://www.namecheap.com/logo-maker/) ile oluşturdum. Detayları ve kaynak dosyaları /logo altından görebilirsiniz.

## Lisans
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
