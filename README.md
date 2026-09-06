# EME'S DÖNER HAUS — Website (v1)

Bu klasör, GitHub reponuza yüklenmeye hazır, çalışan bir site iskeletidir.
Statik HTML/CSS/JS — build adımı yok, framework yok.

## Klasör yapısı

```
index.html           → Almanca ana sayfa (asıl dil)
tr/index.html         → Türkçe ana sayfa
impressum.html         → Yasal zorunlu sayfa (PLACEHOLDER alanlar var)
datenschutz.html      → Gizlilik politikası (PLACEHOLDER alanlar var)
robots.txt / sitemap.xml
_headers              → Cloudflare Pages güvenlik başlıkları
data/menu.json         → TÜM MENÜ TEK DOSYADAN — hem DE hem TR sayfası buradan besleniyor
assets/css/style.css
assets/js/main.js      → menüyü render eder, sekmeleri yönetir, çerez consent iskeleti
assets/fonts/          → Oswald + Work Sans, self-hosted (Google CDN kullanılmıyor)
assets/img/            → favicon + hero görseli (geçici, gerçek logo/fotoğraflarla değişecek)
```

## Yüklemeden önce mutlaka yapılacaklar

1. **`impressum.html`** içindeki `[Platzhalter]` (kesikli çerçeveli) alanları doldur:
   firma/işletme ünvanı, yetkili kişi adı, varsa vergi no, yetkili denetim makamı.
2. **`datenschutz.html`** içindeki tarih ve firma bilgisi placeholder'larını doldur.
3. **`data/menu.json`** — fiyatlar Instagram/TikTok postlarından derlenmiş **geçici** verilerdir.
   Lieferando'daki güncel tam menüyle karşılaştırıp gerçek liste ve fiyatlarla değiştir.
   Alerjen alanları (`allergens`) şu an boş — müşteriden alınca doldurulmalı.
4. **`assets/img/favicon.svg` ve `hero-motif.svg`** — şu an orijinal/geçici grafikler.
   Müşterinin gerçek logosu geldiğinde bunların yerine konabilir.
5. E-posta adresi `info@emesdonerhaus.de` olarak sabitlendi — Cloudflare Email Routing
   kurulmadan bu adres çalışmaz, kurulana kadar telefonu öne çıkarabilirsin.

## GitHub'a yükleme

1. Repo sayfasında **Add file → Upload files**.
2. Bu klasörün **içeriğini** (klasörün kendisini değil, içindeki dosya ve alt klasörleri)
   sürükle-bırak yap. Modern tarayıcılar klasör yapısını korur.
3. Commit message: `İlk site sürümü`.
4. Commit changes.

## Cloudflare Pages'e bağlama

1. Cloudflare → Workers & Pages → Create → Pages → Connect to Git → bu repoyu seç.
2. Build command: **boş bırak**. Build output directory: `/`.
3. Deploy sonrası Custom domains'e `emesdonerhaus.de` ve `www.emesdonerhaus.de` ekle.

## Sonradan eklenecekler (bu sürümde yok)

- GA4 / GTM / Microsoft Clarity / BigQuery export — domain aktifleşip site canlıya
  çıktıktan sonra eklenecek. `main.js` içindeki çerez consent iskeleti buna hazır,
  tag'leri eklerken `is-visible` banner'ını da HTML'e eklemek gerekiyor (şu an bilinçli
  olarak site boyunca hiç cookie set edilmediği için banner pasif tutuldu).
- Gerçek fotoğraf/video çekimi sonrası galeri bölümü.
- Kurumsal e-posta kurulumu (Cloudflare Email Routing).
