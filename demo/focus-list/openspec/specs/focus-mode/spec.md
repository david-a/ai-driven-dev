# focus-mode Specification

## Purpose

Focus mode: a session-scoped view that hides completed and low-priority tasks so the user can concentrate on what matters now.

## Requirements

### Requirement: Focus toggle

The system SHALL provide a Focus toggle in the header to turn focus mode on or off.

#### Scenario: Toggle focus on

- **WHEN** the user turns Focus on
- **THEN** focus mode is active for the current view

#### Scenario: Toggle focus off

- **WHEN** the user turns Focus off
- **THEN** all tasks matching the current filter tab are visible again (subject to sort order)

#### Scenario: Keyboard accessible toggle

- **WHEN** the user focuses the Focus control
- **THEN** they can operate it with the keyboard
- **AND** the control has an accessible name

### Requirement: Focus filtering rules

When Focus is on, the system SHALL hide completed tasks and low-priority tasks from the visible list.

#### Scenario: Hide completed under focus

- **WHEN** Focus is on and a task is completed
- **THEN** that task is not shown

#### Scenario: Hide low priority under focus

- **WHEN** Focus is on and a task has priority `low`
- **THEN** that task is not shown

#### Scenario: Filter tab applies first

- **WHEN** Focus is on and a filter tab is selected
- **THEN** only tasks matching the filter tab are considered
- **AND** Focus rules are applied on top of that set

### Requirement: Persist focus in session

The system SHALL persist Focus on/off in `sessionStorage` for the current browser tab.

#### Scenario: Survive refresh in same tab

- **WHEN** the user toggles Focus and refreshes the page in the same browser tab
- **THEN** Focus remains in the same on/off state

#### Scenario: Default off in new tab

- **WHEN** the user opens the app in a new browser tab with no saved Focus preference
- **THEN** Focus is off

### Requirement: Focus empty state

The system SHALL show dedicated guidance when Focus is on and no tasks remain visible.

#### Scenario: Focus hides everything

- **WHEN** Focus is on and at least one task exists but none pass Focus rules
- **THEN** a one-line message explains that nothing is in focus and suggests turning Focus off or raising priority
