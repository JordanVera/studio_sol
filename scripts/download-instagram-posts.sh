#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT_DIR="$ROOT/public/images/gallery"
MANIFEST="$ROOT/scripts/instagram-manifest.json"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"

POSTS=(
  DdVCa_EGsqb
  DdP2FViGm4G
  DdM1DSWmngR
  DdIPmxnHKga
  DcxJ2G5HOPD
  DcudfgBHJRR
  Dcj7zIjGsJd
  DcPQZotGsfm
  DcNFA_NnMel
  Dbt69XjGmRH
  Dbo-6LXHMxT
)

mkdir -p "$OUT_DIR"
python3 - "$OUT_DIR" "$MANIFEST" "${POSTS[@]}" <<'PY'
import html
import json
import re
import sys
import urllib.request
from pathlib import Path

out_dir = Path(sys.argv[1])
manifest_path = Path(sys.argv[2])
shortcodes = sys.argv[3:]
ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"

def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": ua})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read().decode("utf-8", errors="replace")

def decode_json_string(value: str) -> str:
    return bytes(value, "utf-8").decode("unicode_escape")

gallery = []
for shortcode in shortcodes:
    url = f"https://www.instagram.com/studiosol_ss/p/{shortcode}/"
    print(f"Fetching {url}")
    page = fetch(url)

    caption = ""
    cap_match = re.search(r'property="og:description" content="([^"]+)"', page)
    if cap_match:
        caption = html.unescape(cap_match.group(1))

    image_urls = []
    for match in re.finditer(r'"display_url":"([^"]+)"', page):
        image_urls.append(decode_json_string(match.group(1)))
    if not image_urls:
        og_match = re.search(r'property="og:image" content="([^"]+)"', page)
        if og_match:
            image_urls.append(html.unescape(og_match.group(1)))

    image_urls = list(dict.fromkeys(image_urls))
    for index, image_url in enumerate(image_urls, start=1):
        filename = f"{shortcode}.jpg" if len(image_urls) == 1 else f"{shortcode}-{index}.jpg"
        dest = out_dir / filename
        full_url = image_url.replace("s640x640", "s1080x1080").replace("&amp;", "&")
        try:
            req = urllib.request.Request(full_url, headers={"User-Agent": ua})
            with urllib.request.urlopen(req, timeout=60) as resp:
                dest.write_bytes(resp.read())
        except Exception:
            req = urllib.request.Request(image_url.replace("&amp;", "&"), headers={"User-Agent": ua})
            with urllib.request.urlopen(req, timeout=60) as resp:
                dest.write_bytes(resp.read())
        print(f"  saved {filename}")

        lower = caption.lower()
        category = "Celebrations"
        if any(k in lower for k in ("wedding", "bridal", "ceremony")):
            category = "Weddings"
        elif any(k in lower for k in ("sympathy", "memorial")):
            category = "Sympathy"
        elif any(k in lower for k in ("corporate", "office", "brand")):
            category = "Corporate"

        name = caption.split("\n")[0][:80].strip() or f"Studio Sol arrangement {len(gallery) + 1}"
        gallery.append({
            "id": shortcode if len(image_urls) == 1 else f"{shortcode}-{index}",
            "name": name,
            "category": category,
            "image": f"/images/gallery/{filename}",
            "tag": "From Instagram",
            "description": (caption[:240] or "A floral moment from Studio Sol."),
            "instagramUrl": url,
        })

manifest_path.write_text(json.dumps({"gallery": gallery}, indent=2))
print(f"\nDownloaded {len(gallery)} images")
PY
