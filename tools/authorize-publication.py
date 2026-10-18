"""Explicit owner-only publication, consuming an already successful complete product run."""
import json, os, re, subprocess
from pathlib import Path

def api(path):
    result=subprocess.run(['gh','api',path],text=True,capture_output=True,check=False)
    if result.returncode:
        raise RuntimeError('GitHub API request failed for '+path+': '+result.stderr.strip())
    return json.loads(result.stdout)

event=json.loads(Path(os.environ['GITHUB_EVENT_PATH']).read_text(encoding='utf-8'))
repo=os.environ['GITHUB_REPOSITORY']
owner=repo.split('/')[0]
if os.environ['GITHUB_EVENT_NAME']=='issue_comment':
    comment=event['comment']
    if comment['user']['login']!=owner or comment.get('author_association')!='OWNER':
        raise RuntimeError('Only the repository owner can request this publication.')
    match=re.fullmatch(r'/publish ([0-9a-f]{40})\s*',comment['body'])
    if not match: raise RuntimeError('Use exactly /publish followed by the full current main commit SHA.')
    sha=match.group(1)
else:
    sha=event.get('inputs',{}).get('commit','')
    if not re.fullmatch(r'[0-9a-f]{40}',sha): raise RuntimeError('A complete commit SHA is required.')
    if os.environ.get('GITHUB_ACTOR')!=owner: raise RuntimeError('Only the owner can authorize publication.')
main=api(f'repos/{repo}/git/ref/heads/main')['object']['sha']
if sha!=main: raise RuntimeError('Requested source is not the current main commit. No stale or arbitrary branch is published.')
runs=api(f'repos/{repo}/actions/workflows/integrated-site.yml/runs?head_sha={sha}&event=push&status=completed&per_page=20')['workflow_runs']
valid=[r for r in runs if r['head_sha']==sha and r['head_branch']=='main' and r['conclusion']=='success']
if not valid: raise RuntimeError('The requested main commit has no successful complete product verification run yet.')
run=max(valid,key=lambda r:r['id'])
with open(os.environ['GITHUB_OUTPUT'],'a',encoding='utf-8') as output:
    output.write(f'commit={sha}\nrun_id={run["id"]}\n')
print(json.dumps({'authorizedCommit':sha,'verifiedRun':run['id'],'method':os.environ['GITHUB_EVENT_NAME']},indent=2))
