## Multiprogramming ve multitasking

**Multiprogramming** birden çok programı bellekte tutarak CPU kullanımını artırmayı amaçlar. Çalışan process I/O beklerse işletim sistemi hazır başka bir process'i seçebilir. **Multitasking / time sharing** ise kısa zaman dilimleriyle process'ler arasında sık geçiş yaparak etkileşimli kullanım ve kısa tepki süresi sağlar. **CPU scheduling** hazır process'ler arasından CPU'yu kullanacak olanı seçer; **job scheduling** belleğe/işleme alınacak işleri belirler.

## Dual-mode operation

**User mode** ve **kernel mode** ayrımı sistemi hatalı kullanıcı kodundan korur. Slayt örneğinde **mode bit** kullanıcı için 1, kernel için 0'dır. **Privileged instructions** yalnızca ayrıcalıklı modda yürütülür. **System call**, kullanıcı programının işletim sisteminden hizmet isteme yoludur. **Timer**, CPU denetiminin işletim sistemine geri dönmesini destekler ve bir programın CPU'yu süresiz elde tutmasını engellemeye yardımcı olur.

## Process yönetimi

**Program**, saklanan komutlar kümesidir ve pasif varlıktır; **process**, yürütülmekte olan programın aktif örneğidir. Process CPU süresi, bellek, dosya ve I/O kaynaklarına ihtiyaç duyar. **Program counter**, yürütülecek sonraki komutun adresini tutar. İşletim sistemi process ve thread oluşturma, sonlandırma, zamanlama, eşzamanlama ve haberleşme işlevlerini yürütür.

## Bellek ve dosya yönetimi

**Memory management**, kullanılan bellek bölgelerini ve sahiplerini izler; belleğe alınacak process'lere karar verir; alanları tahsis eder ve serbest bırakır. **File system**, depolama aygıtı ayrıntılarını dosya/dizin soyutlamasıyla sunar; oluşturma, silme, okuma, yazma ve erişim kontrolü sağlar. **Storage** ve **I/O management** kalıcı depolama ve çevre birimlerinin yönetimini kapsar.

## Protection ve security

**Protection**, kaynaklara erişim izinlerini ve işlemleri düzenler. **Security**, sistemin yetkisiz erişim ve tehditlerden korunmasıyla ilgilenir. Kernel veri yapılarında linked list, stack, queue, tree, hash table ve bitmap örnekleri bulunur.

## Hesaplama ortamları

Ders; geleneksel ve mobil sistemler, istemci-sunucu, peer-to-peer, dağıtık sistemler, sanallaştırma, bulut bilişim, gömülü/gerçek zamanlı sistemler ve açık kaynak işletim sistemlerini ele alır. Gereksinimler ortamın kaynaklarına, kullanıcı etkileşimine ve zamanlama koşullarına göre değişebilir.

**Öğretici ek:** I/O bekleyen bir process yerine hazır bir process'in yürütülmesi CPU kullanımını artırır; dosya izni kontrolü ise user-mode programın kernel hizmeti isterken erişim yetkisinin denetlenmesine örnektir.
