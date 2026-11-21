## UML ve nesne yönelimli tasarım

**UML (Unified Modeling Language)**, OMG tarafından yönetilen standart grafik modelleme dilidir; programlama dili değildir. Model gerçek sistemin sadeleştirilmiş temsilidir. UML, tasarımı koddan önce anlaşılır kılar ve ekip içi iletişimi destekler (PDF s. 3–4). Bu derste **Class Diagram** statik yapıyı, **Use Case Diagram** aktörlerin sistemden istediği işlevleri, **Sequence Diagram** ise senaryodaki mesajların sırasını gösterir (s. 5).

**Class** ortak özellik/davranışların şablonu, **Object** ise çalışma zamanındaki örneğidir. OOD (Nesne Yönelimli Tasarım) sorumlulukları nesnelere paylaştırır ve gereksiz bağımlılıkları azaltır (s. 6).

## Dört temel tasarım kavramı

**Abstraction (soyutlama):** önemli özellikleri seçer, gereksiz ayrıntıları gizler. ATM'nin para çekme işlevini sunması; ağ ve banka veritabanı ayrıntılarını göstermemesi (s. 7).

**Encapsulation (kapsülleme):** iç durumu ve uygulama ayrıntılarını kontrollü arayüzün arkasında tutar. `BankAccount.balance` alanının public olmaması, `withdraw(amount)` ile kuralların denetlenmesi (s. 8).

**Fark (s. 9):** Abstraction “ne önemli?”, Encapsulation “iç durum ve erişim nasıl korunur?” sorusudur. Birlikte sade bir sözleşme sunarlar.

**Cohesion (uyum/bütünlük):** sınıf veya modül sorumluluklarının birbiriyle ilişki düzeyi. **High cohesion** tek, anlamlı sorumluluk kümesine odaklanır. Kayıt, ödeme, e-posta, rapor ve PDF'yi tek StudentService'te toplamak **low cohesion** örneğidir (s. 10).

**Coupling (bağlılık/bağımlılık):** sınıfların birbirlerinin ayrıntılarına bağımlılık derecesidir. **Low coupling**, bir sınıftaki değişikliğin diğerlerine yayılmasını azaltır. Arayüz veya event kullanımı gereksiz sıkı bağımlılığı azaltabilir; tüm bağımlılıklar kaldırılamaz (s. 11).

**Tasarım hedefi: High Cohesion + Low Coupling** (s. 12).

## Class Diagram notasyonu

Class Diagram sistemin statik sınıf, attribute, operation ve ilişki yapısını gösteren structural UML diyagramıdır; mesajların zaman sırasını göstermez (s. 13).

```text
Student
--------------------------
- studentNo: String
- name: String
+ status: bool = true
--------------------------
+ enroll(course: Course): bool
+ drop(course: Course): void
+ getName(): String
```

Üç bölme: sınıf adı / attributes / operations. Attribute: `<visibility> name: Type [multiplicity] = default {property}`; operation: `<visibility> method(parameters): ReturnType` (s. 14–16).

| Sembol | Visibility | Anlam                               |
| ------ | ---------- | ----------------------------------- |
| `+`    | public     | Genel erişim                        |
| `-`    | private    | Dışarıdan doğrudan erişim yok       |
| `#`    | protected  | Sınıf ve türevlerine sınırlı erişim |
| `~`    | package    | Aynı paket içinde erişim            |

Görünürlük kapsülleme kararının UML ifadesidir. UML kodun birebir kopyası olmak zorunda değildir; tasarım öncesi ya da koddan tersine üretilebilir (s. 17–18).

## Altı temel sınıf ilişkisi

| İlişki                       | Gösterim                              | Anlam                       | Örnek               |
| ---------------------------- | ------------------------------------- | --------------------------- | ------------------- |
| Association (ortaklık)       | Düz çizgi                             | yapısal knows/has-a         | Student–Course      |
| Dependency (bağımlılık)      | Kesikli açık ok                       | geçici uses/parametre       | Film ..> Kanal      |
| Aggregation                  | Bütün ucunda boş elmas `◇`            | zayıf part-of               | Car ◇— Wheel        |
| Composition                  | Bütün ucunda dolu elmas `◆`           | güçlü part-of/yaşam döngüsü | Order ◆— OrderLine  |
| Generalization / Inheritance | Üst sınıfa düz çizgi + boş üçgen      | IS-A                        | Student → Person    |
| Realization                  | Interface'e kesikli çizgi + boş üçgen | implements                  | Service → Interface |

**Association (s. 21, 23–24):** tek yönlü (Person → Address), çift yönlü (Student ↔ Course) veya reflexive (Directory–alt Directory / yönetici–çalışan) olabilir. Navigability ve iş kuralları ayrıca belirtilir.

**Multiplicity (çokluk, s. 22):** `1` tam bir; `0..1` sıfır veya bir; `*`/`0..*` sıfır veya çok; `1..*` bir veya çok; `m..n` aralık. Sayı, yazıldığı uçtaki nesnelerin karşı taraftaki tek nesneyle kaç kez ilişkilendiğini anlatır. Student–Course ilişkisinde iki uç `0..*` olabilir; School–Department örneğinde her bölümün **1** okulu, her okulun **1..*** bölümü vardır.

**Dependency (s. 25–26):** `Film.play(channel: Kanal)` işleminde Film, Kanal türünü parametre olarak kullanır; okun yönü Film'den Kanal'a doğrudur. Association daha kalıcı/yapısal bağı anlatır.

**Aggregation ve Composition (s. 27):** ikisi de bütün–parça ilişkisi. Aggregation'da parça bağımsız yaşayabilir (Car–Wheel), Composition'da parça çoğu zaman bütünün yaşam döngüsüne bağlıdır (Order–OrderLine). Diamond her iki durumda **bütün** tarafındadır.

**Generalization (s. 28):** alt sınıf gerçekten üst sınıfın bir türü olmalı: “Student bir Person mıdır?” → IS-A. Yalnız kod tekrarını azaltmak kalıtım için yeterli gerekçe değildir.

**Realization (s. 30–31):** class'ın interface sözleşmesini gerçekleştirmesi. Java'da `class C implements B`; interface başka interface'i `extends` ile genişletebilir. `interface B extends A; class C implements B` örneğinde B → A generalization, C → B realization çizilir.

## Gereksinimlerden diyagrama

**Üniversite modeli (s. 29, 33–34):** School, Department, Course, Student, Instructor. Bir okulda en az bir bölüm; her bölüm tek okula bağlı; bölüm ders açar; öğretim üyesi ders verebilir; öğrenci sıfır veya daha çok ders alabilir. Bağlantı uçlarının multiplicity değerlerini problem metninden çıkar. Slayt modelinin ilişki adlarının ve yönlerinin gerçek kurallarla netleştirilmesi gerektiği belirtilir.

**Yedi adım (s. 38):**

1. Metindeki isimlerden aday sınıfları çıkar.
2. Her sınıfın sorumluluğunu belirle; gereksizleri ele.
3. Attribute, operation ve visibility ekle.
4. İlişkinin anlamını belirle.
5. Multiplicity'yi iş kurallarından çıkar.
6. High cohesion ve low coupling açısından gözden geçir.
7. Diyagramı kod ve gereksinimlerle tutarlı tut.

**Kütüphane örneği (s. 36–37):** LibraryManagementSystem, User, Librarian, Book, Account, LibraryDatabase, Staff, Student. Sorgula: bir sınıf tüm işleri yaparsa cohesion düşer mi? Staff/Student gerçekten User türü mü? Book–LibraryDatabase bağı ne? Account'un anlamı açık mı? Hangi noktalarda interface uygun olur? Slaytlar bu soruları tartışma için verir; tek zorunlu çözüm sunmaz.

**Sık hata (s. 39):** her ismi sınıf yapmak; association/dependency karıştırmak; aggregation/composition'ı yalnız sembol sanmak; multiplicity'yi atlamak; her alanı public yapmak; God Class; UML'yi bütün kodun kopyasına dönüştürmek.

**Mini laboratuvar (s. 41):** Üniversite kayıt sisteminde en az 6 sınıf; sınıf başına 2–4 attribute ve 2–4 operation; association, dependency, generalization/realization ve uygunsa aggregation/composition; multiplicity; tasarım gerekçesi olarak 5–8 cümle. Bu aşamada kod zorunlu değildir.

**Tekrar soruları (s. 40):** Abstraction–Encapsulation farkı? High cohesion neden? Low coupling neden? `0..1`, `1..*`, `0..*` ne demek? Aggregation–Composition farkı? Generalization–Realization ayrımı?

_Kaynak: Hafta 2 ders PDF'i, fiziksel s. 1–42; metin dersin terim ve örneklerini korur._
