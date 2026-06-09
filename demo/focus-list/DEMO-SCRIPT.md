# Live demo script — Focus List + OpenSpec

Open **`demo/focus-list/`** as your Cursor workspace before the demo.

Pre-flight: `openspec list` should show no active changes. The app should have tasks + filter tabs, but **no priorities or Focus toggle**.

---

## Stage flow (8–12 min)

1. Show app in browser (add a task, switch filter tab)
2. Show `openspec/specs/task-list/spec.md` and two folders in `openspec/changes/archive/`
3. **Propose** (Prompt B) — skim `proposal.md` + spec deltas
4. **Apply** (Prompt C) — implement against `tasks.md`
5. Demo in browser (priorities, Focus toggle)
6. **Archive** (Prompt D) — show modified `task-list` spec + new `focus-mode` spec

---

## Prompt B — live propose (paste this)

```
/opsx:propose add-priorities-and-focus-mode

## Goal - Help users see what matters first, and optionally hide noise while working.

## Part A — [modify task-list capability]
- Add optional priority per task: low | medium | high
- Default new tasks to medium
- Show priority in the list row (text label or compact badge; must be readable on a projector)
- Allow changing priority after creation (inline control is fine; no modal)
- Within the current filter tab, sort visible tasks: high → medium → low, then by creation order

## Part B — [new focus-mode capability]
- Add a "Focus" toggle in the header
- When Focus is ON:
  - Hide completed tasks
  - Hide low-priority tasks
  - Active filter tab still applies first, then Focus rules
- When Focus is OFF: show everything matching the current filter again
- Persist Focus on/off in sessionStorage (not localStorage) so a refresh in the same tab restores it, but a new tab defaults to off
- If Focus hides all tasks, show a dedicated empty state (one line of guidance, not a blank list)

## UX / accessibility
- Focus toggle must be keyboard operable and have an accessible name
- Do not rely on color alone for priority (include text or icon)
- Keep layout changes minimal; no redesign of the task form

## Technical constraints
- Vanilla JS only; no libraries
- Reuse existing state/render patterns in app.js; do not rewrite the app architecture
- All new strings in one place if the app already centralizes copy (otherwise keep consistent with existing style)


> OPTIONAL:

## Non-goals (do not spec or implement)
- No due dates, search, tags, or categories
- No backend, sync, or auth
- No drag-and-drop reorder
- No user-defined priority names or custom levels
- No animations beyond a simple opacity transition if already idiomatic in the codebase

## Spec structure expectation
- Produce a MODIFIED delta for task-list and an ADDED delta for focus-mode (separate capability)
- Max ~4 requirements per capability; each with at least one Given/When/Then scenario
- tasks.md: numbered 1.1, 1.2… grouped by capability; each task completable in one apply pass
```

**Talking point:** The prompt is the first artifact. The slash command starts the workflow; the paragraph carries the engineering contract.

**Skim on stage:** `proposal.md`, `openspec/changes/add-priorities-and-focus-mode/specs/task-list/spec.md` (MODIFIED), and `specs/focus-mode/spec.md` (ADDED).

---

## Prompt C — apply

```
/opsx:apply add-priorities-and-focus-mode

Implement tasks.md in order. Check off each task as you complete it.
Verify against the spec scenarios: default priority, sort order, Focus hiding rules, sessionStorage behavior, empty state.
No refactors outside this change.
```

**Browser check after apply:**

- Add 3 tasks at different priorities
- Turn Focus on → low-priority and completed tasks hide
- Switch filter tab while Focus is on
- Refresh → Focus state restores in same tab

---

## Prompt D — archive

```
/opsx:archive add-priorities-and-focus-mode
```

**Show after archive:**

1. `openspec/specs/task-list/spec.md` — priorities merged (MODIFIED)
2. `openspec/specs/focus-mode/spec.md` — new capability (ADDED)
3. `openspec/changes/archive/YYYY-MM-DD-add-priorities-and-focus-mode/` — full audit trail

**One-liner:** Archive merged a change into an existing spec and created a new one. Both are team truth, not chat history.

---

## Backup prompts

### E — if propose over-scopes

```
Trim this change for a 5-minute live demo: max 4 requirements, max 8 tasks total.
Move anything non-essential to a "Future work" section in proposal.md only (not in spec deltas).
```

### F — if apply stalls

```
/opsx:apply add-priorities-and-focus-mode

Continue from the first unchecked task in tasks.md. Skip anything already done in the codebase.
```

### G — if you want to show explore first (optional, +2 min)

```
/opsx:explore

Should priorities or due dates be a better next feature for this demo app?
Compare complexity, spec delta shape (MODIFIED vs ADDED), and what reads best on a projector.
Do not create a change yet.
```

Then transition: "We explored; now we commit with propose."
