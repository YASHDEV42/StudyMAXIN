## Modern Kriptografinin Kuralları — Sınav Özeti

- **Kerckhoffs ilkesi:** Algoritma açık olsa da sistem güvenli kalmalı; gizli tutulacak unsur anahtardır.
- Saldırı gücü: ciphertext-only → known-plaintext → chosen-plaintext → chosen-ciphertext. Modern hedef güçlü saldırgana dayanmak ve çıktıyı ayırt edilemez kılmaktır.
- **XOR:** aynı bitler 0, farklı bitler 1; `P⊕K=C`, `C⊕K=P`.
- **One-time pad:** mesaj uzunluğunda, gerçek rastgele, yalnız bir kez kullanılan anahtar → mükemmel gizlilik. Koşullardan biri bozulursa garanti yoktur. Anahtar tekrarında `C1⊕C2=P1⊕P2`; Venona, tekrar kullanımın tarihsel örneğidir.
- OTP’nin pratik sorunu: mesaj kadar gizli anahtarı önceden güvenle dağıtma/depolama.
- **Hesaplamalı güvenlik:** kırma teorik olarak mümkün olabilir; uygulanabilir kaynak ve sürede yapılamaması hedeflenir.
- Anahtarın her biti olasılıkları iki katına çıkarır. Kaynak karşılaştırması: DES-56 yetersiz; AES-128 klasik kaba kuvvete pratikte dayanıklı; 192/256 daha geniş pay.
- Büyük anahtar boyu yeterli değildir: zayıf paroladan türetilen anahtar, düşük parola entropisiyle aranır; hatalı mod ve kötü kullanım güvenliği düşürür.

Kaynak: `teori-1-43-89.pdf`, fiziksel s. 21–23, bölüm 2.2.
