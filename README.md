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
- [algoliasearch](https://www.npmjs.com/package/algoliasearch): [Algolia](https://www.algolia.com/)'yı veri tabanı gibi kullanıyorum.
- [buefy](https://www.npmjs.com/package/buefy): [Bulma](https://github.com/jgthms/bulma)'nın Vue için genişletilmiş hali.
- [clipboard](https://www.npmjs.com/package/clipboard): Paylaşma URL'sini kopyalama işlevi.
- [debounce](https://www.npmjs.com/package/debounce): Aramayı geciktirmek için kullanıyorum.
- [js-base64](https://www.npmjs.com/package/js-base64): Hesaplamayı paylaşırken data'yı Base64 ile encode ve decode ediyorum.
- [vue-lazyload](https://www.npmjs.com/package/vue-lazyload): Aslında buna çok gerek yok. Arama sonuçlarındaki telefon fotoğraflarını "yavaş" yüklemeyi sağlıyor.
- [vue-meta](https://www.npmjs.com/package/vue-meta): Meta etiketlerini daha kolay ayarlamamı sağlıyor.
- [register-service-worker](https://www.npmjs.com/package/register-service-worker)
- [core-js](https://www.npmjs.com/package/core-js)
- [vue](https://www.npmjs.com/package/vue)
- [vue-router](https://www.npmjs.com/package/vue-router)
- [axios](https://www.npmjs.com/package/axios)
- [vuex](https://www.npmjs.com/package/vuex)
- [Firebase Hosting](https://firebase.google.com/docs/hosting): Site burada barınıyor.
- [Firebase Storage](https://firebase.google.com/docs/storage): Telefon fotoğrafları burada barınıyor.
- [GitHub Actions](https://github.com/features/actions): Continuous Integration ile otomatik deploy ediyorum. (Teşekkürler [w9jds/firebase-action](https://github.com/w9jds/firebase-action))
- [exchangeratesapi](https://github.com/exchangeratesapi/exchangeratesapi): Kurları buradan çekiyorum.

## TODO
- [ ] TelefonVergisiHesaplayici: Güncel telefonlar eklenecek.
- [ ] TelefonVergisiHesaplayici: E2E testlerinde hesaplamayı doğrulamak için hesaplamayı yaptığım fonksiyonu kendi dosyasına taşıyıp E2E testlerinde kullanacağım.
- [ ] Hesaplamayı paylaş özelliğinin kopyalama işlevinin kopyalayıp kopyalamadığının testi yazılacak.
- [ ] Oyun Konsolu Vergisi Hesaplayıcı eklenecek.
- [ ] .github/workflows/main.yml içinde "env" değerlerindeki kod tekrarı düzeltilecek.
- [ ] Navbar dropdown'ı için active state'i üzerinde çalışılacak.

## Logo
[Namechap Free Logo Maker](https://www.namecheap.com/logo-maker/) ile oluşturdum. Detayları ve kaynak dosyaları /logo altından görebilirsiniz.

## Lisans
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
