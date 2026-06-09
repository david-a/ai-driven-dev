## Context

Greenfield vanilla JS app. No existing code. Single HTML page with linked CSS and JS.

## Goals / Non-Goals

**Goals:**

- Minimal DOM structure: header, form, list, empty state
- In-memory task model synced to `localStorage` on every change
- Render function that rebuilds list from state (simple, demo-friendly)

**Non-Goals:**

- Filter tabs, priorities, themes, or backend
- Frameworks, bundlers, or npm packages
- Drag-and-drop reorder

## Decisions

1. **Task shape**: `{ id: string, text: string, completed: boolean }` with `id` from `crypto.randomUUID()` or timestamp fallback.
2. **Storage key**: `focus-list:tasks` in `localStorage` as JSON array.
3. **Render pattern**: One `render()` function called after every state mutation; no virtual DOM.
4. **Styling**: CSS custom properties for colors (light theme only for now); system font stack; accent on primary button.

## Risks / Trade-offs

- Full re-render on each change is fine at demo scale; no optimization needed.
- No migration layer for storage format changes in later features (acceptable for demo).
