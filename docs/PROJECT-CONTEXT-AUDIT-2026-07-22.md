# Project Context Audit - 2026-07-22

**Scope:** 16 newly supplied project-context artifacts  
**Machine-readable evidence:** `registry/context-artifacts.audit.v01.json`  
**Authority:** `docs/SOURCE-OF-TRUTH-v04.md`

## Outcome

The fresh context improves the system, but it is not one uniformly authoritative package.

| Group | Decision |
|---|---|
| Canonical Memory v10 | current domain authority |
| v09 rebuild, cues and reported technical manifest | current subordinate candidate/review evidence |
| Smart Context v05 and Near-Final v08 | superseded; v05 also conflicts with v10 |
| Two Sessionbrain supplement PDFs | same text; keep one reference, mark the other exact content duplicate |
| TAKTØR seven-page PDF | historical brief superseded by detailed OSS research |
| TeacherBrain/Notion files and SQL | quarantine from LICHTREICH product truth |
| TAKTØR OSS research | valid baseline, supplemented by current upstream delta |

## Confirmed conflict: Smart Context v05

The file declares `ACTIVE_CANONICAL_CONTEXT`, but internally references:

- `PROJECT_MEMORY_CANONICAL_v05`,
- a pre-v09 audio path,
- active multilingual voice roles.

Canonical v10 explicitly replaces Canonical v05 and v06-v09 deltas as active memory, names Final Candidate v09, and defers multilingual voices. Therefore the correct status is `SUPERSEDED_CONFLICT`, not `CURRENT`.

## Voice/release safety

The v09 rebuild and review files label the new story voices as synthetic production placeholders. Canonical v10 uses the shorter wording “Produktionsstimmen”. Until the user explicitly locks the exact voices and MACAN has consent/rights evidence, the safe interpretation is:

```text
FINAL_CANDIDATE
+ synthetic working voices
+ AWAITING_USER_REVIEW
+ RIGHTS_BLOCKED_FOR_PUBLIC_RELEASE
```

## TeacherBrain boundary

The following files are quarantined from LICHTREICH runtime/data architecture:

- Studio/Claude TeacherBrain handoff,
- TeacherBrain importer requirements,
- TeacherBrain Supabase schema,
- combined TeacherBrain/Notion datastacks.

Reusable patterns may be extracted deliberately:

- versioned agent manifests,
- import preview before write,
- missing-file reporting instead of guessing,
- RBAC/privacy/export gates,
- audit events,
- source-versus-inference labels.

Not reusable without a separate product decision:

- school/student/grade/report-card entities,
- “Supabase is the source of truth” for LICHTREICH,
- the proposed TeacherBrain P0 module order,
- education-specific RBAC and workflows.

LICHTREICH already has a different verified runtime direction: Firebase Auth/UI state, Neon/PostgreSQL core, n8n execution and module-specific services. A TeacherBrain SQL file must not silently create another truth.

## PDF evidence

The 19-page supplement was rendered and visually inspected. Typography and page structure are readable. Its two supplied copies have different PDF hashes but identical layout-preserving extracted text. This is an exact content duplicate, not two independent specifications.

The supplement is directionally aligned on:

- system/module/user separation,
- desktop as shared cockpit,
- Social Hub and TAKTØR as connected modules,
- Head-of-Module routing,
- iterative timestamp review,
- n8n behind friendly workflow names.

Normalize before implementation:

- “central database” means a logical registry/core, not one physical store for every data class;
- multilingual voice roles remain deferred by Canonical v10;
- review and publishing remain separate; MACAN gates external release.

## Handoff rule for Claude, Codex and NotebookLM

Generated context must include only:

1. Canonical Memory v10,
2. accepted contracts/ADRs,
3. current candidate/review evidence,
4. the context artifact registry,
5. explicit conflict and quarantine lists.

It must not auto-load Smart Context v05, TeacherBrain SQL/datastacks or both duplicate PDFs.
