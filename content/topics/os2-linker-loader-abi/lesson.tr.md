## Compiler, linker ve loader

1. **Compiler (derleyici)** kaynak kodu **relocatable object file** biçimine (`main.o`) dönüştürür.
2. **Linker (bağlayıcı)** object dosyaları ve gereken kütüphaneleri birleştirir, sembol referanslarını çözer ve executable üretir.
3. **Loader (yükleyici)** yürütülebilir programı belleğe yerleştirir ve çalıştırmaya hazırlar.
4. **Relocation (yeniden konumlandırma)** programdaki adresleri yerleştirme/çalıştırma konumuna uygun hale getirir.

**Static linking:** Kod veya kütüphane bağlantıları build sırasında ikiliye eklenebilir. **Dynamic linking:** Paylaşılan kütüphaneler yükleme veya çalışma sırasında bağlanabilir. Slaytlardaki Windows **DLL (Dynamic-Link Library)** buna örnektir. Linkleme ile yükleme farklı aşamalardır.

## Uygulamalar neden işletim sistemine özgüdür?

Bir executable, işletim sisteminin sistem çağrıları, kütüphaneleri, binary formatı, işlemci mimarisi ve **ABI** kurallarıyla uyumluluk gerektirir.

- **API (Application Programming Interface):** Kaynak kod düzeyinde fonksiyonlar, parametreler ve davranışlar.
- **ABI (Application Binary Interface):** Register kullanımı, çağrı kuralları, veri türlerinin boyutu, adres genişliği ve ikili format gibi düşük seviyeli sözleşme.

Aynı API kullanılsa bile binary'nin başka bir OS üzerinde doğrudan çalışması garanti değildir.

## Üç taşınabilirlik yaklaşımı

1. **Interpreted languages:** Python/Ruby gibi yorumlayıcıyla çalışabilen diller; uygun interpreter ve kütüphaneler gerekir.
2. **Virtual machine / RTE:** Java bytecode'un JVM üzerinden çalışması; platforma uygun runtime gerekir.
3. **Standard language + recompilation:** C gibi dillerle yazılan kodu hedef OS/mimari için yeniden derlemek; taşınabilirlik test ve değişiklik gerektirebilir.

## `read()` API örneği

`ssize_t read(int fd, void *buf, size_t count)`: `fd` dosya tanıtıcısı, `buf` veri tamponu, `count` istenen azami bayt sayısıdır. Başarılı dönüş okunan bayt sayısı; EOF için 0; hata için -1'dir.

**Öğretici ek:** Windows ve Linux için C kodunu yeniden derlemek bile kullanılan platforma özgü API'lerin değiştirilmesini gerektirebilir.
