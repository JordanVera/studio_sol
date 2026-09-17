#!/usr/bin/env python3
"""Download original-aspect Instagram photos from @studiosol_ss for the gallery."""

from __future__ import annotations

import json
import re
import sys
from datetime import datetime
from pathlib import Path

USERNAME = "studiosol_ss"
ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "images" / "gallery"
MANIFEST = ROOT / "scripts" / "instagram-manifest.json"
CONTENT_TS = ROOT / "src" / "lib" / "content.ts"
UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)
BROWSERS = ("chrome", "chromium", "safari", "firefox", "edge")
LIKES_CAPTION = re.compile(
    r"^\d[\d,]*\s+likes?,\s+\d[\d,]*\s+comments?\b",
    re.I,
)
EMOJI = re.compile(
    "["
    "\U0001f300-\U0001faff"
    "\U00002700-\U000027bf"
    "\U0001f900-\U0001f9ff"
    "\U00002600-\U000026ff"
    "\U0000fe00-\U0000fe0f"
    "\U0000200d"
    "]+",
    flags=re.UNICODE,
)


def category_for(caption: str) -> str:
    lower = caption.lower()
    if any(k in lower for k in ("wedding", "bridal", "ceremony", "reception")):
        return "Weddings"
    if any(k in lower for k in ("sympathy", "memorial")):
        return "Sympathy"
    if any(k in lower for k in ("corporate", "office", "brand", "install")):
        return "Corporate"
    return "Celebrations"


def clean_caption(caption: str) -> str:
    text = (caption or "").strip()
    if not text or LIKES_CAPTION.match(text):
        return ""
    first = text.split("\n")[0].strip()
    first = EMOJI.sub("", first).strip(" -–—·.|")
    return first


def gallery_name(caption: str, index: int) -> str:
    name = clean_caption(caption)
    if name:
        return name[:80]
    return f"Studio Sol arrangement {index}"


def gallery_description(caption: str) -> str:
    name = clean_caption(caption)
    if name:
        return name[:240]
    return "A floral moment from Studio Sol."


EDITORIAL = {
    "DdVCa_EGsqb": {
        "name": "Last week’s deliveries",
        "tag": "From the studio",
        "description": "Some of the arrangements that went out last week — soft seasonal blooms gathered with care.",
        "category": "Celebrations",
    },
    "DdP2FViGm4G": {
        "name": "Monochromatic blush",
        "tag": "A little celebration",
        "description": "Monochromatic tones in blush and coral — romantic, modern, and full of heart.",
        "category": "Celebrations",
    },
    "DdM1DSWmngR": {
        "name": "Favorite flowers",
        "tag": "Seasonal favorite",
        "description": "A mix of our favorite flowers — loose, joyful, and always changing with the season.",
        "category": "Celebrations",
    },
    "DdIPmxnHKga": {
        "name": "Textures & garden roses",
        "tag": "Bestseller",
        "description": "Rich textures with garden roses for a soft, feminine touch — one of our most-loved styles.",
        "category": "Celebrations",
    },
    "DcxJ2G5HOPD": {
        "name": "August arrangements",
        "tag": "From the studio",
        "description": "A signature Studio Sol arrangement — sculptural, seasonal, and made with love.",
        "category": "Celebrations",
    },
    "DcudfgBHJRR": {
        "name": "Delivery day",
        "tag": "Local delivery",
        "description": "Fresh deliveries heading out across Austin — flowers for everyday moments.",
        "category": "Celebrations",
    },
    "Dcj7zIjGsJd": {
        "name": "Monochromatic green",
        "tag": "Seasonal favorite",
        "description": "A monochromatic arrangement in fresh greens — clean, graphic, and unexpected.",
        "category": "Corporate",
    },
    "DcPQZotGsfm": {
        "name": "Soft seasonal mix",
        "tag": "From the studio",
        "description": "A soft seasonal mix — thoughtful stems arranged for someone special.",
        "category": "Celebrations",
    },
    "DcNFA_NnMel": {
        "name": "Sculptural & masculine",
        "tag": "Statement piece",
        "description": "Sculptural and masculine — bold shapes and rich texture for a striking centerpiece.",
        "category": "Corporate",
    },
    "Dbt69XjGmRH": {
        "name": "Same, but different",
        "tag": "Designer’s choice",
        "description": "Two takes on the same palette — proof that every arrangement has its own personality.",
        "category": "Celebrations",
    },
    "Dbo-6LXHMxT": {
        "name": "Today’s delivery",
        "tag": "From the studio",
        "description": "Today’s delivery and a few other things we love — fresh from the studio bench.",
        "category": "Celebrations",
    },
}


def ts_string(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def write_content_ts(gallery_items: list[dict]) -> None:
    story_flower = next(
        (item["image"] for item in gallery_items if item["id"].startswith("DdIPmxnHKga")),
        gallery_items[0]["image"],
    )
    story_season = next(
        (item["image"] for item in gallery_items if item["id"].startswith("DdM1DSWmngR")),
        gallery_items[min(2, len(gallery_items) - 1)]["image"],
    )
    lines = ["export const arrangements = ["]
    for item in gallery_items:
        lines.append("  {")
        lines.append(f"    id: {ts_string(item['id'])},")
        lines.append(f"    name: {ts_string(item['name'])},")
        lines.append(f"    category: {ts_string(item['category'])},")
        lines.append(f"    image: {ts_string(item['image'])},")
        lines.append(f"    tag: {ts_string(item['tag'])},")
        lines.append(f"    description: {ts_string(item['description'])},")
        lines.append("  },")
    lines.append("];")
    lines.append("")
    lines.append("export const stories = [")
    lines.append("  {")
    lines.append("    slug: 'make-your-flowers-last',")
    lines.append("    title: 'A little care, a little longer.',")
    lines.append("    category: 'FLOWER CARE',")
    lines.append(f"    image: {ts_string(story_flower)},")
    lines.append("    intro: 'Simple rituals to keep your flowers happy, day after day.',")
    lines.append("    body: [")
    lines.append("      'Start with a clean vase and fresh, room-temperature water. Remove any leaves that will sit below the waterline.',")
    lines.append("      'Trim the stems at an angle with clean, sharp scissors, then place them in water straight away. Use the flower food supplied with your arrangement according to its instructions.',")
    lines.append("      'Keep your flowers away from direct sunlight, heating vents, and ripening fruit. Refresh the water every two days and give the stems another small trim.',")
    lines.append("      'Remove faded flowers as you go. Every stem has its own rhythm, and a little attention makes the whole arrangement last longer.',")
    lines.append("    ],")
    lines.append("  },")
    lines.append("  {")
    lines.append("    slug: 'the-beauty-of-seasonal-flowers',")
    lines.append("    title: 'Let the season choose.',")
    lines.append("    category: 'FROM THE STUDIO',")
    lines.append(f"    image: {ts_string(story_season)},")
    lines.append("    intro: 'Why our favorite arrangements begin with what’s growing now.',")
    lines.append("    body: [")
    lines.append("      'Seasonal flowers bring a sense of place and time to an arrangement. They remind us to notice what is happening just outside our door.',")
    lines.append("      'In spring, we love the movement of tulips and ranunculus. Summer brings abundant garden roses and dahlias, while autumn invites richer colors and textural foliage.',")
    lines.append("      'A designer’s choice bouquet is an invitation to work with the most beautiful stems available that week. Your flowers may look a little different each time—that is part of their charm.',")
    lines.append("    ],")
    lines.append("  },")
    lines.append("];")
    lines.append("")
    CONTENT_TS.write_text("\n".join(lines))


def gallery_item_for(shortcode: str, img_index: int, total: int, caption: str, item_index: int) -> dict:
    editorial = EDITORIAL.get(shortcode, {})
    base_name = editorial.get("name") or gallery_name(caption, item_index)
    name = base_name if total == 1 or img_index == 1 else f"{base_name} · {img_index}"
    return {
        "id": shortcode if total == 1 else f"{shortcode}-{img_index}",
        "name": name,
        "category": editorial.get("category") or category_for(caption),
        "image": f"/images/gallery/{shortcode}.jpg" if total == 1 else f"/images/gallery/{shortcode}-{img_index}.jpg",
        "tag": editorial.get("tag") or "From Instagram",
        "description": editorial.get("description") or gallery_description(caption),
        "instagramUrl": f"https://www.instagram.com/{USERNAME}/p/{shortcode}/",
    }


def preferred_url(url: str) -> str:
    return url.replace("stp=dst-jpegr_e35_tt6", "stp=dst-jpg_e35_tt6")


def download_http(url: str, dest: Path) -> None:
    import urllib.request

    dest.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(
        preferred_url(url),
        headers={
            "User-Agent": UA,
            "Referer": "https://www.instagram.com/",
            "Accept": "image/jpeg,image/avif,image/webp,*/*",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            dest.write_bytes(resp.read())
    except Exception:
        req = urllib.request.Request(
            url,
            headers={"User-Agent": UA, "Referer": "https://www.instagram.com/"},
        )
        with urllib.request.urlopen(req, timeout=60) as resp:
            dest.write_bytes(resp.read())


def publish_gallery(posts_meta: list[dict], gallery_items: list[dict], staging: Path) -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for existing in OUT_DIR.glob("*"):
        if existing.is_file():
            existing.unlink()
    for image_file in staging.glob("*"):
        image_file.replace(OUT_DIR / image_file.name)
    if staging.exists():
        staging.rmdir()
    MANIFEST.write_text(json.dumps({"posts": posts_meta, "gallery": gallery_items}, indent=2))
    write_content_ts(gallery_items)


def download_from_json(path: Path) -> int:
    data = json.loads(path.read_text())
    staging = ROOT / "scripts" / ".gallery-staging"
    if staging.exists():
        for existing in staging.glob("*"):
            if existing.is_file():
                existing.unlink()
    staging.mkdir(parents=True, exist_ok=True)

    posts_meta: list[dict] = []
    gallery_items: list[dict] = []
    for post in data["posts"]:
        urls = [u for u in post["urls"] if u]
        if not urls:
            continue
        caption = post.get("caption") or ""
        shortcode = post["shortcode"]
        post_url = f"https://www.instagram.com/{USERNAME}/p/{shortcode}/"
        saved: list[str] = []
        print(f"{shortcode} ({len(urls)} images)")
        for img_index, image_url in enumerate(urls, start=1):
            filename = f"{shortcode}.jpg" if len(urls) == 1 else f"{shortcode}-{img_index}.jpg"
            dest = staging / filename
            try:
                download_http(image_url, dest)
                print(f"  saved {filename} ({dest.stat().st_size} bytes)")
            except Exception as exc:  # noqa: BLE001
                print(f"  failed {filename}: {exc}")
                continue
            saved.append(image_url)
            gallery_items.append(
                gallery_item_for(shortcode, img_index, len(urls), caption, len(gallery_items) + 1)
            )
        if saved:
            posts_meta.append(
                {"shortcode": shortcode, "url": post_url, "caption": caption, "images": saved}
            )

    if not gallery_items:
        print("No images downloaded.", file=sys.stderr)
        return 1
    publish_gallery(posts_meta, gallery_items, staging)
    print(f"\nSaved {len(gallery_items)} images from {len(posts_meta)} posts to {OUT_DIR}")
    print(f"Manifest: {MANIFEST}")
    print(f"Content: {CONTENT_TS}")
    return 0


def try_browser_cookies(loader) -> bool:
    try:
        from instaloader.__main__ import import_session
    except Exception:
        return False
    for browser in BROWSERS:
        try:
            import_session(browser, loader, None)
            print(f"Using Instagram session from {browser}")
            return True
        except Exception as exc:  # noqa: BLE001
            print(f"  no {browser} session: {exc}")
    return False


def make_loader():
    import instaloader

    return instaloader.Instaloader(
        download_pictures=True,
        download_videos=False,
        download_video_thumbnails=False,
        download_geotags=False,
        download_comments=False,
        save_metadata=False,
        compress_json=False,
        post_metadata_txt_pattern="",
        max_connection_attempts=3,
        request_timeout=30,
        quiet=False,
    )


def post_image_urls(post) -> list[str]:
    urls: list[str] = []
    if post.typename == "GraphSidecar":
        for node in post.get_sidecar_nodes():
            if node.is_video:
                continue
            urls.append(node.display_url)
        return urls
    if post.is_video:
        return []
    return [post.url]


def download_url(loader, url: str, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    tmp = dest.with_suffix("")
    loader.download_pic(filename=str(tmp), url=url, mtime=datetime.now())
    produced = tmp.with_suffix(".jpg")
    if produced != dest and produced.exists():
        produced.replace(dest)


def main() -> int:
    import argparse

    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--from-json",
        type=Path,
        default=None,
        help="Download already-collected image URLs from a JSON file.",
    )
    parser.add_argument(
        "--login-cookies",
        action="store_true",
        help="If anonymous access fails, try cookies from a local browser session.",
    )
    args = parser.parse_args()
    if args.from_json:
        return download_from_json(args.from_json)

    try:
        import instaloader
        from instaloader.exceptions import LoginRequiredException, ConnectionException
    except ImportError:
        print("instaloader is not installed. Run: pip3 install instaloader", file=sys.stderr)
        return 1

    loader = make_loader()
    anonymous = True
    try:
        profile = instaloader.Profile.from_username(loader.context, USERNAME)
        print(f"Loaded profile @{USERNAME} anonymously")
    except (LoginRequiredException, ConnectionException, Exception) as exc:
        print(f"Anonymous access failed ({exc.__class__.__name__}: {exc})")
        if not args.login_cookies:
            print(
                "Re-run with --login-cookies only if you are logged into Instagram in a local browser.",
                file=sys.stderr,
            )
            return 1
        print("Trying a logged-in browser session if one is available...")
        loader = make_loader()
        if not try_browser_cookies(loader):
            print(
                "Could not open Instagram anonymously or via a browser session.",
                file=sys.stderr,
            )
            return 1
        try:
            profile = instaloader.Profile.from_username(loader.context, USERNAME)
        except Exception as inner:  # noqa: BLE001
            print(f"Session failed: {inner}", file=sys.stderr)
            return 1
        anonymous = False

    print(f"Fetching posts from @{USERNAME} ({'anonymous' if anonymous else 'logged-in'})...")
    staging = ROOT / "scripts" / ".gallery-staging"
    if staging.exists():
        for existing in staging.glob("*"):
            if existing.is_file():
                existing.unlink()
    staging.mkdir(parents=True, exist_ok=True)

    posts_meta: list[dict] = []
    gallery_items: list[dict] = []
    seen = 0
    skipped_video = 0

    for post in profile.get_posts():
        seen += 1
        urls = post_image_urls(post)
        if not urls:
            skipped_video += 1
            print(f"[{seen}] {post.shortcode} skip: video/reel")
            continue

        caption = post.caption or ""
        post_url = f"https://www.instagram.com/{USERNAME}/p/{post.shortcode}/"
        print(f"[{seen}] {post.shortcode} ({len(urls)} image{'s' if len(urls) != 1 else ''})")
        saved_urls: list[str] = []

        for img_index, image_url in enumerate(urls, start=1):
            filename = (
                f"{post.shortcode}.jpg"
                if len(urls) == 1
                else f"{post.shortcode}-{img_index}.jpg"
            )
            dest = staging / filename
            try:
                download_url(loader, image_url, dest)
                print(f"  saved {filename}")
            except Exception as exc:  # noqa: BLE001
                print(f"  failed {filename}: {exc}")
                continue

            saved_urls.append(image_url)
            gallery_items.append(
                gallery_item_for(
                    post.shortcode,
                    img_index,
                    len(urls),
                    caption,
                    len(gallery_items) + 1,
                )
            )

        if saved_urls:
            posts_meta.append(
                {
                    "shortcode": post.shortcode,
                    "url": post_url,
                    "caption": caption,
                    "images": saved_urls,
                }
            )

    if not gallery_items:
        print("No images downloaded.", file=sys.stderr)
        return 1

    publish_gallery(posts_meta, gallery_items, staging)
    print(f"\nSaved {len(gallery_items)} images from {len(posts_meta)} posts to {OUT_DIR}")
    print(f"Skipped {skipped_video} videos/reels")
    print(f"Manifest: {MANIFEST}")
    print(f"Content: {CONTENT_TS}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
