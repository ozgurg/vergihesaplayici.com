---
title: "KDV Nasıl Hesaplanır? (Dahil ve Hariç Formülleri, Örnekler)"
description: "KDV nasıl hesaplanır? KDV dahil ve KDV hariç hesaplama formülleri, %1, %10, %20 oranları için adımlı sayısal örnekler ve tevkifat hesaplama rehberi."
createdDate: 2023-04-27
updatedDate: 2026-09-16
---

**KDV (Katma Değer Vergisi) hesaplaması**, bir mal veya hizmetin vergisiz çıplak fiyatına (matrahına) yasal vergi oranının eklenmesi veya vergili toplam tutardan vergi payının ayrıştırılması işlemidir.

Türkiye'de mal ve hizmet teslimlerinde geçerli olan yasal oranlar **%1, %10 ve %20**'dir. Günlük ticari hayatta en sık karşılaşılan iki temel işlem: **KDV Hariç fiyattan KDV Dahil tutarı bulmak** ve **KDV Dahil fiyattan KDV'yi ayırmaktır**.

---

## 1. KDV Hariç Fiyattan KDV Dahil Fiyatı Hesaplama

Elinizde ürünün veya hizmetin vergisiz net tutarı varsa, KDV dahil nihai satış fiyatı şu formüllerle bulunur:

### Temel Formüller:
* $\text{KDV Tutarı} = \text{KDV Hariç Tutar} \times \left( \frac{\text{KDV Oranı}}{100} \right)$
* $\text{KDV Dahil Toplam} = \text{KDV Hariç Tutar} \times \left(1 + \frac{\text{KDV Oranı}}{100}\right)$

### Pratik Çarpım Katsayıları:
* **%20 KDV için:** KDV Hariç Tutar $\times 1{,}20$
* **%10 KDV için:** KDV Hariç Tutar $\times 1{,}10$
* **%1 KDV için:** KDV Hariç Tutar $\times 1{,}01$

> **Örnek:** 10.000 TL vergisiz fiyatı olan bir elektronik eşya (%20 KDV):
> * $\text{KDV Tutarı} = 10.000 \times 0{,}20 = 2.000\text{ TL}$
> * $\text{KDV Dahil Tutar} = 10.000 \times 1{,}20 = 12.000\text{ TL}$

---

## 2. KDV Dahil Fiyattan KDV Hariç (Matrah) Tutarı Bulma

Faturada veya etiket fiyatında KDV dahil toplam tutar yazıyorsa, ürünün çıplak matrahını ve içindeki vergi tutarını ayrıştırmak için şu formül uygulanır:

### Temel Formüller:
* $\text{KDV Hariç Tutar (Matrah)} = \frac{\text{KDV Dahil Toplam}}{1 + \left(\frac{\text{KDV Oranı}}{100}\right)}$
* $\text{KDV Tutarı} = \text{KDV Dahil Toplam} - \text{KDV Hariç Tutar}$

### Pratik Bölme Katsayıları:
* **%20 KDV için:** KDV Dahil Tutar $\div 1{,}20$
* **%10 KDV için:** KDV Dahil Tutar $\div 1{,}10$
* **%1 KDV için:** KDV Dahil Tutar $\div 1{,}01$

> **Örnek:** 3.300 TL KDV dahil ödenen bir restoran hesabı (%10 KDV):
> * $\text{KDV Hariç Tutar} = 3.300 \div 1{,}10 = 3.000\text{ TL}$
> * $\text{KDV Tutarı} = 3.300 - 3.000 = 300\text{ TL}$

---

## 3. KDV Tevkifatı Nasıl Hesaplanır?

Kısmi tevkifat uygulamasında alıcı, faturadaki toplam KDV'nin kanunla belirlenen kısmını (örneğin 5/10, 7/10 veya 9/10) keserek satıcıya ödemez; doğrudan vergi dairesine yatırır.

> **Tevkifat Örneği (5/10 Oranı):**
> * **Hizmet Bedeli (KDV Hariç):** 20.000 TL
> * **Genel KDV (%20):** 4.000 TL
> * **Tevkif Edilen KDV (5/10):** $4.000 \times \frac{5}{10} = 2.000\text{ TL}$ *(Alıcı tarafından devlete ödenir)*
> * **Tahsil Edilen KDV:** $4.000 - 2.000 = 2.000\text{ TL}$
> * **Satıcıya Ödenecek Toplam:** $20.000 + 2.000 = 22.000\text{ TL}$

---

## İlgili Hesaplayıcılar ve Rehberler

* [Otomatik KDV Hesaplama Aracı](/kdv/)
* [KDV Nedir?](/yazilar/kdv-nedir/)
* [Gerçek Usulde KDV [0015]](/yazilar/0015-gercek-usulde-katma-deger-vergisi/)
* [Vergi Oranı Nasıl Hesaplanır?](/yazilar/vergi-orani-nasil-hesaplanir/)