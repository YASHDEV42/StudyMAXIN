## UML ve OOD — hızlı tekrar

- **UML:** OMG standart modelleme dili; programlama dili değildir. Model sistemin basitleştirilmiş temsilidir.
- **Class Diagram:** statik yapı (sınıf, attribute, operation, ilişkiler).
- **Use Case:** aktörler ve istenen işlevler.
- **Sequence:** mesajların zaman sırası.
- **Class:** şablon; **Object:** sınıfın çalışma zamanındaki örneği.

## Dört kavram

| Kavram                         | Tanım ve hedef                                                  |
| ------------------------------ | --------------------------------------------------------------- |
| Abstraction (soyutlama)        | Önemli davranışı seçme, gereksiz ayrıntıyı gizleme; ATM örneği  |
| Encapsulation (kapsülleme)     | İç durumu kontrollü arayüzle koruma; private balance + withdraw |
| Cohesion (uyum/bütünlük)       | Sınıf içi sorumlulukların ilişkisi; **high** istenir            |
| Coupling (bağlılık/bağımlılık) | Sınıflar arası ayrıntı bağımlılığı; **low** istenir             |

**Tasarım hedefi: HIGH COHESION + LOW COUPLING.**

## Class gösterimi

**Üç bölüm:** Class name / Attributes / Operations.

- Attribute: `<visibility> name: Type [multiplicity] = default {property}`
- Operation: `<visibility> method(param: Type): ReturnType`
- `+` public; `-` private; `#` protected; `~` package.
- UML gerçek kodun birebir kopyası olmak zorunda değildir.

## 6 ilişki — sınav tablosu

| İlişki         | Anahtar kelime   | Sembol                                  | Örnek               |
| -------------- | ---------------- | --------------------------------------- | ------------------- |
| Association    | knows / has-a    | düz çizgi                               | Student–Course      |
| Dependency     | uses / parametre | kesikli açık ok                         | Film ..> Kanal      |
| Aggregation    | weak part-of     | boş elmas, bütün tarafında              | Car ◇— Wheel        |
| Composition    | strong part-of   | dolu elmas, bütün tarafında             | Order ◆— OrderLine  |
| Generalization | IS-A / extends   | düz çizgi + boş üçgen (üst tür yönü)    | Student → Person    |
| Realization    | implements       | kesikli çizgi + boş üçgen (arayüz yönü) | Service → Interface |

**Karşılaştırmalar:**

- Association = yapısal ilişki; Dependency = kullanım nedeniyle bağımlılık.
- Aggregation = parça bağımsız yaşayabilir; Composition = parça yaşam döngüsü bütüne bağlı olabilir.
- Generalization = “bir türüdür”; Realization = “arayüz sözleşmesini uygular”.
- Bir sınıf kendisiyle association kurabilir (recursive/reflexive ilişki).

**Multiplicity:** `1` tam bir; `0..1` sıfır/bir; `0..*` veya `*` sıfır/çok; `1..*` bir/çok; `m..n` verilen aralık. **Değeri doğru uca yaz!**

## Model kurma: 7 adım

1. İsimlerden aday sınıfları çıkar.
2. Sorumlulukları tanımla ve gereksiz sınıfları ele.
3. Attribute/operation/visibility ekle.
4. Anlama göre ilişki seç.
5. İş kurallarından multiplicity belirle.
6. Cohesion/coupling kontrolü yap.
7. Kod ve gereksinimlerle tutarlı tut.

**Üniversite örneği:** School → Department (bir okul için `1..*` bölüm; bölüm başına `1` okul), Department–Course, Student–Course, Course–Instructor.

**Koddan diyagram sorusu:** `interface B extends A`, `class C implements B` → B’den A’ya generalization, C’den B’ye realization.

**Sık hatalar:** Her isim = sınıf; association/dependency karışması; elmasları anlamsız ezberleme; multiplicity eksikliği; tüm alanları public yapma; God Class; gereksiz detaylı diyagram.

**Laboratuvar:** en az 6 sınıf; 2–4 attribute/operation; association + dependency + generalization/realization; uygun bütün-parça bağlantısı; multiplicity ve 5–8 cümle gerekçe.

## Önce kendin cevapla (PDF s. 40)

1. Abstraction ile Encapsulation farkı?
2. High Cohesion neden hedeflenir?
3. Low Coupling neden hedeflenir?
4. `0..1`, `1..*`, `0..*` ne anlama gelir?
5. Aggregation ile Composition farkı?
6. Generalization ile Realization ayrımı nasıl yapılır?

_Kaynak: Hafta 2, fiziksel PDF s. 1–42._
