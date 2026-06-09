## Why

Once users accumulate tasks, they need a quick way to see only active work or review completed items. Filter tabs are a small, visible iteration that extends the existing task-list capability without adding new domain concepts.

## What Changes

- Add All / Active / Done filter tabs above the task list
- Filter client-side; no changes to persistence shape
- Remember the selected tab in `sessionStorage` for the current browser tab
- Adjust empty-state copy when a filter hides all matching tasks

## Capabilities

### New Capabilities

- _(none)_

### Modified Capabilities

- `task-list`: Add filter tabs and filtered list display

## Impact

- `index.html`: filter tab markup
- `styles.css`: tab styling
- `app.js`: filter state, filtered render, sessionStorage for active tab
