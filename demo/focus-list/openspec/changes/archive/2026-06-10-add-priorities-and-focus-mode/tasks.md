## 1. Task priority data

- [x] 1.1 Add `priority` to task shape in `app.js`; default `"medium"` on create and when loading legacy tasks
- [x] 1.2 Persist priority in `localStorage` via existing `saveTasks` / `loadTasks`

## 2. Priority UI and sort

- [x] 2.1 Add inline priority control (select with text labels) in each list row in `render()`
- [x] 2.2 Wire priority change handler to update task, save, and re-render
- [x] 2.3 Style priority label/control in `styles.css` (text + tint; readable on projector)
- [x] 2.4 Sort visible tasks high → medium → low, then by creation order within `getVisibleTasks()` pipeline

## 3. Focus mode

- [x] 3.1 Add Focus toggle to header in `index.html` (keyboard operable, accessible name)
- [x] 3.2 Add Focus state, `sessionStorage` load/save (`focus-list:focus`), and toggle handler in `app.js`
- [x] 3.3 Apply Focus rules after filter tab: hide completed and low-priority tasks
- [x] 3.4 Add Focus-specific empty state message in `updateEmptyState()`
- [x] 3.5 Style Focus toggle in `styles.css`
