## Açılış zinciri nasıl güvenilir hâle gelir?

Bilgisayar açılırken henüz işletim sistemi çalışmıyordur; o hâlde ilk yüklenen kodun güvenilir olduğunu nasıl biliriz? Güvenli önyükleme (Secure Boot; güvenli önyükleme), firmware’den başlayıp imzalı bileşenleri doğrulayarak sonraki aşamanın yetkili kod olmasını amaçlar. Güven zincirinde her aşama bir sonrakini doğrular; kök anahtarın ve firmware’in korunması kritik varsayımdır. Doğrulama, ölçümle aynı şey değildir.

TPM (Trusted Platform Module; Güvenilir Platform Modülü) kriptografik anahtarları saklayabilir ve platform ölçümlerini PCR’lerde (Platform Configuration Registers) tutabilir. Ölçümlü önyüklemede firmware ve önyükleme bileşenlerinin özetleri PCR’lere genişletilerek eklenir; ölçüm değişikliği değerleri değiştirir. Ölçüm sistemi neyin açıldığını sonradan doğrulamaya/attest etmeye yardım eder, fakat tek başına kötü yazılımı durdurmaz. Secure Boot ise imza/politika doğrulamasıyla çalıştırılacak kodu engelleyebilir. İkisi tamamlayıcıdır.

Disk anahtarını PCR durumuna bağlamak, beklenen yapılandırmada otomatik açmayı ve değişiklikte kurtarma adımı istemeyi sağlayabilir. Fakat saldırganın firmware ayarlarına, fiziksel cihaza veya kurtarma anahtarına erişimi, yanlış ölçüm politikası ve anahtar sızması tehdit modelini değiştirir. Güvenli önyükleme güncelleme, iptal listesi ve kurtarma süreçlerini de gerektirir.

TEE (Trusted Execution Environment; Güvenilir Yürütme Ortamı) belirli kod/veriyi ana işletim sisteminden izole eden donanım temelli alan sunar. Bu, işletim sisteminin her veriyi göremediği anlamına gelebilir; ancak yan kanallar, güvenli olmayan giriş/çıkış, firmware ve uygulama kusurları sürer. Güven kökü donanım, firmware, bootloader, çekirdek ve uygulama boyunca uzanan zincirdir; her bileşene körü körüne güvenmek yerine ölçme, doğrulama, güncelleme ve kurtarma birlikte tasarlanır.

هذه التقنيات لا تقدم الخاصية نفسها: يوفر TPM جذراً عتادياً ومخزناً لقياسات/مفاتيح المنصة؛ ويفصل ARM TrustZone سياق «العالم الآمن» عن العالم العادي؛ أما Intel SGX فيقدم نموذج enklav على مستوى التطبيق. تختلف الأصول المحمية ونموذج التهديد ومخاطر القنوات الجانبية وشروط النشر؛ لذلك لا تعني كلمة TEE ضماناً واحداً متطابقاً.
