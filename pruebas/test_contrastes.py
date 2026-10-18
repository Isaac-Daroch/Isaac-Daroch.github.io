"""Negative CLI contracts; fixtures stay outside the production token source."""
import copy,json,subprocess,sys,tempfile,unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
class ContrastCliTests(unittest.TestCase):
    def setUp(self):
        self.palettes=json.loads((ROOT/'tokens/paletas-grafito.json').read_text(encoding='utf-8'))
    def run_fixture(self,data):
        with tempfile.TemporaryDirectory(prefix='grafito-contrast-') as directory:
            folder=Path(directory);source=folder/'tokens.json';output=folder/'result.json'
            source.write_text(json.dumps(data),encoding='utf-8')
            result=subprocess.run([sys.executable,str(ROOT/'pruebas/verificar_contrastes.py'),'--input',str(source),'--out',str(output)],capture_output=True,text=True)
            return result,json.loads(output.read_text(encoding='utf-8')) if output.exists() else None
    def test_real_source_has_all_384_authorized_pairs(self):
        result,report=self.run_fixture(self.palettes)
        self.assertEqual(result.returncode,0);self.assertEqual(report['pairs'],384);self.assertEqual(report['failures'],0)
    def test_invisible_text_fails_with_exit_one(self):
        key=next(iter(self.palettes));self.palettes[key]['text']=self.palettes[key]['bg']
        result,report=self.run_fixture(self.palettes)
        self.assertEqual(result.returncode,1);self.assertGreater(report['failures'],0)
    def test_missing_palette_is_invalid_not_a_partial_pass(self):
        del self.palettes[next(iter(self.palettes))]
        result,report=self.run_fixture(self.palettes)
        self.assertEqual(result.returncode,2);self.assertIsNone(report)
if __name__=='__main__':unittest.main()
