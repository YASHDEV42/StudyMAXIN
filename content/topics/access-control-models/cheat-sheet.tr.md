## Sınav özeti

| Model | Karar temeli                              | Güç / sınırlama                                   |
| ----- | ----------------------------------------- | ------------------------------------------------- |
| DAC   | Kaynak sahibi                             | Esnek; sahibin hatasına açık                      |
| MAC   | Merkezî politika ve etiket                | Katı; kullanıcı gevşetemez                        |
| RBAC  | Kullanıcı rolü                            | Yönetimi kolay; rol birikimi fazla izin verebilir |
| ABAC  | Kullanıcı/kaynak/eylem/bağlam nitelikleri | Dinamik; politika karmaşık                        |

- Erişim matrisi: özne × nesne → izin.
- ACL nesneye göre; capability özneye göre izin temsili.
- **Bell–LaPadula (gizlilik):** yukarı okuma yok, aşağı yazma yok.
- **Biba (bütünlük):** aşağı okuma yok, yukarı yazma yok.
- Biba, düşük bütünlüklü verinin güvenilir süreci/nesneyi kirletmesini sınırlar.
- En az yetki, görevler ayrılığı ve bilme gereği tüm modellerde uygulanır.
- Zero Trust ABAC'la yakın ilişkilidir ama bir erişim modeliyle eş anlamlı değildir.
