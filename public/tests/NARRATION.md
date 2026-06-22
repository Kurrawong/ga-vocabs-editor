# Walkthrough narration scripts

Per-segment voiceover scripts for the K-Maker authoring walkthrough. Generate audio
with ElevenLabs (or any TTS), save each as `audio/<id>.mp3`, and the player
(`index.html`) auto-plays it alongside that segment's clip. Keep audio roughly the
length of the clip; the player can auto-advance when the audio ends.

| # | id | title |
|---|-----|-------|
| 1 | `edit-value` | Edit a value |
| 2 | `add-concept` | Add a concept |
| 3 | `create-vocab` | Create a vocabulary |
| 4 | `submit-approval` | Submit for approval |
| 5 | `approve-staging` | Approve into staging |
| 6 | `publish-production` | Publish to production |
| 7 | `deployment` | Deployment |

---

### 1. Edit a value — `edit-value`
> Let's start with a simple edit. We open a vocabulary in the editor, select a concept, and change one of its values. Every change is tracked, and saving commits it to your own private edit branch — it doesn't touch the published vocabulary yet.

### 2. Add a concept — `add-concept`
> Next, we add a brand-new concept. We give it a preferred label, and the editor suggests a matching identifier — that identifier becomes the concept's permanent web address, its IRI. Once the concept is saved, its IRI is locked in.

### 3. Create a vocabulary — `create-vocab`
> We can also build a whole vocabulary from scratch. We give it a title and description, the editor scaffolds it, and drops us straight into the editor to start adding concepts.

### 4. Submit for approval — `submit-approval`
> When the draft is ready, we submit it for approval. This raises a review request, moving our edits out of the personal draft and into the review queue for a colleague to check.

### 5. Approve into staging — `approve-staging`
> A reviewer opens the request and approves it. The changes merge into the shared staging area, where the whole team's work comes together before release.

### 6. Publish to production — `publish-production`
> Once staging looks good, we publish to production. This is the formal release step that promotes the staged vocabulary into the published set.

### 7. Deployment — `deployment`
> Finally, the published change is built and deployed automatically. Within a few minutes it appears on the live public site — here's the before and after.
