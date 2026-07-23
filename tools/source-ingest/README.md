# Safe ZIP Source Ingest

```bash
python3 tools/source-ingest/inventory_zips.py /path/to/project \
  --recursive \
  --extract-to /path/to/project/_source_ingest \
  --json zip-inventory.json \
  --csv zip-inventory.csv
```

The tool never deletes, renames or overwrites source ZIPs. It computes SHA-256 hashes, identifies exact duplicates, rejects unsafe archive paths and extracts each package into an isolated hash directory.

## Workflow

1. Run inventory only.
2. Review duplicate and invalid/unsafe records.
3. Extract into `_source_ingest`, never over working files.
4. Classify packages in `registry/source-packages.v04.json`.
5. Promote selected current contracts into the canonical repo through a reviewed PR.
6. Delete nothing until backup paths and successor authority are confirmed.
