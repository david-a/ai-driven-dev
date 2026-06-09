# Focus List

Minimal task list demo app for the OpenSpec presentation. Vanilla HTML, CSS, and JavaScript — no build step.

## Run locally

Open `index.html` in a browser, or serve this folder:

```bash
python3 -m http.server 8080
```

Then visit http://localhost:8080

## OpenSpec

OpenSpec lives in this folder. For the live demo, open **`demo/focus-list/` as your Cursor workspace** so slash commands resolve correctly.

```bash
cd demo/focus-list
openspec list          # active changes (should be empty before live demo)
openspec list --specs  # merged capabilities
```

### Pre-demo state

Two archived changes are already implemented:

| Archive | Capability | What shipped |
|---------|------------|--------------|
| `2026-06-09-add-task-list` | `task-list` (new) | CRUD, empty state, localStorage |
| `2026-06-09-add-filter-tabs` | `task-list` (modified) | All / Active / Done filter tabs |

Merged specs: `openspec/specs/task-list/spec.md`

### Live demo

See **`DEMO-SCRIPT.md`** for copy-paste prompts (propose → apply → archive).

The live feature is **priorities + focus mode**: modifies `task-list`, adds new `focus-mode` capability.
