#!/usr/bin/env python3
"""Validate D2 documentation and generate its readable/traceable delivery.

Uses only Python's standard library. Does NOT install, patch, build or deploy
IsaacDaroch-Web. A passing result certifies documentary consistency only.
"""
from __future__ import annotations
import argparse
import collections
import csv
import hashlib
import html
import json
import os
from pathlib import Path
import platform
import re
import shutil
import sys
from datetime import datetime, timezone

ROOT = Path(__file__).resolve().parents[2]
DOCS = ROOT / 'docs' / 'd2'


def load_records(docs: Path = DOCS) -> tuple[dict, dict, dict]:
    def read(name: str) -> dict:
        with (docs / 'registers' / name).open(encoding='utf-8') as stream:
            return json.load(stream)
    return read('architecture.json'), read('requirements.json'), read('deviations.json')


def validate(architecture: dict, catalog: dict, deviations: dict, docs: Path | None = None) -> list[str]:
    """Return errors; no mutation. Validity of product behaviour is out of scope."""
    errors: list[str] = []
    required = {f'RF-{i:02d}' for i in range(1, 27)} | {f'RQ-{i:02d}' for i in range(1, 19)}
    legacy = {f'RF-{i:02d}' for i in range(1, 21)} | {f'RQ-{i:02d}' for i in range(1, 17)}
    if catalog.get('documentVersion') != 'D2' or architecture.get('documentVersion') != 'D2':
        errors.append('Unsupported document version')
    records = catalog.get('requirements', [])
    if not isinstance(records, list):
        return errors + ['requirements must be an array']
    ids = [r.get('id') for r in records if isinstance(r, dict)]
    if len(ids) != len(records):
        errors.append('Invalid requirement record')
    if len(ids) != len(set(ids)):
        errors.append('Duplicate requirement ID')
    if set(ids) != required:
        errors.append('Requirement set differs from preserved D1 plus D2 scope')
    if len(records) != architecture['governance']['expectedRequirements']:
        errors.append('Requirement count mismatch')
    test_ids: list[str] = []
    defaults = catalog.get('defaults', {})
    mappings = {'principles': 'principles', 'modules': 'modules', 'decisions': 'decisions', 'scenarios': 'qualityScenarios'}
    for r in records:
        if not isinstance(r, dict):
            continue
        rid = r.get('id', '?')
        for field in ('title', 'kind', 'origin', 'source', 'locator', 'actor', 'priority', 'implementation'):
            if not isinstance(r.get(field), str) or not r[field].strip():
                errors.append(f'{rid}: missing {field}')
        if r.get('kind') not in ('functional', 'quality'):
            errors.append(f'{rid}: invalid kind')
        if str(rid).startswith('RQ-') and not r.get('qualityAttribute'):
            errors.append(f'{rid}: missing quality attribute')
        if rid in legacy and not r.get('d1Acceptance'):
            errors.append(f'{rid}: D1 acceptance was lost')
        if r.get('source') not in architecture['sourceKeys']:
            errors.append(f'{rid}: unknown source')
        if r.get('priority') not in ('P0', 'P1', 'P2', 'P3'):
            errors.append(f'{rid}: invalid priority')
        if not isinstance(r.get('releaseGate'), bool):
            errors.append(f'{rid}: releaseGate must be boolean')
        if not isinstance(r.get('acceptance'), list) or not r['acceptance'] or any(not isinstance(v, str) or not v.strip() for v in r['acceptance']):
            errors.append(f'{rid}: empty acceptance')
        for field, registry in mappings.items():
            refs = r.get(field, [])
            if not isinstance(refs, list) or not refs or any(x not in architecture[registry] for x in refs):
                errors.append(f'{rid}: broken {field} reference')
            elif len(refs) != len(set(refs)):
                errors.append(f'{rid}: repeated {field} reference')
        if r.get('implementation') not in architecture['governance']['implementationStates']:
            errors.append(f'{rid}: invalid implementation state')
        verification = r.get('verification', defaults.get('verification'))
        acceptance_status = r.get('acceptanceStatus', defaults.get('acceptanceStatus'))
        if verification not in architecture['governance']['verificationStates']:
            errors.append(f'{rid}: invalid verification state')
        if acceptance_status not in architecture['governance']['acceptanceStates']:
            errors.append(f'{rid}: invalid acceptance state')
        test = r.get('test', {})
        for field in ('id', 'environment', 'procedure', 'oracle', 'expectedEvidence'):
            if not isinstance(test.get(field), str) or not test[field].strip():
                errors.append(f'{rid}: missing test {field}')
        if isinstance(test.get('id'), str):
            test_ids.append(test['id'])
        if rid in legacy:
            expected_num = int(rid.split('-')[1]) + (20 if rid.startswith('RQ-') else 0)
            if test.get('id') != f'T-{expected_num:02d}':
                errors.append(f'{rid}: D1 test relationship was changed')
        evidence = r.get('evidence', defaults.get('evidence', []))
        if verification in ('component-verified', 'verified'):
            if not isinstance(evidence, list) or not evidence:
                errors.append(f'{rid}: verified without evidence')
            else:
                for e in evidence:
                    if not isinstance(e, dict) or any(not e.get(k) for k in architecture['governance']['evidenceRequiredForVerified']):
                        errors.append(f'{rid}: incomplete evidence receipt')
                    elif e['testId'] != test.get('id') or e['result'] != 'passed':
                        errors.append(f'{rid}: evidence does not close its test')
        if acceptance_status == 'accepted' and (verification != 'verified' or not r.get('acceptedBy') or not r.get('acceptedAt')):
            errors.append(f'{rid}: accepted without full verification and approval')
    expected_tests = {f'T-{i:02d}' for i in range(1, 45)}
    if len(test_ids) != len(set(test_ids)) or set(test_ids) != expected_tests:
        errors.append('Test IDs are missing, duplicated or outside D2 scope')
    deviation_ids: set[str] = set()
    for d in deviations.get('items', []):
        did = d.get('id')
        if not did or did in deviation_ids:
            errors.append('Duplicate/missing deviation ID')
        deviation_ids.add(did)
        if d.get('status') not in ('open', 'resolved', 'accepted-risk') or not d.get('treatment'):
            errors.append(f'{did}: missing disposition')
        for field, valid in [('requirements', required), ('decisions', set(architecture['decisions']))]:
            if not d.get(field) or any(x not in valid for x in d[field]):
                errors.append(f'{did}: broken {field} reference')
        if d.get('source') not in architecture['sourceKeys']:
            errors.append(f'{did}: unknown source')
    if docs is not None:
        for name in architecture['requiredDocs']:
            p = docs / name
            if not p.is_file() or not p.read_text(encoding='utf-8').strip():
                errors.append(f'Missing source document: {name}')
    return errors


def inline(text: str) -> str:
    escaped = html.escape(text)
    escaped = re.sub(r'`([^`]+)`', r'<code>\1</code>', escaped)
    escaped = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', escaped)
    def link(match: re.Match) -> str:
        label, target = match.group(1), html.unescape(match.group(2))
        if target.endswith('.md'):
            target = '#doc-' + Path(target).stem
        elif not target.startswith(('https://', 'http://', '#')):
            return label + ' <code>' + html.escape(target) + '</code>'
        return '<a href="' + html.escape(target, quote=True) + '">' + label + '</a>'
    return re.sub(r'\[([^\]]+)\]\(([^)]+)\)', link, escaped)


def markdown_to_html(text: str) -> str:
    """Small escaped renderer for this dossier, not a general Markdown engine.

    Mermaid is preserved as readable source; GitHub renders the diagrams.
    """
    output: list[str] = []
    paragraph: list[str] = []
    code: list[str] | None = None
    table: list[list[str]] = []
    def flush_paragraph() -> None:
        if paragraph:
            output.append('<p>' + inline(' '.join(paragraph)) + '</p>')
            paragraph.clear()
    def flush_table() -> None:
        if table:
            head = ''.join('<th scope="col">' + inline(c) + '</th>' for c in table[0])
            rows = ['<tr>' + ''.join('<td>' + inline(c) + '</td>' for c in row) + '</tr>' for row in table[1:]]
            output.append('<div class="table-wrap"><table><thead><tr>' + head + '</tr></thead><tbody>' + ''.join(rows) + '</tbody></table></div>')
            table.clear()
    for line in text.splitlines():
        if line.startswith('```'):
            flush_paragraph(); flush_table()
            if code is None:
                code = []
            else:
                output.append('<pre><code>' + html.escape('\n'.join(code)) + '</code></pre>'); code = None
            continue
        if code is not None:
            code.append(line); continue
        if line.startswith('|'):
            flush_paragraph()
            if not re.fullmatch(r'[\s|:\-]+', line):
                table.append([c.strip() for c in line.strip().strip('|').split('|')])
            continue
        flush_table()
        if not line.strip():
            flush_paragraph(); continue
        heading = re.match(r'^(#{1,6})\s+(.*)', line)
        if heading:
            flush_paragraph(); level = min(len(heading.group(1)) + 1, 6)
            output.append(f'<h{level}>' + inline(heading.group(2)) + f'</h{level}>')
        elif re.match(r'^\d+\.\s|^-\s', line):
            flush_paragraph(); output.append('<p class="list-line">' + inline(line) + '</p>')
        else:
            paragraph.append(line)
    flush_paragraph(); flush_table()
    if code is not None:
        output.append('<pre><code>' + html.escape('\n'.join(code)) + '</code></pre>')
    return '\n'.join(output)


def requirement_markdown(catalog: dict) -> str:
    lines = ['# Catálogo completo de requisitos y pruebas — D2', '', '44 requisitos y 44 casos planificados. Las referencias de implementación no son aprobación del producto.', '']
    for r in catalog['requirements']:
        lines += [f"## {r['id']} — {r['title']}", '', f"Tipo: {r['kind']}. Origen: {r['origin']}. Actor: {r['actor']}. Prioridad: {r['priority']}. Puerta mínima: {r['releaseGate']}.", '', f"Fuente: {r['source']} / {r['locator']}.", '']
        if r['d1Acceptance']:
            lines += ['**Referencia de aceptación D1:** ' + r['d1Acceptance'], '']
        lines += ['**Aceptación objetivo:**', ''] + [f'{i+1}. {v}' for i, v in enumerate(r['acceptance'])] + ['']
        lines += ['**Trazabilidad:** ' + ' → '.join(', '.join(r[k]) for k in ('principles','modules','decisions','scenarios')), '', '**Estado:** implementación ' + r['implementation'] + '; verificación ' + r.get('verification', catalog['defaults']['verification']) + '; aceptación ' + r.get('acceptanceStatus', catalog['defaults']['acceptanceStatus']) + '.', '']
        t = r['test']
        lines += [f"### {t['id']} — caso de aceptación planificado", '', '**Entorno:** ' + t['environment'], '', '**Procedimiento:** ' + t['procedure'], '', '**Oráculo:** ' + t['oracle'], '', '**Evidencia esperada:** ' + t['expectedEvidence'], '']
    return '\n'.join(lines)


def generate(out: Path, architecture: dict, catalog: dict, deviations: dict, test_log: Path | None = None) -> dict:
    out = out.resolve()
    if out == ROOT or out == DOCS or DOCS in out.parents:
        raise ValueError('Output must not replace repository/source documentation')
    if out.exists() and any(out.iterdir()):
        raise ValueError('Output directory must be empty; choose a new path')
    out.mkdir(parents=True, exist_ok=True)
    shutil.copytree(DOCS, out / 'docs' / 'd2')
    for source in [ROOT / 'tools/governance/validate_d2.py', ROOT / 'tests/governance/test_d2.py', ROOT / '.github/workflows/documentation-d2.yml']:
        if source.is_file():
            dest = out / source.relative_to(ROOT); dest.parent.mkdir(parents=True, exist_ok=True); shutil.copyfile(source, dest)
    catalog_text = requirement_markdown(catalog)
    (out / 'CATALOGO_RF_RQ_T.md').write_text(catalog_text, encoding='utf-8')
    with (out / 'TRAZABILIDAD.csv').open('w', encoding='utf-8-sig', newline='') as stream:
        writer = csv.writer(stream, delimiter=';')
        writer.writerow(['Requisito','Titulo','Tipo','Origen','Principios','Macroelementos','ADR','Escenarios','Prueba','Implementacion','Verificacion','Aceptacion','Puerta_minima'])
        for r in catalog['requirements']:
            writer.writerow([r['id'],r['title'],r['kind'],r['origin'],','.join(r['principles']),','.join(r['modules']),','.join(r['decisions']),','.join(r['scenarios']),r['test']['id'],r['implementation'],r.get('verification',catalog['defaults']['verification']),r.get('acceptanceStatus',catalog['defaults']['acceptanceStatus']),r['releaseGate']])
    with (out / 'DESVIACIONES.csv').open('w', encoding='utf-8-sig', newline='') as stream:
        writer = csv.writer(stream, delimiter=';'); writer.writerow(['ID','Titulo','Estado','Requisitos','ADR','Fuente','Tratamiento'])
        for d in deviations['items']:
            writer.writerow([d['id'],d['title'],d['status'],','.join(d['requirements']),','.join(d['decisions']),d['source'],d['treatment']])
    chapters = []
    for name in architecture['requiredDocs']:
        if name == 'README.md':
            continue
        chapters.append((Path(name).stem, (DOCS/name).read_text(encoding='utf-8')))
    chapters.append(('catalogo-rf-rq-t', catalog_text))
    consolidated = '# IsaacDaroch-Web — D2: línea base rectora\n\nEspecificación y reconciliación, no release de aplicación.\n\n' + '\n\n'.join(text for _, text in chapters)
    (out / 'D2_Guia_completa.md').write_text(consolidated, encoding='utf-8')
    nav = ''.join('<li><a href="#doc-' + stem + '">' + html.escape(text.splitlines()[0].lstrip('# ')) + '</a></li>' for stem, text in chapters)
    body = ''.join('<section id="doc-' + stem + '">' + markdown_to_html(text) + '</section>' for stem, text in chapters)
    style = 'body{font:17px/1.65 system-ui,sans-serif;color:#18242c;background:#fff;max-width:1160px;margin:auto;padding:2rem}h1,h2,h3{line-height:1.25;color:#143644}h2{margin-top:3rem;border-bottom:2px solid #168080;padding-bottom:.6rem}h3{margin-top:2rem}a{color:#00686b}code{font-family:ui-monospace,monospace;overflow-wrap:anywhere}pre{padding:1rem;background:#f1f4f5;white-space:pre-wrap;overflow:auto}table{border-collapse:collapse;width:100%;font-size:.9rem}th,td{border:1px solid #a6b9c1;padding:.65rem;vertical-align:top}th{background:#edf4f5}.table-wrap{overflow-x:auto}nav{background:#f1f7f7;padding:1rem 2rem}.notice{border-left:5px solid #168080;padding:1rem;background:#edf4f5}@media print{body{font-size:10pt;max-width:none;padding:0}nav{display:none}h2{break-before:page}h3{break-after:avoid}tr,pre{break-inside:avoid}.table-wrap{overflow:visible}a{color:#143644}}'
    document = '<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>IsaacDaroch-Web — Línea base D2</title><style>' + style + '</style></head><body><h1>IsaacDaroch-Web — Línea base rectora D2</h1><p class="notice">Documentación de diseño y reconciliación. No instala, modifica ni publica la aplicación. El verde del control documental no acredita cumplimiento del sitio. Las vistas Mermaid se conservan como código legible; GitHub puede renderizarlas.</p><nav aria-label="Contenido"><ol>' + nav + '</ol></nav>' + body + '</body></html>'
    (out / 'ABRIR_GUIA_D2.html').write_text(document, encoding='utf-8')
    regression = {'result':'not-provided','testCount':None}
    if test_log is not None:
        text = test_log.read_text(encoding='utf-8', errors='replace')
        match = re.search(r'Ran (\d+) tests?', text)
        passed = bool(re.search(r'^OK\s*$', text, re.M)) and 'FAILED (' not in text
        regression = {'result':'passed' if passed else 'not-confirmed','testCount':int(match.group(1)) if match else None}
        (out/'evidence').mkdir(exist_ok=True); shutil.copyfile(test_log,out/'evidence/validator-tests.log')
    report = {'documentVersion':'D2','executedAt':datetime.now(timezone.utc).isoformat(),'sourceCommit':os.environ.get('GITHUB_SHA'),'environment':{'python':platform.python_version(),'os':platform.platform()},'scope':'Document registry integrity and generation only; product acceptance not executed','documentValidation':'passed','requirements':len(catalog['requirements']),'plannedProductTests':len(catalog['requirements']),'legacyRequirementIdsPreserved':36,'newRequirementIds':8,'openDeviations':sum(d['status']=='open' for d in deviations['items']),'productTestsExecutedInThisRun':False,'productRequirementsAccepted':sum(r.get('acceptanceStatus',catalog['defaults']['acceptanceStatus'])=='accepted' for r in catalog['requirements']),'implementationStates':dict(collections.Counter(r['implementation'] for r in catalog['requirements'])),'validatorRegression':regression}
    (out/'evidence').mkdir(exist_ok=True)
    (out/'evidence/document-validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    (out/'LEER_PRIMERO.txt').write_text('Abra ABRIR_GUIA_D2.html en su navegador. Fuentes en docs/d2; catalogo y trazabilidad en Markdown/JSON/CSV. Este paquete es documentacion, NO instalador de la web. Los requisitos de producto siguen pendientes de evidencia de integracion y aceptacion. Para comprobar solo documentacion, desde esta carpeta: python tools/governance/validate_d2.py --out nueva-salida\n',encoding='utf-8')
    manifest=[]
    for p in sorted(out.rglob('*')):
        if p.is_file():
            b=p.read_bytes();manifest.append({'path':p.relative_to(out).as_posix(),'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest()})
    (out/'MANIFEST_D2.json').write_text(json.dumps({'schemaVersion':1,'scope':'Documentation artifact; manifest excludes itself','sourceCommit':os.environ.get('GITHUB_SHA'),'files':manifest},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    return report


def main() -> int:
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--out',type=Path,default=ROOT/'build-docs')
    parser.add_argument('--test-log',type=Path)
    args=parser.parse_args()
    architecture,catalog,deviations=load_records()
    errors=validate(architecture,catalog,deviations,DOCS)
    if errors:
        print('\n'.join(errors),file=sys.stderr);return 1
    report=generate(args.out,architecture,catalog,deviations,args.test_log)
    print(json.dumps(report,ensure_ascii=False,indent=2));return 0


if __name__=='__main__':
    try:
        sys.exit(main())
    except (ValueError,OSError,KeyError,TypeError,json.JSONDecodeError) as error:
        print(f'Documentation validation failed: {error}',file=sys.stderr);sys.exit(1)
