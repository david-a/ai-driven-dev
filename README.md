# AI-Driven Development

Talk materials on building with AI — moving fast without expensive rework. The core idea: **intent + AI + strong verification**, using [OpenSpec](https://github.com/Fission-AI/OpenSpec) as a visible, repeatable loop.

## What's here

| Folder | What it is |
|--------|------------|
| [`presentation/`](presentation/) | Slide deck — open `index.html` in a browser |
| [`demo/focus-list/`](demo/focus-list/) | Small task-list app used for the live OpenSpec demo |

## Quick start

**Slides**

```bash
open presentation/index.html
```

**Demo app**

```bash
cd demo/focus-list
python3 -m http.server 8080
```

Then open http://localhost:8080. For the live demo, open `demo/focus-list/` as your Cursor workspace so OpenSpec slash commands work.

See [`demo/focus-list/DEMO-SCRIPT.md`](demo/focus-list/DEMO-SCRIPT.md) for the stage script.
