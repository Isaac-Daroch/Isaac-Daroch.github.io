"""Regression tests for D2 documentary controls, not for the web application."""
import copy
import importlib.util
from pathlib import Path
import tempfile
import unittest

ROOT=Path(__file__).resolve().parents[2]
spec=importlib.util.spec_from_file_location('validate_d2',ROOT/'tools/governance/validate_d2.py')
v=importlib.util.module_from_spec(spec)
spec.loader.exec_module(v)


class D2GovernanceTests(unittest.TestCase):
    def setUp(self):
        self.a,self.c,self.d=v.load_records()
    def errors(self):
        return v.validate(self.a,self.c,self.d)
    def test_valid_real_registry(self):
        self.assertEqual(v.validate(self.a,self.c,self.d,v.DOCS),[])
    def test_missing_legacy_requirement_is_rejected(self):
        self.c['requirements'].pop(0);self.assertTrue(self.errors())
    def test_duplicate_requirement_is_rejected(self):
        self.c['requirements'][1]['id']='RF-01';self.assertTrue(self.errors())
    def test_lost_d1_acceptance_is_rejected(self):
        self.c['requirements'][0]['d1Acceptance']='';self.assertTrue(self.errors())
    def test_empty_target_acceptance_is_rejected(self):
        self.c['requirements'][0]['acceptance']=[];self.assertTrue(self.errors())
    def test_unknown_module_is_rejected(self):
        self.c['requirements'][0]['modules']=['M-99'];self.assertTrue(self.errors())
    def test_unknown_decision_is_rejected(self):
        self.c['requirements'][0]['decisions']=['ADR-99'];self.assertTrue(self.errors())
    def test_missing_test_oracle_is_rejected(self):
        self.c['requirements'][0]['test']['oracle']='';self.assertTrue(self.errors())
    def test_duplicate_or_changed_test_is_rejected(self):
        self.c['requirements'][0]['test']['id']='T-02';self.assertTrue(self.errors())
    def test_verified_without_evidence_is_rejected(self):
        self.c['requirements'][0]['verification']='verified';self.assertTrue(self.errors())
    def test_incomplete_evidence_is_rejected(self):
        r=self.c['requirements'][0];r['verification']='verified';r['evidence']=[{'result':'passed'}];self.assertTrue(self.errors())
    def test_accepted_without_verification_is_rejected(self):
        self.c['requirements'][0]['acceptanceStatus']='accepted';self.assertTrue(self.errors())
    def test_bad_deviation_link_is_rejected(self):
        self.d['items'][0]['requirements']=['RF-99'];self.assertTrue(self.errors())
    def test_missing_source_docs_are_rejected(self):
        with tempfile.TemporaryDirectory() as folder:
            self.assertTrue(v.validate(self.a,self.c,self.d,Path(folder)))
    def test_html_is_escaped_and_local_links_are_safe(self):
        text=v.markdown_to_html('# Test\n\n<script>alert(1)</script>\n\n[x](javascript:alert)\n\n```text\n<img src=x>\n```')
        self.assertNotIn('<script>',text);self.assertNotIn('href="javascript:',text);self.assertIn('&lt;script&gt;',text)
    def test_catalog_preserves_all_ids_and_pending_state(self):
        text=v.requirement_markdown(self.c)
        for r in self.c['requirements']:
            self.assertIn(r['id'],text);self.assertIn(r['test']['id'],text)
        self.assertIn('verificación pending',text)
    def test_generation_creates_no_claim_of_product_execution(self):
        with tempfile.TemporaryDirectory() as folder:
            out=Path(folder)/'delivery';report=v.generate(out,self.a,self.c,self.d)
            self.assertFalse(report['productTestsExecutedInThisRun']);self.assertEqual(report['requirements'],44)
            self.assertEqual(report['productRequirementsAccepted'],0)
            self.assertTrue((out/'ABRIR_GUIA_D2.html').is_file());self.assertTrue((out/'MANIFEST_D2.json').is_file())
            self.assertTrue((out/'TRAZABILIDAD.csv').read_text(encoding='utf-8-sig').startswith('Requisito;'))
    def test_output_cannot_overwrite_sources_or_existing_delivery(self):
        with self.assertRaises(ValueError):v.generate(v.DOCS,self.a,self.c,self.d)
        with tempfile.TemporaryDirectory() as folder:
            p=Path(folder);(p/'sentinel').write_text('preserve')
            with self.assertRaises(ValueError):v.generate(p,self.a,self.c,self.d)
            self.assertEqual((p/'sentinel').read_text(),'preserve')

if __name__=='__main__':unittest.main()
