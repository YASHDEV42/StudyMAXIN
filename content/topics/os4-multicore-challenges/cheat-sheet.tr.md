## Multicore'da 5 zorluk

1. **Identifying tasks:** Bağımsız görevleri bul.
2. **Balance:** İş yükünü çekirdekler arasında dengele.
3. **Data splitting:** Veri parçalama / iletişim maliyeti.
4. **Data dependency:** Görevler arası veri bağımlılıkları.
5. **Testing & debugging:** Yarış ve zamanlama hataları.

## Parallelism türleri

- **Data parallelism:** Aynı işlemi veri parçalarına uygula. Örn. dizi toplamının iki core'a bölünmesi.
- **Task parallelism:** Farklı işlemleri farklı thread'lere dağıt. Örn. aynı dizinin ortalama ve maksimumu.

**Dikkat:** Core sayısını artırmak, bağımlı görevleri otomatik hızlandırmaz.
