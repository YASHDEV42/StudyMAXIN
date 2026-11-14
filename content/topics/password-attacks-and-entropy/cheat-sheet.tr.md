## Sınav özeti

- Rastgele seçim varsayımıyla: aday sayısı `N^L`; entropi `H = log₂(N^L) = L × log₂(N)` bit.
- Her ek karakter aday sayısını `N` ile çarpar. Uzunluk çoğu zaman sembol çeşitliliğinden daha çok katkı sağlar.
- İnsan kalıpları gerçek entropiyi düşürür; `Password1!` rastgele değildir.

| Saldırı             | Nasıl çalışır?                              | Uygun savunma yönü                                      |
| ------------------- | ------------------------------------------- | ------------------------------------------------------- |
| Kaba kuvvet         | Tüm olasılıkları dener                      | Uzun parola, çevrimiçi hız sınırı, yavaş parola karması |
| Sözlük/kural        | Yaygın parola ve dönüşümleri dener          | Sızmış parola engeli, benzersiz parola                  |
| Credential stuffing | Başka sitedeki doğru çiftleri yeniden dener | Her sitede benzersiz parola, MFA/passkey                |
| Password spraying   | Az sayıda yaygın parolayı çok hesaba dener  | Hız/risk tespiti, MFA                                   |
| Oltalama/AiTM       | Kullanıcıdan sırrı gerçek zamanda alır      | Origin bağlı passkey, dikkatli kurtarma tasarımı        |
| Tuş kaydedici       | Cihaz girdisini kaydeder                    | Uç cihaz güvenliği, parola dışı faktör                  |

- Entropi hesabı gerçek tahmin sırasını veya kesin kırılma süresini vermez.
- Sızdırılmış parolaları reddet; parola yöneticisi ve yapıştırmaya izin ver.
- Sık parola değişimi veya biçimsel sembol şartı, kullanıcıyı öngörülebilir kalıplara itebilir.
