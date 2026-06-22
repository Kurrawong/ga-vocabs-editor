# K-Maker end-to-end walkthrough

A documented, **real** end-to-end walkthrough of the GA vocabs editor (K-Maker) on the **dev** site
`ga-vocabs-editor.app.dev.kurrawong.ai`, driven through the full authoring lifecycle to **live** and
then reverted. Every clip is a real edit against the real editor and real GitHub — no mocks.

## Viewing it

Open [`walkthrough/index.html`](walkthrough/index.html) in a browser. It's a self-contained player:
each segment shows a short clip with a description, Prev/Next (← / →), and an optional per-segment
voiceover (space to play). Add narration audio as `walkthrough/audio/<id>.mp3` — scripts are in
[`walkthrough/NARRATION.md`](walkthrough/NARRATION.md).

| # | Segment | id | What it shows |
|---|---------|-----|----------------|
| 1 | Edit a value | `edit-value` | Open a vocab, select a concept, change a value, save to your private edit branch |
| 2 | Add a concept | `add-concept` | New concept — IRI derived from a human identifier (slug of the label), read-only once created |
| 3 | Create a vocabulary | `create-vocab` | Scaffold a whole ConceptScheme from a title + description |
| 4 | Submit for approval | `submit-approval` | Raise a review request (edit branch → `develop`) |
| 5 | Approve into staging | `approve-staging` | Reviewer approves; changes merge into `develop` |
| 6 | Publish to production | `publish-production` | Promote `develop` → `master` (the release step) |
| 7 | Deployment | `deployment` | Before / after of the live public page after the change deploys |

> **Earlier runs.** `run-01-edit-existing-concept/`, `run-02-new-concept/`, and `run-03-new-vocab/` are
> the first per-action recordings, kept for reference. They predate the concept-creation modal (segment
> 2/3 show the current flow), so prefer the walkthrough above.

## Lifecycle reference
Editor: edit branch (`edit/<ws>/<vocab>`) → workspace branch (`develop`) → `master` ("production").
The dev site deploys from **`main`** (not `master`), so reaching live needs a `main` bridge + the CI
chain (Process Data → trigger-deploy → Deploy).

## Fixes shipped while producing this walkthrough (prez-lite)
1. **Concept IRIs** — new concepts now derive their IRI from a human-readable identifier (defaulting to a
   slug of the preferred label); once created the IRI is read-only in the UI (changing it would break
   back-links, so it's TTL-only). [prez-lite#30](https://github.com/Kurrawong/prez-lite/pull/30)
2. **Save targeted the wrong branch** — navigating directly to a vocab while a *different* vocab was left
   in the workspace state saved to the stale vocab's edit branch. The workspace vocab context is now
   bound to the open vocab before any save. [prez-lite#31](https://github.com/Kurrawong/prez-lite/pull/31)
3. **`[object Object]` in the approve modal** — the review modal title fell back to a `LangMap` object
   when `editModeTitle` was empty (merged state). Wrapped in `getLabel()`.
   [prez-lite#32](https://github.com/Kurrawong/prez-lite/pull/32)

## Open findings (not yet fixed)
- **Save twice without reloading → SHA conflict.** After a save, the editor's cached file SHA isn't
  refreshed, so a second same-session save fails with "does not match …" and needs the "Retry save"
  button (which re-fetches and succeeds).
- **Reloading mid-session discards earlier unmerged saves.** `ensureEditBranch` resets the edit branch to
  the workspace head on re-entry (intended, per #41, to drop stale abandoned branches) — but it also
  drops legitimate prior saves if you reload and keep editing before submitting. Data-loss footgun.
- **Incremental processing crashes on vocab deletion** (`ENOENT`) — deleting a vocab TTL fails Process
  Data's incremental step; a full rebuild dispatch is the workaround.
- **Two-layer promotion is easy to half-complete** — "Submit for Publishing" publishes `develop → master`
  regardless of whether the per-vocab "Submit for Approval" landed the edit-branch change in `develop`
  first; the "changed in staging" hint reflects the develop-vs-master diff, not the edit branch.
