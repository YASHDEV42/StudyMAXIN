## OS generation / installation
İşletim sistemleri farklı donanım mimarileri ve konfigürasyonları için hazırlanır. Kurulum veya yapılandırmada CPU türü, disk bölümleri ve formatı, bellek miktarı, aygıtlar ve seçilecek OS gibi bilgiler etkili olabilir. Slaytta CD-ROM, DVD-ROM, disk ve ISO image dağıtım örnekleri vardır. Eski sistemlerde bazı interrupt konfigürasyonları manuel yapılırken modern sistemlerde çoğu bilgi otomatik saptanabilir.

## Booting (önyükleme)
**Booting**, kernel'in yüklenip bilgisayarın çalışmaya başlamasıdır. Bilgisayar açıldığında veya resetlendiğinde işlemci donanımca tanımlanan başlangıç konumundan talimat yürütür. **Firmware** içindeki **bootstrap programı**, ilk donanımı hazırlar ve işletim sisteminin çekirdeğinin yüklenmesini başlatır. **ROM/EPROM** slayttaki tarihsel firmware depolama örnekleridir. Açılış dosyalarının bulunduğu aygıt **boot disk/system disk** olarak adlandırılabilir.

## Genel sıra
1. Power-on/reset.
2. Firmware başlangıcı ve temel donanım hazırlığı.
3. Bootstrap/bootloader'ın OS kernel'ini bulması.
4. Kernel'in ana belleğe alınması ve kontrolün devredilmesi.
5. Kernel kaynakları ve sistem servislerini başlatır.

## Karıştırılan kavramlar
- **Installation/configuration:** İşletim sistemini hedef donanım için kurmak ve yapılandırmak.
- **Booting:** Kurulu sistemin her açılışta yüklenmesi.
- **Program Counter (PC):** Sıradaki komutun adresini tutan yürütme durumu; instruction register ile aynı değildir.

**Kaynak dışı teknik not:** BIOS/UEFI ve gömülü aygıtlarda açılış ayrıntıları farklıdır. Mobil OS'nin tamamının EPROM'da tutulduğu anlatımı tarihsel bir genellemedir, bütün güncel cihazlar için geçerli değildir.
