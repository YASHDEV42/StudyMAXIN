## IDS ve IPS’in görev farkı

IDS ağ trafiğini veya sistem olaylarını izler ve şüpheli etkinlikte alarm verir. IPS akış üzerinde inline durur ve eşleşen trafiği engelleyebilir. IPS yanlış pozitif olduğunda meşru trafiği kesebileceği için engelleme politikası dikkatle ayarlanır. Snort ve Suricata bilinen örüntüler için yaygın araçlardır.

## İki tespit yaklaşımı

İmza tabanlı sistem bilinen saldırı örüntülerini eşleştirir; doğru eşikte az yanlış alarm verir, ancak yeni saldırıyı veya eşik altındaki yavaş denemeyi kaçırabilir. Anomali tabanlı sistem normal davranıştan sapmayı arar; bilinmeyene duyarlı olabilir, fakat “normal” değişkendir ve yanlış pozitif üretebilir. Birlikte kullanmak kapsamı genişletir ama eksiksiz tespit garantisi vermez.

Kitaptaki kuralın `alert` alanı alarm üretir; `tcp`, dış ağdan iç ağın 22 portuna yönü, `flow:to_server` sunucuya giden akışı, `flags:S` yeni SYN denemelerini seçer. `threshold` aynı kaynaktan 30 saniyede beş deneme eşiği kurar; `sid` kimlik, `rev` revizyondur. IPS bağlamında engelleme eylemi `drop` olabilir. Hızını düşüren saldırgan eşiğin altında kalabileceğinden daha uzun zaman aralığı, hesap düzeyinde olaylar ve anomali analizi yararlıdır.

WannaCry örneği, imza güncellendikten sonra imza tespitinin; daha önceyse olağandışı SMB taramasının uyarı sağlayabileceğini anlatır. Sensörün ağdaki konumu ve şifreleme, görebildiği alanları sınırlar. Önceki güvenlik bölümlerindeki kontrol etkinliği ve yanlış pozitif dengesi burada da geçerlidir.
