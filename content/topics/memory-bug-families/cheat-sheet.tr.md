## Sınav özeti

- Format string: dış girdi biçim şablonu olarak yorumlanır; sabit şablon kullan.
- Tamsayı taşması: boyut hesabını bozup küçük tahsis/büyük yazma doğurabilir. Çarpma öncesi sınır denetle.
- Use-after-free: serbest bırakılan nesneye eski işaretçiyle erişim.
- Heap overflow: heap nesnesinin sınırının dışına yazma; komşu tahsisler etkilenebilir.
- Double-free ve metadata corruption ayrı ilgili kusurlardır.
- Önleme: tür/uzunluk doğrulaması, açık sahiplik, güvenli API/dil; saptama: sanitizer, analiz, fuzzing.
- Hatanın etkisi girdi kontrolü, bellek düzeni ve azaltımlara bağlıdır.
- Off-by-one: sınırı tek öğe aşar. Double-free ayırıcı durumunu bozabilir; `NULL` ataması tek başına diğer alias işaretçileri düzeltmez.
- Başlatılmamış bellek okuma önceki veriyi sızdırabilir. Heartbleed (CVE-2014-0160), TLS heartbeat uzunluk denetimi eksikliğiyle sınır dışı okumaya örnektir.
