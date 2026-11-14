## Sertleştirme bir bakım döngüsüdür

Sistemin saldırı yüzeyini azaltmak, gereksiz servis ve yazılımları envanterleyip iş ihtiyacı olmayanları kapatmakla başlar. Her hizmet ek kod, port, kimlik bilgisi ve bakım yükü getirir. Kapatma öncesi bağımlılıkları belirlemek, değişikliği test etmek ve gözlemlemek gerekir; gelişigüzel kapatma işlev kesintisine yol açabilir.

Yama yönetimi varlık/sürüm envanteri, risk önceliklendirme, test, dağıtım, doğrulama ve istisna takibinden oluşur. WannaCry vakası, bilinen açığa karşı güncellemelerin uygulanmaması ve ağ içi yayılımın etkisini artırabileceğini gösterir. Tarihsel vaka güncel tehditlerin tek önceliğini belirlemez; risk, erişilebilirlik, etki ve yamaya göre ele alınır. Segmentasyon, yedek ve olay müdahalesi ek katmanlardır.

CIS Benchmark gibi taban yapılandırmalar denetlenebilir öneriler verir. Önerileri doğrudan her ortama uygulamak yerine uygulama uyumluluğu ve operasyonel etkisi test edilmelidir. Denetim günlükleri olayların zaman çizgisini anlamaya yardım eder; erişim, saklama, bütünlük ve saat eşlemesi gerekir. Allowlisting yalnızca onaylı yazılımların çalışmasını veya değişikliklerin kabulünü sınırlar; bakım ve istisna süreçleriyle yönetilmelidir.

Özet süreç: varlıkları bil → taban yapılandırmayı seç → kontrollü uygula → uyum ve işlevi doğrula → günlükleri izle → değiştikçe güncelle. Sertleştirme en az ayrıcalık ve katmanlı savunmayı kalıcı işletim görevine dönüştürür.

Kaynağın örneklediği yönetim adımları; etkin servisleri envanterlemek, kullanılmayan servisi kontrollü kapatmak, gelen trafiği varsayılan reddedip gereken bağlantıya açık izin vermek, SSH root/parola politikasını gözden geçirmek, güvenlik güncellemelerini yönetmek ve setuid dosyalarını denetlemektir. Bunlar dağıtım ve hizmet ihtiyacına göre uyarlanmalıdır; örneğin uzaktan yönetilen bir sunucuda firewall kuralını uygulamadan önce erişim yolunu ve kurtarma konsolunu doğrulamak gerekir. Audit kuralları hassas dosyalara yazma ve ayrıcalık değiştirme olaylarını kaydedebilir; günlükleri ayrı ve erişimi kısıtlı bir toplayıcıya göndermek saldırganın iz silmesini zorlaştırır. Beyaz liste, varsayılan izin yaklaşımından daha dar bir politika kurar; istisnalar yine işletimsel olarak yönetilmelidir.

Derleme ve yayınlama aşamasındaki güven varsayımları [Trusting Trust](topic:trusting-trust) tartışmasında ele alınır.
