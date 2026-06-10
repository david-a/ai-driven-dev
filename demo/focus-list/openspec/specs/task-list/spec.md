# task-list Specification

## Purpose

Focus List task management: create, complete, and delete tasks with browser persistence, priorities, filter tabs (All / Active / Done), and optional Focus mode.
## Requirements
### Requirement: Add task

The system SHALL allow the user to create a task with non-empty text.

#### Scenario: Add via button

- **WHEN** the user enters text in the input and clicks Add
- **THEN** a new incomplete task appears in the list
- **AND** the input is cleared

#### Scenario: Add via Enter key

- **WHEN** the user enters text and presses Enter
- **THEN** a new incomplete task appears in the list

#### Scenario: Reject empty task

- **WHEN** the user submits with blank or whitespace-only text
- **THEN** no task is added

### Requirement: Complete task

The system SHALL allow the user to mark a task complete or incomplete.

#### Scenario: Toggle complete

- **WHEN** the user toggles a task's checkbox
- **THEN** the task shows as completed with strikethrough styling
- **AND** toggling again marks it incomplete

### Requirement: Delete task

The system SHALL allow the user to remove a task permanently.

#### Scenario: Delete task

- **WHEN** the user clicks delete on a task
- **THEN** the task is removed from the list

### Requirement: Empty state

The system SHALL show guidance when no tasks are visible for the current view.

#### Scenario: No tasks at all

- **WHEN** there are zero tasks in storage
- **THEN** a message prompts the user to add their first task

#### Scenario: Filter hides all tasks

- **WHEN** the user selects a filter tab and no tasks match
- **THEN** a message explains that nothing matches the current filter

### Requirement: Persist tasks

The system SHALL save tasks to `localStorage` and restore them on load.

#### Scenario: Survive refresh

- **WHEN** the user refreshes the page
- **THEN** all tasks reappear with the same text, completion state, and priority

### Requirement: Task priority

The system SHALL support an optional priority on each task: `low`, `medium`, or `high`.

#### Scenario: Default priority on create

- **WHEN** the user adds a new task
- **THEN** the task is stored with priority `medium`

#### Scenario: Legacy tasks without priority

- **WHEN** a task is loaded from storage without a priority field
- **THEN** it is treated as `medium`

### Requirement: Show priority in list

The system SHALL display each task's priority in its list row using a readable text label or badge.

#### Scenario: Priority visible in row

- **WHEN** a task is shown in the list
- **THEN** the user can read its priority level without relying on color alone

### Requirement: Change priority inline

The system SHALL allow the user to change a task's priority after creation without opening a modal.

#### Scenario: Update priority

- **WHEN** the user changes a task's priority control in the list row
- **THEN** the task's priority updates and persists on refresh

### Requirement: Sort by priority within filter

The system SHALL order visible tasks within the current filter tab by priority (high, then medium, then low), then by creation order.

#### Scenario: Higher priority first

- **WHEN** multiple tasks are visible under the active filter tab
- **THEN** high-priority tasks appear above medium, and medium above low
- **AND** tasks with the same priority keep their creation order

### Requirement: Filter tabs

The system SHALL provide All, Active, and Done filter tabs to control which tasks are visible.

#### Scenario: All tab

- **WHEN** the All tab is selected
- **THEN** every task is visible regardless of completion state

#### Scenario: Active tab

- **WHEN** the Active tab is selected
- **THEN** only incomplete tasks are visible

#### Scenario: Done tab

- **WHEN** the Done tab is selected
- **THEN** only completed tasks are visible

#### Scenario: Remember tab in session

- **WHEN** the user selects a tab and refreshes the page in the same browser tab
- **THEN** the same filter tab remains selected

#### Scenario: Default tab in new session

- **WHEN** the user opens the app in a new browser tab with no saved filter preference
- **THEN** the All tab is selected

