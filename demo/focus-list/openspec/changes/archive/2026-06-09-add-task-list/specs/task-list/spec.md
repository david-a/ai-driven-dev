## ADDED Requirements

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

The system SHALL show guidance when no tasks exist.

#### Scenario: No tasks

- **WHEN** the task list is empty
- **THEN** a message prompts the user to add their first task

### Requirement: Persist tasks

The system SHALL save tasks to `localStorage` and restore them on load.

#### Scenario: Survive refresh

- **WHEN** the user refreshes the page
- **THEN** all tasks reappear with the same text and completion state
