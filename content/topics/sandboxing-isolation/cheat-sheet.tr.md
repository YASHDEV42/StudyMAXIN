## Sınav özeti

- Sandbox kusuru silmez; saldırı sonrası erişim/etki alanını daraltır.
- seccomp: Linux sistem çağrısı filtresi; dosya yetkisi veya ağ segmentasyonu yerine geçmez.
- namespaces: süreç görünümünü ayırır (PID, mount, network, user vb.).
- cgroups: CPU/bellek/süreç gibi kaynakları gruplar ve sınırlar.
- Konteyner ana makine çekirdeğini paylaşır; VM ayrı konuk çekirdeği çalıştırabilir. Hipervizör de güven varsayımıdır.
- SELinux/AppArmor: MAC politikalarıyla erişimi kısıtlar.
- Rootless, dar capability, host mount/soketlerini sınırlama ve yamalar önemlidir.

| Namespace | İzole edilen görünüm               |
| --------- | ---------------------------------- |
| PID       | Süreç kimlikleri/listesi           |
| NET       | Ağ arayüzü, port, rota             |
| MNT       | Mount noktaları/kök dosya sistemi  |
| USER      | Kullanıcı/grup eşlemesi            |
| UTS       | Hostname/domain adı                |
| IPC       | Süreçler arası iletişim kaynakları |

`seccomp` filtresi syscall numarası ve tanımlı metadata/argümanlar için eylem seçebilir; her filtre reddi zorunlu olarak süreç öldürme değildir. cgroup v2 `memory.max` gibi denetimlerle kaynak sınırı koyabilir.
