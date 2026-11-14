## Sınav özeti

- Secure Boot: imza/politika ile yetkisiz boot bileşenini çalıştırmamayı hedefler.
- Measured boot: önyükleme bileşenlerini ölçüp TPM PCR’lerine kaydeder; tek başına engelleme yapmaz.
- TPM anahtar koruması ve platform durumu kanıtı sağlar; güvenli kullanım politikasına ihtiyaç vardır.
- PCR’ye bağlı anahtar serbest bırakma beklenen yapılandırmaya bağlanabilir; kurtarma anahtarı ve firmware güveni kritiktir.
- TEE, belirli kod/veriyi ana OS’den yalıtır; yan kanal ve uygulama/firmware kusurları sürebilir.
- Ölçüm ≠ doğrulama/engelleme. Secure Boot ile ölçümlü önyükleme tamamlayıcıdır.
  | Teknoloji     | Temel rol                                        | Sınır                                                            |
  | ------------- | ------------------------------------------------ | ---------------------------------------------------------------- |
  | TPM           | Anahtar saklama, ölçüm/PCR ve attestation temeli | Tek başına boot kodunu engellemez; politika ve event log gerekir |
  | Secure Boot   | İmza/politikayla sonraki aşamayı doğrulama       | Anahtar/firmware güveni ve güncelleme iptali kritik              |
  | ARM TrustZone | Güvenli/normal dünya ayrımı                      | Firmware ve güvenli dünya kodu da güven varsayımı                |
  | Intel SGX     | Uygulama enklavı                                 | Yan kanal, I/O ve uygulama hataları sürebilir                    |
