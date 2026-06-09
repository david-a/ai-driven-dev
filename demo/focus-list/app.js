const STORAGE_KEY = "focus-list:tasks";
const FILTER_KEY = "focus-list:filter";

/** @type {{ id: string, text: string, completed: boolean }[]} */
let tasks = [];

/** @type {"all" | "active" | "done"} */
let activeFilter = "all";

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const listEl = document.getElementById("task-list");
const emptyStateEl = document.getElementById("empty-state");
const filterTabs = document.querySelectorAll(".filter-tab");

function createId() {
  return crypto.randomUUID?.() ?? `task-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
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

function getVisibleTasks() {
  if (activeFilter === "active") {
    return tasks.filter((task) => !task.completed);
  }
  if (activeFilter === "done") {
    return tasks.filter((task) => task.completed);
  }
  return tasks;
}

function setFilter(filter) {
  activeFilter = filter;
  saveFilter();
  render();
}

function addTask(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  tasks = [...tasks, { id: createId(), text: trimmed, completed: false }];
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

function render() {
  const visibleTasks = getVisibleTasks();

  listEl.replaceChildren();
  updateEmptyState(visibleTasks);
  renderFilterTabs();

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

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn btn-ghost";
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute("aria-label", `Delete "${task.text}"`);
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    item.append(checkbox, label, deleteBtn);
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

tasks = loadTasks();
activeFilter = loadFilter();
render();
