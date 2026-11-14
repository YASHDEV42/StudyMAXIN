## Kaynak kodu incelemesi güveni neden bitirmez?

Thompson’ın “Trusting Trust” düşünce deneyi, derleyiciye duyulan güveni sorgular. Değiştirilmiş bir derleyici belirli kaynak kodu derlenirken gizli davranış ekleyebilir. Daha ileri aşamada, derleyicinin temiz görünen kaynak kodu normal davranırken derlenmiş derleyici bu arka kapıyı yeni derleyiciye yeniden ekleyebilir. Sonuçta kaynak denetlenmiş olsa bile hedef ikili beklenmedik davranış taşıyabilir.

Akış: T0 derleyicisi değiştirilmiştir → temiz derleyici kaynağı T0 ile derlenir → T1 ikilisi gizli davranışı taşır → T1 hedef programı derlerken aynı davranışı ekler. Bu bir güven zinciri düşünce deneyidir; her derleyicinin böyle olduğuna dair iddia değildir. Güven derleyici dışında assembler, linker, kütüphane, build scripti, CI sunucusu, bağımlılıklar ve yayınlama anahtarlarını kapsar.

Tekrar üretilebilir derleme aynı girdilerin bağımsız ortamda aynı ikiliyi vermesini kontrol etmeye yarar; kötü girdiyi veya tüm araç zincirini tek başına aklamaz. Bağımsız derleyici zincirleriyle karşılaştırma (diverse double compiling) gizli derleyici davranışını saptamaya yardımcı olabilir, ancak güvenilen bootstrap ve derleyici çeşitliliği varsayımları vardır. İmzalı artifact ve provenance kaynağı izlemeyi sağlar; imza, imzalayanın güvenilirliğini varsayar.

XZ Utils CVE-2024-3094, aynı tedarik zinciri temasını gerçek bir olayla gösterir: Debian danışma kaydına göre zararlı kod upstream kaynak arşivlerindeki build sürecinde `liblzma` çıktısına enjekte edildi. Bu, Thompson’ın kendi kendini yeniden üreten derleyici düşünce deneyiyle aynı teknik mekanizma değildir; ortak ders, incelenen Git kaynağı ile dağıtılan kaynak arşivi ve ikili arasındaki üretim yolunun da güven sınırı olduğudur. SolarWinds de derleme/dağıtım zincirinin güvenini gösteren ayrı bir vakadır; olayları tek teknik mekanizmaya indirgemeyin.

Bu yüzden “kaynak kodu açık” iddiası ile “üretilen ikili doğrulandı” iddiası ayrıdır. Tedarik zinciri güvencesi, araçları ve CI erişimini korumayı, bağımsız derleme/karşılaştırmayı ve sürüm bütünlüğünü birlikte gerektirir.

Geliştirme aşamasındaki bu güven zinciri, önceki [güvenli SDLC ve DevSecOps](topic:secure-sdlc-devsecops) konusuyla da ilişkilidir.
