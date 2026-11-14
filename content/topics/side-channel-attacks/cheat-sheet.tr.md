## Sınav özeti

- Yan kanal: zaman, güç, elektromanyetik yayılım veya cache gibi uygulama izlerinden gizli bilgi çıkarma.
- Erken çıkan karşılaştırma ve gizli bite bağlı dallanma zamanlama sızıntısı doğurur.
- Sabit zamanlı uygulama gizli girdiye bağlı dallanma/bellek erişimini önlemeye çalışır.
- Padding oracle: dolgu geçerliliğine göre değişen hata/yanıt/süre; seçilen ciphertext’i çözmeye yardım eder.
- Örnekler: Kocher zamanlama (1996), Bleichenbacher PKCS#1 v1.5 (1998), Lucky Thirteen TLS CBC (2013).
- Diğer kanallar: güç analizi, EM yayılımı, cache.
- Koruma yalnızca matematik değil; uygulama, hata davranışı ve donanım tasarımını kapsar.
