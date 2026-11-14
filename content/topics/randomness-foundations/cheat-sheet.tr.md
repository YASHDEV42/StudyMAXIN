## Sınav özeti

- Entropi: saldırganın tahmin edememe belirsizliği.
- **CSPRNG:** güvenlik amaçlı, öngörülemez seed’den sözde rastgele çıktı üretir; sistem yeniden tohumlayabilir.
- Kriptografik anahtar, nonce/IV, salt ve token için işletim sistemi güvenli rastgele kaynağı kullan.
- Linux: `getrandom` / `/dev/urandom`; Python: `secrets` / `os.urandom`; Java: `SecureRandom`.
- `random` / Mersenne Twister kriptografi için değildir. Zaman/PID/sayaçtan kendi RNG’ni kurma.
- Salt gizli değil; benzersiz olmalı. GCM nonce’u aynı anahtarla tekrarlanamaz.
- Lav lambası duvarı fiziksel entropi kaynağı örneğidir; temel kural platform CSPRNG’sidir.
