## İşlemci mimarileri
**Tek işlemcili sistemler** genel amaçlı komutları tek ana işlemciyle yürütür; I/O aygıtlarının kendi denetleyici işlemcileri bulunabilir. **Çok işlemcili sistemler**, iki veya daha fazla CPU ile çalışır; bellek, I/O ya da iletişim kaynaklarını paylaşabilir. Avantajları throughput artışı, ekonomik kaynak paylaşımı ve bazı hatalara karşı daha iyi hizmet sürekliliğidir. Daha fazla CPU her zaman doğrusal hızlanma garantilemez.

## SMP, AMP ve multicore
**SMP (Symmetric Multiprocessing)** yapısında işlemciler eş düzeyde görev alabilir ve ana belleği paylaşır. İşlemcilerin kendi register ve önbellekleri bulunabilir. **AMP (Asymmetric Multiprocessing)** yapısında işlemcilere farklı görevler atanır; bir işlemci diğerlerini yönetebilir.

**Multicore**, tek yonga üzerine birden çok çekirdeğin yerleştirilmesidir. Çekirdekler bazı kaynaklarını paylaşırken kendi yürütme kaynaklarına da sahiptir. Çok çekirdekli yapı ile birden fazla fiziksel bilgisayardan oluşan küme aynı şey değildir.

## UMA ve NUMA
**UMA:** İşlemciler açısından ana belleğe erişim süresi tekdüzedir. **NUMA:** Bellek erişim süresi işlemcinin bellek bölgesine uzaklığına göre farklılaşır. İşletim sisteminin bellek ve iş planlaması NUMA dezavantajını azaltmaya yardımcı olabilir.

## Kümelenmiş sistemler
**Clustered systems**, ağ üzerinden haberleşen birden fazla bağımsız sistemden oluşur. Paylaşılan depolama kullanabilir ve **high availability** sağlayabilirler. **Asymmetric clustering** yapısında bir düğüm aktif, diğeri hot-standby olabilir. **Symmetric clustering** yapısında birden fazla düğüm aktif çalışıp birbirini izleyebilir. Bazı kümeler işi bölerek paralel işlem yapar.

**Öğretici ek:** Bir dizüstündeki dört CPU çekirdeği multicore örneğidir; ağdaki dört ayrı sunucunun birlikte çalışması cluster örneğidir.
