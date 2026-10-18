"""Build a source-only installable archive from exactly the tracked Git files."""
from pathlib import Path
import subprocess, zipfile, json, hashlib, sys
root=Path(__file__).resolve().parents[1]
output=root/'evidence'/'IsaacDaroch-Web-1.1.0.zip'
output.parent.mkdir(exist_ok=True)
paths=subprocess.check_output(['git','ls-files','-z'],cwd=root).decode().split('\0')
files=[]
for rel in sorted(p for p in paths if p):
    path=root/rel
    if path.is_symlink() or not path.is_file(): raise RuntimeError('Unsupported tracked entry: '+rel)
    if rel.split('/')[0]=='.git' or 'node_modules' in rel.split('/') or rel.startswith('evidence/'): raise RuntimeError('Prohibited tracked entry: '+rel)
    data=path.read_bytes();files.append({'path':rel,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest()})
manifest={'schema':1,'version':'1.1.0','sourceCommit':subprocess.check_output(['git','rev-parse','HEAD'],cwd=root).decode().strip(),'files':files}
with zipfile.ZipFile(output,'w',zipfile.ZIP_DEFLATED) as z:
    for f in files:z.write(root/f['path'],'IsaacDaroch-Web/'+f['path'])
    z.writestr('IsaacDaroch-Web/package-manifest.json',json.dumps(manifest,indent=2)+'\n')
(root/'evidence'/'source-package.json').write_text(json.dumps({'path':output.name,'sha256':hashlib.sha256(output.read_bytes()).hexdigest(),'files':len(files)+1,'sourceCommit':manifest['sourceCommit']},indent=2)+'\n')
print('Source package:',output.name,'files:',len(files)+1)
