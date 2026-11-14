Secure SDLC, güvenliği gereksinimden işletime yayar. **Shift-left**, kontrolleri tasarım/kod aşamasına erkene alır; üretim izlemesini kaldırmaz.

- **STRIDE:** Spoofing (kimlik doğrulama), Tampering (bütünlük), Repudiation (hesap verebilirlik), Information disclosure (gizlilik), Denial of service (erişilebilirlik), Elevation of privilege (yetkilendirme).
- STRIDE tehdit arama kontrol listesidir; tamamlanması güvenlik kanıtı değildir.
- **SAST:** kodu çalıştırmadan analiz; riskli kalıp. **DAST:** çalışan uygulamayı dışarıdan test. **IAST:** runtime içi sensör. **SCA:** bağımlılıklar/bilinen CVE/SBOM.
- CI/CD örneği: SAST + secret scan → SCA/SBOM → testte DAST/IAST → kritik bulgu yoksa dağıtım → runtime izleme.
- Eşikler ve istisnalar tanımlı olmalı; gürültülü tarama atlanır, etkisiz kapı riski geçirir.
- CI/CD hattı da hedeftir: en az yetki, vault sırları, korunan pipeline değişiklikleri, build araçlarının denetimi ve provenance.
- SBOM/provenance izlenebilirlik sağlar; güvenli kod garantisi değildir.
- “Geç bulgu daha pahalı” ekonomik yönelimdir, her projede geçerli sabit katsayı değildir.
