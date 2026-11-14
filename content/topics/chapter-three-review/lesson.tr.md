## Bölümün kavramsal zinciri

Hafta, simetrik anahtarları kullanıcılar arasında dağıtmanın büyüme sorunuyla başlar. Açık anahtar yöntemleri tek yönlü/trapdoor matematik sayesinde anahtar kurma ve imza olanağı sağlar. Modüler aritmetik ileri üs alma işlemini verimli kılar; ters yöndeki ayrık logaritma veya asal çarpanlara ayırma uygun büyük parametrelerde zordur.

Diffie–Hellman, dinlenen kanalda ortak sır kurar ama tarafların kimliğini kendi başına doğrulamaz. RSA ve ECC farklı kriptografik işlemlerde kullanılır; imza genel olarak özel anahtarla şifreleme değildir. Sertifika açık anahtarı kimliğe bağlar. PKI zinciri güvenilir kök deposuna ulaşır; TLS 1.3 bu kimlik doğrulamayı geçici ECDHE, HKDF ve AEAD kayıt şifrelemesiyle bir araya getirir.

İleri gizlilik uzun süreli anahtarın sonradan çalınmasına karşı geçmiş oturumları korur. Heartbleed sınır denetiminin, yan kanal saldırıları zaman/hata/donanım izlerinin ve anahtar yönetimi tüm yaşam döngüsünün önemini gösterir. Kuantum bilgisayarlar Shor yoluyla RSA/DH/ECC varsayımlarını tehdit eder; uzun süre gizli kalması gereken veriler için bugünkü hasat riski vardır. PQC ve kripto-çeviklik geçişin anahtarıdır.

## Kaynağın öz denetim sorularına yanıtlar

1. `500×499/2=124.750` simetrik anahtar gerekir; açık anahtarlı modelde `2×500=1.000` anahtar.
2. Modüler üs alma ileri yönde kolay, ayrık logaritmayı bulma uygun gruplarda zordur; DH ve eliptik eğri sistemleri bu asimetriyi kullanır.
3. Ham DH’de saldırgan iki ayrı değer alışverişi kurarak araya girer. Sertifika ve imzayla anahtar paylaşımını kimliğe bağlamak açığı kapatır.
4. RSA için `n` çarpanlara ayrılır, `φ(n)` hesaplanır, sonra `e`’nin modüler tersi `d` bulunur. Büyük sayıyı çarpanlara ayırma zorluğu temel engeldir.
5. ECC’nin ayrık logaritma problemi daha küçük anahtarlarla benzer güvenlik düzeyi sağlayabilir; depolama, iletişim ve hesaplama maliyetini azaltır.
6. Kendinden imzalı sertifika kendi Subject’ini Issuer olarak gösterir; imzası matematiksel olarak geçerli olsa bile tarayıcının kök deposunda güvenilir sayıldığı anlamına gelmez.
7. ECDHE geçici sırları oturum bazında üretilip silinir. Sunucu anahtarı imza/kimlik için olduğundan sonradan çalınması eski oturum sırrını geri getirmez.
8. Heartbleed hiçbir RSA/AES/SHA algoritmasını kırmadı; OpenSSL’de beyan edilen uzunluğa karşı sınır kontrolü eksikti.
9. Uzun vadeli sır içeren ciphertext bugün saklanıp kuantum yeteneği gelişince açılabilir; sağlık, devlet ve biyometrik bilgiler önceliklidir.
10. Hibrit yaklaşım uzun süre sınanmış klasik yöntemle yeni PQC yöntemini birleştirir; bir varsayımın beklenmedik kusuruna karşı çeşitlilik sağlar, ancak doğru KDF/protokol bileşimi gerekir.

**Öğretici ek:** Yanıtlar kaynak sorularını kavramsal açıklamayla tamamlar; küçük hesap örnekleri gerçek anahtar boyutu önerisi değildir.

İlişkili konular: [açık anahtar uygulamaları](topic:public-key-cryptography-practices) · [çözümlü alıştırmalar](topic:chapter-three-worked-exercises).
