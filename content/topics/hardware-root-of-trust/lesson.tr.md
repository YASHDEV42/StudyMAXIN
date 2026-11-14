## Güvenli önyükleme ile ölçümlü önyükleme

Önyükleme güveni, bilgisayar açılırken işletim sisteminden önce çalışan koddan başlar. Secure Boot (güvenli önyükleme), firmware’in yetkili imzaları/politikayı kullanarak sonraki önyükleme bileşenlerini doğrulamasını sağlar. Her aşama bir sonrakini kontrol ederek zincir kurar. Güven kökü firmware ve anahtar yönetimine dayanır; imza doğrulaması tek başına doğru yapılandırma veya güncel bileşen garantisi değildir.

TPM kriptografik anahtarları koruyabilir ve ölçümleri PCR kayıtlarında saklayabilir. Her yeni ölçüm, önceki PCR değeri ve bileşen özeti birleştirilip özetlenerek PCR’ye genişletilir: `PCR_yeni = H(PCR_eski || ölçüm)`. Ölçümlü önyükleme bileşen özetlerini kaydeder; ölçümler değişirse PCR durumu da değişir. PCR kaydı tek başına hangi bileşenin sorunlu olduğunu açıklamaz; bunun için olay günlüğü ve doğrulayan tarafın güvenilir referans ölçümleri gerekir. Bu, sistemin hangi yazılımla açıldığını doğrulamaya/attest etmeye yarar. Ölçmek, bileşeni engellemek değildir. Secure Boot yetkisiz bileşenin çalışmasını önlemeye çalışır; measured boot durum kanıtı sağlar. İkisi birbirini tamamlar.

Disk şifreleme anahtarını beklenen PCR durumuna bağlamak, normal açılışta anahtarı serbest bırakıp farklı yapılandırmada kurtarma doğrulaması isteyebilir. Bunun güvenliği kurtarma anahtarının korunması, firmware/bootloader politikası, TPM erişimi ve fiziksel tehdit modeline bağlıdır. Güncelleme ve anahtar kurtarma süreci ihmal edilmemelidir.

TEE, belirli hesaplamayı ana işletim sisteminden ayrı korumalı bir ortamda yürütür. Ancak donanım izolasyonu yan kanal, uygulama hatası, firmware açığı ve giriş/çıkış güven sorunlarını ortadan kaldırmaz. Donanımsal güven kökü; güvenli başlatma, ölçüm, anahtar koruması, yama ve kurtarma zinciri olarak düşünülmelidir.

Önyükleme sonrası sistemin sürekli güvenli yapılandırılması [sertleştirme](topic:system-hardening) konusunun parçasıdır.

Örnekler aynı özellik değildir: TPM platform anahtarları/ölçümleri için donanım kökü ve saklama işlevi verir; ARM TrustZone güvenli ve normal dünya olarak işlemci bağlamlarını ayırır; Intel SGX uygulama içi enklav modeli sunar. Her birinin korunacak varlığı, tehdit modeli, yan kanal riski ve dağıtım koşulları farklıdır; “TEE” tek bir eşdeğer güvenlik garantisi değildir.
