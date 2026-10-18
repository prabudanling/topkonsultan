#!/usr/bin/env python3
"""
gen-seo-assets.py — Aset merek untuk SEO & PWA PT TOP KONSULTAN INTERNASIONAL.
Menghasilkan:
  - public/og-image.png          (1200x630 — Open Graph / Twitter Card)
  - public/icons/icon-192.png    (PWA)
  - public/icons/icon-512.png    (PWA)
  - public/icons/maskable-512.png (PWA maskable, safe-zone 80%)
  - public/apple-icon.png        (180x180 — apple-touch-icon)
  - public/favicon.ico           (16/32/48 — fallback peramban lama)
Gaya: zinc-950 gelap + aksen emas & ungu, konsisten dengan identitas situs.
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = "/home/z/my-project"
LOGO_PATH = f"{ROOT}/public/images/logo-pusat-perizinan.png"

FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"

BG = (9, 9, 11)          # zinc-950
GRID = (24, 24, 29)      # garis kisi halus
WHITE = (250, 250, 250)
GRAY = (161, 161, 170)   # zinc-400
AMBER = (245, 158, 11)   # amber-500
AMBER_L = (251, 191, 36) # amber-400
VIOLET = (139, 92, 246)  # violet-500


def load_logo(size: int) -> Image.Image:
    logo = Image.open(LOGO_PATH).convert("RGBA")
    return logo.resize((size, size), Image.LANCZOS)


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def text_size(draw: ImageDraw.ImageDraw, text: str, f: ImageFont.FreeTypeFont):
    box = draw.textbbox((0, 0), text, font=f)
    return box[2] - box[0], box[3] - box[1]


def gradient_text(canvas: Image.Image, xy: tuple, text: str,
                  f: ImageFont.FreeTypeFont, c1: tuple, c2: tuple):
    """Teks dengan gradasi horizontal c1 → c2."""
    tmp = ImageDraw.Draw(Image.new("RGB", (8, 8)))
    w, h = text_size(tmp, text, f)
    mask = Image.new("L", (w + 4, h + 12), 0)
    ImageDraw.Draw(mask).text((0, 0), text, font=f, fill=255)
    grad = Image.new("RGB", (w + 4, h + 12))
    gd = ImageDraw.Draw(grad)
    for x in range(w + 4):
        t = x / max(1, w)
        color = tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3))
        gd.line([(x, 0), (x, h + 12)], fill=color)
    canvas.paste(grad, xy, mask)
    return w, h


def draw_grid(canvas: Image.Image, step: int = 60):
    d = ImageDraw.Draw(canvas, "RGBA")
    w, h = canvas.size
    for x in range(0, w, step):
        d.line([(x, 0), (x, h)], fill=GRID, width=1)
    for y in range(0, h, step):
        d.line([(0, y), (w, y)], fill=GRID, width=1)


def glow(canvas: Image.Image, center, radius, color, alpha=40):
    """Lingkaran cahaya lembut."""
    w, h = canvas.size
    glow_layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(glow_layer)
    cx, cy = center
    d.ellipse([cx - radius, cy - radius, cx + radius, cy + radius], fill=color + (alpha,))
    glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(radius / 2))
    canvas.alpha_composite(glow_layer)


def corner_brackets(d: ImageDraw.ImageDraw, margin=28, arm=26, thick=3, color=AMBER):
    w, h = 1200, 630
    # kiri-atas
    d.line([(margin, margin), (margin + arm, margin)], fill=color, width=thick)
    d.line([(margin, margin), (margin, margin + arm)], fill=color, width=thick)
    # kanan-atas
    d.line([(w - margin - arm, margin), (w - margin, margin)], fill=color, width=thick)
    d.line([(w - margin, margin), (w - margin, margin + arm)], fill=color, width=thick)
    # kiri-bawah
    d.line([(margin, h - margin), (margin + arm, h - margin)], fill=color, width=thick)
    d.line([(margin, h - margin - arm), (margin, h - margin)], fill=color, width=thick)
    # kanan-bawah
    d.line([(w - margin - arm, h - margin), (w - margin, h - margin)], fill=color, width=thick)
    d.line([(w - margin, h - margin - arm), (w - margin, h - margin)], fill=color, width=thick)


def make_og():
    W, H = 1200, 630
    canvas = Image.new("RGBA", (W, H), BG + (255,))
    draw_grid(canvas)

    # Cahaya aksen
    glow(canvas, (250, 315), 300, VIOLET, 26)
    glow(canvas, (900, 120), 260, AMBER, 18)

    d = ImageDraw.Draw(canvas)

    # Logo emas di kiri
    logo = load_logo(360)
    canvas.alpha_composite(logo, (84, 135))

    # Garis pembatas vertikal emas halus
    d.line([(500, 150), (500, 480)], fill=(245, 158, 11, 130), width=2)

    # Blok teks kanan
    x = 548
    f_legal = font(FONT_BOLD, 44)
    f_domain = font(FONT_BOLD, 66)
    f_tag = font(FONT_REG, 30)
    f_stats = font(FONT_BOLD, 25)
    f_foot = font(FONT_REG, 21)

    d.text((x, 118), "PT TOP KONSULTAN", font=f_legal, fill=WHITE)
    d.text((x, 170), "INTERNASIONAL", font=f_legal, fill=WHITE)

    gradient_text(canvas, (x, 250), "PUSATPERIZINAN.COM", font(FONT_BOLD, 62), AMBER, AMBER_L)

    d.text((x, 342), "Konsultasi & Perizinan", font=f_tag, fill=GRAY)
    d.text((x, 384), "Terlengkap di Dunia", font=f_tag, fill=GRAY)

    d.text((x, 448), "46 DEWAN PAKAR", font=f_stats, fill=VIOLET)
    d.text((x + 230, 448), "6.900 TAHUN", font=f_stats, fill=VIOLET)
    d.text((x + 415, 448), "190 NEGARA", font=f_stats, fill=VIOLET)

    d.text((x, 490), "195 BAHASA  ·  36+ JENIS IZIN  ·  12 PRAKTIK  ·  EST. 2001", font=f_foot, fill=GRAY)

    # Footer strip
    d.line([(84, 560), (1116, 560)], fill=(63, 63, 70, 255), width=1)
    d.text((84, 578), "SATU GERBANG UNTUK SEGALA IZIN, STRATEGI, DAN EKSEKUSI", font=font(FONT_BOLD, 22), fill=AMBER)
    d.text((836, 578), "pusatperizinan.com", font=font(FONT_REG, 22), fill=GRAY)

    corner_brackets(d)

    canvas.convert("RGB").save(f"{ROOT}/public/og-image.png", "PNG", optimize=True)
    print("OK: public/og-image.png (1200x630)")


def make_icon(size: int, logo_ratio: float, path: str, maskable: bool = False):
    canvas = Image.new("RGBA", (size, size), BG + (255,))
    d = ImageDraw.Draw(canvas)
    # bingkai tipis untuk non-maskable
    if not maskable:
        d.rectangle([2, 2, size - 3, size - 3], outline=(245, 158, 11, 200), width=max(2, size // 128))
    logo = load_logo(int(size * logo_ratio))
    offset = (size - logo.width) // 2
    canvas.alpha_composite(logo, (offset, offset))
    canvas.convert("RGB").save(path, "PNG", optimize=True)
    print(f"OK: {path} ({size}x{size}, logo {int(logo_ratio * 100)}%)")


def make_favicon():
    logo = Image.open(LOGO_PATH).convert("RGBA")
    favicon = logo.resize((256, 256), Image.LANCZOS)
    favicon.save(f"{ROOT}/public/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    print("OK: public/favicon.ico (16/32/48)")


if __name__ == "__main__":
    make_og()
    make_icon(192, 0.80, f"{ROOT}/public/icons/icon-192.png")
    make_icon(512, 0.80, f"{ROOT}/public/icons/icon-512.png")
    make_icon(512, 0.56, f"{ROOT}/public/icons/maskable-512.png", maskable=True)
    make_icon(180, 0.74, f"{ROOT}/public/apple-icon.png")
    make_favicon()
    print("Selesai — seluruh aset SEO/PWA siap.")
