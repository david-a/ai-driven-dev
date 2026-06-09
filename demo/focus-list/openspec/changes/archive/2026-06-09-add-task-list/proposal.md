## Why

Focus List needs a minimal starting point for the OpenSpec demo: a task list everyone understands in seconds, so the audience can focus on the spec workflow rather than domain logic.

## What Changes

- Add a single-page task list UI (add, complete, delete)
- Show an empty state when there are no tasks
- Persist tasks in `localStorage` so they survive page refresh
- No filters, themes, or extra features yet

## Capabilities

### New Capabilities

- `task-list`: Core task CRUD, empty state, and browser persistence

### Modified Capabilities

- _(none — greenfield app)_

## Impact

- New files: `index.html`, `styles.css`, `app.js`
- No dependencies or build tooling
