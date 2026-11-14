## Erişim matrisi, ACL ve capability

Kimlik doğrulama “kullanıcı kim?” sorusunu yanıtlar; erişim kontrolü, bu öznenin hangi nesnede hangi işlemi yapabileceğini belirler. Soyut erişim matrisi satırlarda özneleri, sütunlarda nesneleri, hücrelerde okuma/yazma/çalıştırma gibi izinleri gösterir. ACL bu matrisi nesne başına tutar: “Bu dosyaya kim erişebilir?” Capability yaklaşımı ise özne başına izinli nesnelerin yeteneklerini taşır: “Bu süreç hangi kaynak anahtarlarına sahip?” OAuth erişim token'ı bu fikre benzer; token'ı taşıyan taraf kapsam dahilindeki erişimi kullanabilir.

## DAC, MAC, RBAC ve ABAC

**DAC (isteğe bağlı erişim kontrolü)** kaynak sahibinin paylaşım kararıdır. Esnektir, fakat sahip hatası veya sahibin yetkileriyle çalışan kötü amaçlı yazılım geniş erişim doğurabilir. **MAC (zorunlu erişim kontrolü)** kararı merkezi politika ve güvenlik etiketlerine bırakır; kullanıcı etiketi kendi başına gevşetemez. Katı ve denetlenebilir, ancak daha az esnek olabilir. **RBAC (rol tabanlı)** izinleri “muhasebe” veya “yönetici” gibi rollere bağlar; kullanıcıların görevi değiştiğinde yönetimi kolaylaştırır, fakat gereksiz veya birikmiş roller fazla yetki yaratabilir. **ABAC (öznitelik tabanlı)** kullanıcı, kaynak, eylem ve bağlam niteliklerinden karar üretir; örneğin yalnızca uygun cihazdan ve mesai saatinde erişim. Esnekliği artarken politika tasarımı, test ve açıklanabilirlik karmaşıklaşabilir.

Bu modeller birbirinin her koşulda yerini almaz. Gereksinimlere göre seçilir ve en az yetki, görevler ayrılığı, bilme gereği ilkeleriyle sınırlandırılır. Örneğin ödemeyi başlatan kişinin tek başına onaylayamaması görevler ayrılığıdır. [Zero Trust](topic:zero-trust-architecture), bağlamı her istekte yeniden değerlendirme fikriyle ABAC'a yakındır; fakat tek bir erişim modeli değildir.

## Bell–LaPadula ve Biba bilgi akışı kuralları

Bell–LaPadula gizliliğe odaklanır: **yukarı okuma yok** (düşük gizlilik düzeyindeki özne üst düzeyi okuyamaz) ve **aşağı yazma yok** (yüksek düzeydeki özne bilgiyi alt düzeye sızdıramaz). Biba bütünlüğe odaklanır ve yönleri ters çevirir: **aşağı okuma yok** (yüksek bütünlüklü özne düşük bütünlüklü kaynaktan okumaz) ve **yukarı yazma yok** (düşük bütünlüklü kaynak yüksek bütünlüklü nesneyi değiştiremez). Bu modeller, CIA içindeki gizlilik ile bütünlüğün farklı bilgi akışı hedefleri olduğunu gösterir.

Kurallar belirli formal modelleri açıklar; her güncel RBAC/ABAC uygulamasının otomatik özelliği değildir. Gerçek güvenlik, doğru etiket, rol, öznitelik ve istisna yapılandırmasına bağlıdır.
