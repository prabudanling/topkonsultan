#!/usr/bin/env python3
"""Suntik kunci terjemahan `nav.jasa` ke seluruh 26 kamus penuh (FullDict).

Menambahkan baris "nav.jasa": "<label>" tepat setelah "nav.perizinan" pada
setiap kamus di translations-major1.ts (13 bahasa) dan translations-major2.ts
(13 bahasa). PartialDict otomatis aman (Partial Record).
"""

import re
from pathlib import Path

ROOT = Path("/home/z/my-project/src/data")

MAJOR1_LABELS = {
    "ID": "500 Jasa",
    "EN": "500 Services",
    "MS": "500 Perkhidmatan",
    "JA": "500サービス",
    "KO": "500 서비스",
    "ZH_CN": "500服务",
    "ZH_TW": "500服務",
    "AR": "500 خدمة",
    "ES": "500 Servicios",
    "FR": "500 Services",
    "DE": "500 Dienstleistungen",
    "PT": "500 Serviços",
    "IT": "500 Servizi",
}

MAJOR2_LABELS = {
    "RU": "500 услуг",
    "NL": "500 diensten",
    "TR": "500 Hizmet",
    "HI": "500 सेवाएँ",
    "TH": "500 บริการ",
    "VI": "500 dịch vụ",
    "SV": "500 tjänster",
    "PL": "500 usług",
    "EL": "500 υπηρεσίες",
    "UK": "500 послуг",
    "FA": "۵۰۰ خدمت",
    "HE": "500 שירותים",
    "UR": "500 خدمات",
}


def inject(path: Path, labels: dict[str, str]) -> int:
    text = path.read_text(encoding="utf-8")
    count = 0
    for name, label in labels.items():
        pattern = re.compile(
            r'(export const ' + name + r': FullDict = \{\n  "nav\.perizinan": "[^"]*",\n)'
        )
        replacement = r'\1  "nav.jasa": "' + label + r'",\n'
        new_text, n = pattern.subn(replacement, text, count=1)
        if n:
            text = new_text
            count += n
        else:
            print(f"  GAGAL: {name} tidak ditemukan di {path.name}")
    if count:
        path.write_text(text, encoding="utf-8")
    print(f"{path.name}: {count}/{len(labels)} kamus disuntik")
    return count


total = inject(ROOT / "translations-major1.ts", MAJOR1_LABELS)
total += inject(ROOT / "translations-major2.ts", MAJOR2_LABELS)
print(f"TOTAL: {total} kamus — status {'OK' if total == 26 else 'PERIKSA ULANG'}")
