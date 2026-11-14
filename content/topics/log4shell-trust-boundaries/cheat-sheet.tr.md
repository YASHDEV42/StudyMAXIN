> **Kapsam:** 1.1 açılış vakası + tanım kutusu; fiziksel PDF 13–16 / basılı 2–5. 1.1.1 hariç. Tarih/protokol düzeltmesi birincil Apache kaydıyla belirtilmiştir; tablo tarihsel vaka içindir, güncel sürüm önerisi değildir.

## Mekanizmanın iskeleti

**CVE-2021-44228 / Log4Shell**, Aralık 2021: güvenilmeyen metin → günlük mesajı → `${...}` mesaj araması → JNDI → LDAP nesne çözümleme → uygun JVM/ayar koşullarında kod çalıştırma.

```java
logger.info("Gelen istek, User-Agent: {}", userAgent);
```

- `userAgent` istemci denetimindedir. Parametreli günlük çağrısı, eski kütüphanenin sonradan yaptığı lookup’ı otomatik engellemez.
- Enjeksiyon: **veri, yorumlayıcıda talimata dönüşür**.
- Kod yolu: `JndiLookup` → `jndiManager.lookup(key)` → `context.lookup(name)`.
- LDAP referansı: `dn` kayıt adı; `javaNamingReference` tür; `javaClassName` sınıf; `javaCodeBase` konum; `javaFactory` fabrika.
- Tarihsel altı adım: girdiyi ver → logla → ifadeyi çöz → LDAP yanıtını al → uzak sınıfı getir → `getObjectInstance()` yolunda uygulama yetkileriyle çalıştır.

## Koşulları karıştırma

- JDK 8u191: `com.sun.jndi.ldap.object.trustURLCodebase=false` varsayılanı uzak sınıf yükleme yolunu sınırlar. [OpenJDK kodu](https://raw.githubusercontent.com/openjdk/jdk8u/jdk8u191-b12/jdk/src/share/classes/com/sun/jndi/ldap/VersionHelper12.java).
- Mevcut classpath sınıflarıyla gadget/serileştirme yolları bazı ortamlarda farklı risk oluşturabilir; koşullar gereklidir.
- Tek yolun kapanması ≠ tüm kusurun giderilmesi.
- Geniş sürüm aralığı tek başına tam etki matrisi değildir; `log4j-core`, API-only kullanım ve geri taşınmış düzeltmeler ayrılmalı. [Apache güvenlik kaydı](https://logging.apache.org/security.html#CVE-2021-44228).

## Tarihsel düzeltme sırası

| Sürüm  | Tarih         | Ana nokta                                                                   |
| ------ | ------------- | --------------------------------------------------------------------------- |
| 2.15.0 | **6.12.2021** | Mesaj araması varsayılanda kapalı, JNDI daraltıldı; ardından CVE-2021-45046 |
| 2.16.0 | 13.12.2021    | Mesaj araması kaldırıldı, JNDI varsayılanda kapandı                         |
| 2.17.0 | 17.12.2021    | Özyinelemeli lookup DoS’u: CVE-2021-45105                                   |
| 2.17.1 | 27.12.2021    | JDBC/JNDI: CVE-2021-44832; yapılandırma yazma koşulu önemli                 |

**PDF düzeltmesi:** 2.15.0 için 10 Aralık/yalnız `java` yerine [Apache sürüm notları](https://logging.apache.org/log4j/2.x/release-notes.html#release-notes-2-15-0): 6 Aralık; `java`, `ldap`, `ldaps` kısıtları.

**Azaltım ≠ kalıcı düzeltme.** PDF’nin tarihsel örnekleri: 2.10+ `formatMsgNoLookups=true`, `JndiLookup.class` kaldırma. Bunlar tüm sonraki açıkları kapatan güncel işletim reçetesi değildir.

[Zihniyet](topic:security-mindset) · [Güven sınırları ve STRIDE](topic:threat-modeling-stride)
