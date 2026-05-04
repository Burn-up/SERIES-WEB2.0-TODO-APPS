let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const span = document.createElement("span");
    span.textContent = task.text;
    span.onclick = () => toggleTask(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => deleteTask(index);

    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (text === "") return;

  tasks.push({ text, completed: false });
  input.value = "";

  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Load tasks on start
renderTasks();