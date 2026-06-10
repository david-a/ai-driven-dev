## Why

Users need to see what matters first in a growing task list, and optionally strip away noise while working. Priority labels and a Focus mode are a small, visible iteration that builds on existing filter tabs without redesigning the app.

## What Changes

- Add optional priority per task: `low`, `medium`, or `high` (default `medium` for new tasks)
- Show priority in each list row (text label or compact badge; readable on a projector)
- Allow inline priority changes after creation (no modal)
- Sort visible tasks within the current filter: high → medium → low, then by creation order
- Add a Focus toggle in the header that hides completed and low-priority tasks
- Active filter tab applies first; Focus rules apply on top
- Persist Focus on/off in `sessionStorage` (same-tab refresh restores; new tab defaults off)
- Show a dedicated empty state when Focus hides all tasks

## Capabilities

### New Capabilities

- `focus-mode`: Header toggle, layered filtering, session persistence, and Focus-specific empty state

### Modified Capabilities

- `task-list`: Priority field on tasks, display and inline editing, sort order within filter

## Impact

- `app.js`: task shape (`priority`), sort in `getVisibleTasks`, priority UI in `render`, Focus state and layered filter logic, sessionStorage for Focus
- `index.html`: Focus toggle in header; priority control markup in list rows (or created in JS)
- `styles.css`: priority badge/label and Focus toggle styling (text + color; not color alone)
