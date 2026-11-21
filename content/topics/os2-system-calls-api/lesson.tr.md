## System call neden gereklidir?

Kullanıcı programları korumalı donanım ve çekirdek kaynaklarına doğrudan müdahale etmez. **System call (sistem çağrısı)**, **user mode** içindeki uygulamanın kernel'den hizmet talep etmesidir. Örnekler: dosya açma, I/O, süreç oluşturma.

Slayt şeması: **User application → API/library → system-call interface → kernel hizmeti → sonuç**. API çağrıları gerekli hizmete aracılık edebilir; API fonksiyonunun adı her zaman gerçek kernel çağrısıyla birebir eşleşmez.

## API ve RTE

**API (Application Programming Interface)** programcının kullandığı fonksiyon adları, parametreleri, dönüş değerleri ve davranış sözleşmesidir. Örnekler **Windows API, POSIX API, Java API**. **Run-Time Environment (RTE)** uygulamanın çalışması için gereken kütüphaneleri ve yürütme desteğini içerir. **System-call interface**, istenen kernel hizmetine geçişi sağlar; sistem çağrı numarası üzerinden uygun işlemi seçebilir.

**ABI (Application Binary Interface)** ise çağrı düzeni, veri türlerinin boyutu, register/stack kullanımı ve ikili uyumluluk gibi düşük seviyeli sözleşmedir; API ile eşanlamlı değildir.

## İki örnek

**Dosya kopyalama:** Dosya adlarını al → kaynak/hedef dosyayı aç → hata durumlarını kontrol et → read/write döngüsü → dosyaları kapat → sonucu bildir.

**Standart C kütüphanesi:** `printf()` kullanıcı düzeyindeki bir library fonksiyonudur; çıktı gerektiğinde uygun `write()` sistem çağrısını kullanabilir. Buffering nedeniyle her `printf()` çağrısının ayrı bir kernel çağrısı olması zorunlu değildir.

## Parametre aktarımı

1. **Registers (yazmaçlar):** Parametreler register içinde taşınır; kapasite sınırlıdır.
2. **Block/table in memory:** Parametreler bellekteki tabloda; tablonun adresi register'da taşınır. Slayttaki X tablosu örneği.
3. **Stack (yığın):** Parametreler yığına eklenir; sistem oradan okur.

**Kaynak dışı açıklama:** Aynı API'yi kaynak kod seviyesinde kullanmak, farklı OS için üretilen executable'ların otomatik ikili uyumlu olduğu anlamına gelmez.
