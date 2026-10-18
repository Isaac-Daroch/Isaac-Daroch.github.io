"""One-time acquisition of the owner's already-public profile portrait, not visitor-time tracking."""
from pathlib import Path
from urllib.request import Request, urlopen
from io import BytesIO
from PIL import Image
import hashlib, json, datetime
root = Path(__file__).resolve().parents[1]
out = root / 'site/public/images/portrait.png'
record = root / 'docs/integration/asset-provenance.json'
url = 'https://avatars.githubusercontent.com/u/170217941?s=512&v=4'
if not out.exists():
    with urlopen(Request(url, headers={'User-Agent': 'IsaacDaroch-Portfolio-Build/1.1'}), timeout=30) as response:
        raw = response.read(2 * 1024 * 1024 + 1)
    if len(raw) > 2 * 1024 * 1024:
        raise RuntimeError('Profile asset exceeds acquisition limit')
    image = Image.open(BytesIO(raw))
    image.verify()
    image = Image.open(BytesIO(raw)).convert('RGB')
    image.thumbnail((512, 512))
    out.parent.mkdir(parents=True, exist_ok=True)
    image.save(out, 'PNG', optimize=True)
    record.parent.mkdir(parents=True, exist_ok=True)
    record.write_text(json.dumps({'source': url, 'acquiredAt': datetime.datetime.now(datetime.timezone.utc).isoformat(), 'sourceSha256': hashlib.sha256(raw).hexdigest(), 'asset': 'site/public/images/portrait.png', 'sha256': hashlib.sha256(out.read_bytes()).hexdigest(), 'scope': 'Existing public profile portrait of the portfolio owner; no private uploads or ID photographs used.'}, indent=2) + '\n', encoding='utf-8')
else:
    print('Existing recorded portrait retained, not fetched again.')
