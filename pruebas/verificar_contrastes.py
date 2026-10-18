"""384 authorized opaque-token pairs. This does NOT audit a rendered website."""
import argparse,itertools,json,re,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
ROLES={'bg','surface','text','muted','primary','accent','border','control','hover','on-primary','focus'}
def luminance(value):
    rgb=[int(value[i:i+2],16)/255 for i in (1,3,5)]
    rgb=[v/12.92 if v<=0.04045 else ((v+0.055)/1.055)**2.4 for v in rgb]
    return sum(v*w for v,w in zip(rgb,(0.2126,0.7152,0.0722)))
def ratio(a,b):
    hi,lo=sorted((luminance(a),luminance(b)),reverse=True)
    return (hi+0.05)/(lo+0.05)
def verify(palettes):
    keys={'|'.join(x) for x in itertools.product(('editorial','high','soft'),('editorial','redgreen','tritan','mono'),('light','dark'))}
    if set(palettes)!=keys: raise ValueError('Expected exactly the 24 specified palettes')
    rows=[]
    for name,p in palettes.items():
        if set(p)!=ROLES or not all(isinstance(v,str) and re.fullmatch(r'#[0-9A-F]{6}',v) for v in p.values()): raise ValueError('Invalid roles or colors: '+name)
        text=[(a,b) for a in ('text','muted','primary','accent','hover') for b in ('bg','surface')]+[('on-primary','primary'),('on-primary','hover')]
        other=[(a,b) for a in ('control','focus') for b in ('bg','surface')]
        for kind,pairs,minimum in [('text',text,7 if name.startswith('high|') else 4.5),('nontext',other,3)]:
            for a,b in pairs:
                value=ratio(p[a],p[b]);rows.append({'palette':name,'pair':f'{a}/{b}','kind':kind,'ratio':value,'threshold':minimum,'status':'PASS' if value>=minimum else 'FAIL'})
    return {'scope':'Opaque authorized tokens only; not rendered components or individual color discrimination','palettes':len(palettes),'pairs':len(rows),'failures':sum(r['status']=='FAIL' for r in rows),'results':rows}
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--input',type=Path,default=ROOT/'tokens/paletas-grafito.json');parser.add_argument('--out',type=Path,default=ROOT/'evidence/a11y/contrast.json');args=parser.parse_args()
    try: result=verify(json.loads(args.input.read_text(encoding='utf8')))
    except (ValueError,OSError) as error: print(error,file=sys.stderr);sys.exit(2)
    args.out.parent.mkdir(parents=True,exist_ok=True);args.out.write_text(json.dumps(result,indent=2)+'\n',encoding='utf8')
    print(f"{result['palettes']} palettes; {result['pairs']} pairs; {result['failures']} failures. Tokens are not WCAG certification.")
    sys.exit(1 if result['failures'] else 0)
