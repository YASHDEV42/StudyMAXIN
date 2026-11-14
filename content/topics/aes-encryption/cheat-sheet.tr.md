## Sınav özeti

- AES: 128 bit blok; anahtar 128/192/256 bit; tur sayısı 10/12/14.
- Girdi 16 baytlık, sütun öncelikli 4×4 durum tablosudur.
- GF(2⁸): toplama XOR; çarpma polinom çarpımı ve `0x11B` indirgeme polinomu.
- Tam tur sırası: **SubBytes → ShiftRows → MixColumns → AddRoundKey**. Başlangıçta AddRoundKey; son turda MixColumns yok.
- SubBytes doğrusal olmayan S-box uygular (`0x53 → 0xED`); ShiftRows satırları 0/1/2/3 bayt kaydırır; MixColumns sütunları karıştırır; AddRoundKey tur anahtarıyla XOR’dur.
- MixColumns örneği: `(D4,BF,5D,30) → (04,66,81,E5)`.
- AES-128 key schedule: 4 başlangıç sözcüğünden 44 sözcük / 11 tur anahtarı. Her dördüncü sözcükte RotWord, SubWord, Rcon.
- Çığ etkisi: tek bit değişimi turlar sonunda yaklaşık yarı çıktıyı değiştirir.
- Algoritmanın açıklığı sorun değildir; anahtar gizli kalır. AES blok şifresidir, çoklu blok için doğru mod şarttır.
