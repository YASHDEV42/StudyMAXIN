- **Tasarım hedefleri** donanım ve sistem tipine göre değişir.
- **User goals:** Kolay kullanım, öğrenme, hız, güvenilirlik, güvenlik.
- **System goals:** Esneklik, verimlilik, doğruluk, bakım ve geliştirme kolaylığı.
- **Policy:** _Ne yapılacak?_ Kaynak paylaşım kararı, CPU zaman dilimi.
- **Mechanism:** _Nasıl uygulanacak?_ Timer interrupt, context switch.
- **Kritik ilke:** Policy ve mechanism ayrı tutulmalı → değiştirilebilirlik.
- **Implementation:** Assembly (donanım yakın), C/C++ (sistem yazılımı), script dilleri (yardımcı araçlar).
- **Yüksek seviye dil avantajı:** Portability, okunabilirlik, bakım.
- **Önemli not:** Yüksek seviye dilin her zaman daha yavaş olduğu genellemesi doğru değildir.

**Soru örneği:** "Timer kullanımı" mechanism; "Timer süresini belirlemek" policy.
