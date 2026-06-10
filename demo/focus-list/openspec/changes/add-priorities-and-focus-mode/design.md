## Context

Focus List has CRUD, `localStorage` persistence, and All / Active / Done filter tabs with `sessionStorage` for the active tab. Tasks are `{ id, text, completed }`. Rendering is a single `getVisibleTasks()` → `render()` pipeline in `app.js`.

## Goals / Non-Goals

**Goals:**

- Extend task shape with `priority: "low" | "medium" | "high"` (default `medium`)
- Show priority in each row with text label (not color alone); inline `<select>` or button group for changes
- Sort filtered tasks: high → medium → low, then original array order (creation order)
- Add Focus toggle in header; when ON, layer rules on top of active filter: hide completed and low-priority tasks
- Persist Focus in `sessionStorage` key `focus-list:focus` (`"on"` / `"off"`)
- Dedicated empty-state message when Focus hides all otherwise-visible tasks

**Non-Goals:**

- Priority on the add-task form (new tasks always `medium`)
- Drag-and-drop reorder or manual sort override
- `localStorage` for Focus (tab-scoped view preference only)
- URL params, keyboard shortcuts, or animations

## Decisions

1. **Task shape**: Add `priority` to stored objects. On load, tasks missing `priority` default to `"medium"` for backward compatibility with existing `localStorage` data.

2. **Priority UI**: Compact `<select>` in each row with visible text labels (`Low`, `Medium`, `High`) and `aria-label` including task text. Styled with light background tints per level plus text — satisfies projector and non-color-only requirements.

3. **Visibility pipeline**: Refactor to `getFilteredTasks()` (tab logic) → optional `applyFocusRules()` → `sortByPriority()`. Keeps filter and Focus concerns separate and testable in one place.

4. **Sort stability**: After priority sort, preserve relative order within the same priority using index in the original `tasks` array (map id → index once per render).

5. **Focus toggle**: Checkbox or `role="switch"` button in `.header` next to the title. `aria-checked` / `aria-label="Focus mode"`; keyboard operable via native focusable control.

6. **Empty states**: Extend `updateEmptyState()` with a third branch: tasks exist and filter matches some, but Focus removes all — show one-line guidance (e.g. "Nothing to focus on right now. Turn off Focus or raise a task's priority.").

7. **Copy**: Add priority labels and Focus strings near existing empty-state messages in `app.js` (no separate strings module exists yet).

## Risks / Trade-offs

- **Legacy tasks without priority** → Default to `medium` on read; no migration write until user edits.
- **Done tab + Focus ON** → Focus hides completed tasks anyway; Done tab may always look empty with Focus on. Acceptable for demo; Focus empty state covers the case.
- **Select in every row** → Slightly busier UI; mitigated by compact styling and no form redesign.
