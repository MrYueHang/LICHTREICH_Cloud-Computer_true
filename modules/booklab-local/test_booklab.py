import tempfile
import unittest
import zipfile
from pathlib import Path

import booklab


class BookLabTest(unittest.TestCase):
    def test_import_and_audit(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            source = root / "input"
            source.mkdir()
            (source / "OFFENER_KREIS_FULL_MANUSCRIPT_v15.md").write_text(
                "Nichts ist nicht nichts. Beides bleibt gleichzeitig wahr.", encoding="utf-8"
            )
            with zipfile.ZipFile(source / "OFFENER_KREIS_EDITORIAL_PREPRODUCTION_v16.zip", "w") as archive:
                archive.writestr("sources/redaktionsmatrix_v16.json", '{"chapters": []}')
            project = root / "project"
            result = booklab.import_source(project, [source])
            self.assertGreaterEqual(result["records"], 3)
            summary = booklab.audit(project)
            self.assertGreaterEqual(summary["nothing_finds"], 1)
            rows = booklab.load(project)
            self.assertTrue(any(row["status"] == "CANON_FROZEN" for row in rows))
            self.assertTrue(any(row["status"] == "PROPOSAL_REVIEW" for row in rows))
            self.assertTrue((project / "dashboard/index.html").exists())


if __name__ == "__main__":
    unittest.main()
