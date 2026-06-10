const STORAGE_KEY = "focus-list:tasks";
const FILTER_KEY = "focus-list:filter";
const FOCUS_KEY = "focus-list:focus";

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };

/** @type {{ id: string, text: string, completed: boolean, priority: "low" | "medium" | "high" }[]} */
let tasks = [];

/** @type {"all" | "active" | "done"} */
let activeFilter = "all";

/** @type {boolean} */
let focusOn = false;

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const listEl = document.getElementById("task-list");
const emptyStateEl = document.getElementById("empty-state");
const filterTabs = document.querySelectorAll(".filter-tab");
const focusToggle = document.getElementById("focus-toggle");

function createId() {
  return crypto.randomUUID?.() ?? `task-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeTask(task) {
  const priority =
    task.priority === "low" || task.priority === "high" ? task.priority : "medium";
  return { ...task, priority };
}

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(normalizeTask) : [];
  } catch {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadFilter() {
  const saved = sessionStorage.getItem(FILTER_KEY);
  if (saved === "all" || saved === "active" || saved === "done") {
    return saved;
  }
  return "all";
}

function saveFilter() {
  sessionStorage.setItem(FILTER_KEY, activeFilter);
}

function loadFocus() {
  return sessionStorage.getItem(FOCUS_KEY) === "on";
}

function saveFocus() {
  sessionStorage.setItem(FOCUS_KEY, focusOn ? "on" : "off");
}

function getFilteredTasks() {
  if (activeFilter === "active") {
    return tasks.filter((task) => !task.completed);
  }
  if (activeFilter === "done") {
    return tasks.filter((task) => task.completed);
  }
  return tasks;
}

function applyFocusRules(filteredTasks) {
  if (!focusOn) return filteredTasks;
  return filteredTasks.filter((task) => !task.completed && task.priority !== "low");
}

function sortByPriority(taskList) {
  const orderIndex = new Map(tasks.map((task, index) => [task.id, index]));
  return [...taskList].sort((a, b) => {
    const priorityDiff = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
    if (priorityDiff !== 0) return priorityDiff;
    return (orderIndex.get(a.id) ?? 0) - (orderIndex.get(b.id) ?? 0);
  });
}

function getVisibleTasks() {
  return sortByPriority(applyFocusRules(getFilteredTasks()));
}

function setFilter(filter) {
  activeFilter = filter;
  saveFilter();
  render();
}

function setFocus(on) {
  focusOn = on;
  saveFocus();
  render();
}

function addTask(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  tasks = [
    ...tasks,
    { id: createId(), text: trimmed, completed: false, priority: "medium" },
  ];
  saveTasks();
  render();
}

function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  render();
}

function updatePriority(id, priority) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, priority } : task
  );
  saveTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  render();
}

function updateEmptyState(visibleTasks) {
  if (tasks.length === 0) {
    emptyStateEl.hidden = false;
    emptyStateEl.textContent = "No tasks yet. Add one above to get started.";
    return;
  }

  const filteredTasks = getFilteredTasks();
  if (focusOn && filteredTasks.length > 0 && visibleTasks.length === 0) {
    emptyStateEl.hidden = false;
    emptyStateEl.textContent =
      "Nothing to focus on right now. Turn off Focus or raise a task's priority.";
    return;
  }

  if (visibleTasks.length === 0) {
    emptyStateEl.hidden = false;
    const messages = {
      all: "No tasks yet. Add one above to get started.",
      active: "No active tasks. Everything is done, or add something new.",
      done: "No completed tasks yet. Finish a task to see it here.",
    };
    emptyStateEl.textContent = messages[activeFilter];
    return;
  }

  emptyStateEl.hidden = true;
}

function renderFilterTabs() {
  for (const tab of filterTabs) {
    const filter = tab.dataset.filter;
    const isActive = filter === activeFilter;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  }
}

function renderFocusToggle() {
  focusToggle.checked = focusOn;
  focusToggle.setAttribute("aria-checked", String(focusOn));
}

function render() {
  const visibleTasks = getVisibleTasks();

  listEl.replaceChildren();
  updateEmptyState(visibleTasks);
  renderFilterTabs();
  renderFocusToggle();

  for (const task of visibleTasks) {
    const item = document.createElement("li");
    item.className = `task-item${task.completed ? " is-done" : ""}`;
    item.dataset.id = task.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `Mark "${task.text}" complete`);
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const label = document.createElement("span");
    label.className = "task-label";
    label.textContent = task.text;

    const prioritySelect = document.createElement("select");
    prioritySelect.className = `priority-select priority-${task.priority}`;
    prioritySelect.setAttribute("aria-label", `Priority for "${task.text}"`);
    for (const level of ["high", "medium", "low"]) {
      const option = document.createElement("option");
      option.value = level;
      option.textContent = level.charAt(0).toUpperCase() + level.slice(1);
      option.selected = task.priority === level;
      prioritySelect.append(option);
    }
    prioritySelect.addEventListener("change", () => {
      updatePriority(task.id, prioritySelect.value);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn btn-ghost";
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute("aria-label", `Delete "${task.text}"`);
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    item.append(checkbox, label, prioritySelect, deleteBtn);
    listEl.append(item);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask(input.value);
  input.value = "";
  input.focus();
});

for (const tab of filterTabs) {
  tab.addEventListener("click", () => {
    const filter = tab.dataset.filter;
    if (filter === "all" || filter === "active" || filter === "done") {
      setFilter(filter);
    }
  });
}

focusToggle.addEventListener("change", () => {
  setFocus(focusToggle.checked);
});

tasks = loadTasks();
activeFilter = loadFilter();
focusOn = loadFocus();
render();
