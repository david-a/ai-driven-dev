## Context

Focus List has CRUD, persistence, and a single unfiltered list. Users need lightweight filtering without new data fields.

## Goals / Non-Goals

**Goals:**

- Three tabs: `all`, `active`, `done` implemented as a button group with `aria-pressed`
- Filter applied at render time over the in-memory `tasks` array
- `sessionStorage` key `focus-list:filter` stores current tab id

**Non-Goals:**

- URL routing or query params for filters
- Count badges on tabs
- Search, sort, or priority

## Decisions

1. **Filter values**: `"all" | "active" | "done"` — stored as string in sessionStorage.
2. **Empty state logic**: Distinguish global empty (zero tasks) from filter-empty (tasks exist but none match).
3. **Tab UI**: Placed between the form and the list; keyboard accessible.

## Risks / Trade-offs

- sessionStorage vs localStorage is intentional: filter is a view preference, not user data.
