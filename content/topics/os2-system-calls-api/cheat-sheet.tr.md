## Tanımlar

- **System call:** User-mode uygulamanın kernel hizmeti istemesi.
- **API:** Programcının kullandığı fonksiyon arayüzü; Windows API, POSIX, Java API.
- **System-call interface:** API/library isteğini uygun kernel hizmetine yönlendirir.
- **RTE:** Programın çalışması için gerekli runtime desteği/kütüphaneler.
- **ABI:** Binary düzeyinde çağrı ve veri düzeni; API ile aynı değil.

## Akış

Application → API/library → system-call interface → kernel → return.

- **File copy:** Dosyaları aç → read/write → kapat; hata kontrolü unutulmaz.
- **`printf()`:** C library fonksiyonu; gerektiğinde `write()` sistem çağrısını kullanabilir.

## Parametre geçişi — üç yol

1. Register'larda.
2. Bellekte blok/tablo + adresi register'da.
3. Stack (yığın) üzerinden.

**Hatırla:** API kaynak düzeyi taşınabilirliğe yardımcı olur, her OS üzerinde aynı binary'yi garanti etmez.
