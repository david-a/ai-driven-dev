## MODIFIED Requirements

### Requirement: Empty state

The system SHALL show guidance when no tasks are visible for the current view.

#### Scenario: No tasks at all

- **WHEN** there are zero tasks in storage
- **THEN** a message prompts the user to add their first task

#### Scenario: Filter hides all tasks

- **WHEN** the user selects a filter tab and no tasks match
- **THEN** a message explains that nothing matches the current filter

## ADDED Requirements

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
