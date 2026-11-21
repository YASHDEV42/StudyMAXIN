- **Simple structure — MS-DOS:** Katı modüler sınırlar yok; uygulama düşük seviyeli I/O'ya erişebilir; izolasyon zayıf.
- **Monolithic — UNIX:** Birçok OS servisi kernel adres alanında; doğrudan çağrı hızlı; hataların etkisi yayılabilir.
- **Layered:** Layer 0 hardware, layer N UI. Üst katman alt katman hizmetlerini kullanır.
  - **Artı:** Her katman ayrı debug/test/doğrulama.
  - **Eksi:** Katman tanımlamak zor; çok geçiş performans yükü.
- **Microkernel — Mach:** Temel çekirdek işlevleri içeride; diğer servisler user space.
  - **Artı:** İzolasyon, genişletilebilirlik.
  - **Eksi:** Message passing ve context switching overhead.

**Ana sınav sorusu:** Monolithic = çok sayıda kernel-space servis; Microkernel = servisleri user-space'e taşıma. Layered yaklaşım bağımlılık yönünü düzenler.
