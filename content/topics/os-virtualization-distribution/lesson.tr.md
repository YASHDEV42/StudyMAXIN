## Sanallaştırma
**Virtualization (sanallaştırma)**, tek bir fiziksel bilgisayarın kaynaklarını birden fazla yürütme ortamına soyutlayarak her ortamın kendi makinesinde çalışıyormuş gibi davranmasını sağlar. **Virtual Machine Manager (VMM)** sanal makineler için kaynak ve yürütme hizmetleri sunar. Bir **host** üzerinde birden fazla **guest operating system** çalışabilir. Kullanım alanları uyumluluk testi, uygulama geliştirme, kalite güvencesi ve veri merkezi yönetimidir.

**Emulation (öykünme)**, donanımın veya farklı bir işlemci mimarisinin yazılımla taklit edilmesidir; çoğu zaman daha yüksek yürütme maliyeti vardır. **Interpretation (yorumlama)** kaynak kodun ya da ara kodun yorumlayıcıyla yürütülmesidir. Bu kavramlar aynı değildir.

## Dağıtık sistemler
**Distributed system (dağıtık sistem)**, ağla bağlı, fiziksel olarak ayrı ve gerekirse heterojen bilgisayarlardan oluşur. Kaynak paylaşımı ve iletişim temel amaçlardır. Ağ türleri: **LAN** (yerel alan), **WAN** (geniş alan), **MAN** (metropol alan), **PAN** (kişisel alan). TCP/IP yaygın bir iletişim protokol ailesidir.

**Network operating system**, farklı bilgisayarlardaki süreçler arasında mesajlaşma ve dosya paylaşımı gibi işlevler sağlar. Ağla bağlı sistemlerin tümü tek bir fiziksel bilgisayar değildir.

**Öğretici ek:** Aynı bilgisayardaki iki guest OS sanallaştırma örneği; iki bağımsız sunucunun ağ üzerinden birlikte hizmet üretmesi dağıtık sistem örneğidir.
