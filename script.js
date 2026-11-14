// ---------------------------------------------------------------
// Task Tree: a to-do list where tasks can have subtasks.
// Each task looks like: { id, text, done, subtasks: [] }
// ---------------------------------------------------------------

const STORAGE_KEY = "task-tree-tasks";

let tasks = loadTasks();
let currentFilter = "all";

// ---------- Storage (with exception handling) ----------

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    // Corrupted or unavailable storage should not crash the app.
    console.warn("Could not load saved tasks, starting fresh:", error.message);
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.warn("Could not save tasks:", error.message);
  }
}

// ---------- Recursive helpers ----------

// Find a task by id anywhere in the tree (recursion).
function findTask(list, id) {
  for (const task of list) {
    if (task.id === id) return task;
    const found = findTask(task.subtasks, id);
    if (found) return found;
  }
  return undefined;
}

// Return a new tree without the task that has this id (recursion).
function removeTask(list, id) {
  return list
    .filter((task) => task.id !== id)
    .map((task) => ({ ...task, subtasks: removeTask(task.subtasks, id) }));
}

// Count every task and every completed task, including subtasks (recursion).
function countTasks(list) {
  return list.reduce(
    (totals, task) => {
      const inner = countTasks(task.subtasks);
      return {
        total: totals.total + 1 + inner.total,
        done: totals.done + (task.done ? 1 : 0) + inner.done,
      };
    },
    { total: 0, done: 0 }
  );
}

// Turn the tree into a flat list with a depth number (recursion + flatMap).
function flattenTasks(list, depth = 0) {
  return list.flatMap((task) => [
    { task, depth },
    ...flattenTasks(task.subtasks, depth + 1),
  ]);
}

// ---------- Task actions ----------

function validateText(text) {
  if (text.trim() === "") {
    throw new Error("Task name cannot be empty.");
  }
  const isDuplicate = flattenTasks(tasks).some(
    ({ task }) => task.text.toLowerCase() === text.trim().toLowerCase()
  );
  if (isDuplicate) {
    throw new Error("That task already exists.");
  }
}

function addTask(text, parentId) {
  validateText(text); // throws if the text is not valid

  const newTask = { id: Date.now(), text: text.trim(), done: false, subtasks: [] };

  if (parentId) {
    const parent = findTask(tasks, Number(parentId));
    if (!parent) throw new Error("Parent task not found.");
    parent.subtasks.push(newTask);
  } else {
    tasks.push(newTask);
  }
}

function toggleTask(id) {
  const task = findTask(tasks, id);
  if (!task) return;
  task.done = !task.done;

  // Celebrate when everything is finished.
  const { total, done } = countTasks(tasks);
  if (task.done && total > 0 && done === total && typeof confetti === "function") {
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.7 } });
  }
}

function deleteTask(id) {
  tasks = removeTask(tasks, id);
}

// ---------- Rendering ----------

// Decide whether a task passes the current filter (filter at each level).
function visibleTasks(list) {
  return list.filter((task) => {
    if (currentFilter === "active") return !task.done;
    if (currentFilter === "completed") return task.done;
    return true;
  });
}

// Build one <li>, then call itself for each subtask (recursion).
function renderTask(task) {
  const li = document.createElement("li");

  const row = document.createElement("div");
  row.className = "task-row";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.done;
  checkbox.setAttribute("aria-label", `Mark "${task.text}" as done`);
  checkbox.addEventListener("change", () => {
    toggleTask(task.id);
    update();
  });

  const label = document.createElement("span");
  label.textContent = task.text;
  if (task.done) label.className = "done";

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Delete";
  removeBtn.className = "delete";
  removeBtn.addEventListener("click", () => {
    deleteTask(task.id);
    update();
  });

  row.append(checkbox, label, removeBtn);
  li.appendChild(row);

  const children = visibleTasks(task.subtasks);
  if (children.length > 0) {
    const ul = document.createElement("ul");
    children.map(renderTask).forEach((child) => ul.appendChild(child));
    li.appendChild(ul);
  }

  return li;
}

function renderList() {
  const list = document.getElementById("task-list");
  list.innerHTML = "";
  visibleTasks(tasks).map(renderTask).forEach((li) => list.appendChild(li));
}

function renderParentOptions() {
  const select = document.getElementById("parent-select");
  select.innerHTML = "";

  const top = document.createElement("option");
  top.value = "";
  top.textContent = "Top level";
  select.appendChild(top);

  flattenTasks(tasks).forEach(({ task, depth }) => {
    const option = document.createElement("option");
    option.value = task.id;
    option.textContent = `${"\u2014 ".repeat(depth)}Under: ${task.text}`;
    select.appendChild(option);
  });
}

function renderSummary() {
  const { total, done } = countTasks(tasks);
  const summary = document.getElementById("summary");
  summary.textContent =
    total === 0 ? "No tasks yet. Add your first one above." : `${done} of ${total} tasks done`;
}

function update() {
  saveTasks();
  renderList();
  renderParentOptions();
  renderSummary();
}

// ---------- Events ----------

const input = document.getElementById("task-input");
const errorBox = document.getElementById("error");

function handleAdd() {
  try {
    const parentId = document.getElementById("parent-select").value;
    addTask(input.value, parentId);
    input.value = "";
    errorBox.textContent = "";
    update();
  } catch (error) {
    errorBox.textContent = error.message; // show the problem on the page
  }
  input.focus();
}

document.getElementById("add-btn").addEventListener("click", handleAdd);
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") handleAdd();
});

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    document.querySelectorAll(".filter").forEach((b) => b.classList.remove("active"));
    button.classList.add("active");
    renderList();
  });
});

update();
