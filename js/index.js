document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.querySelector(".btn");
  const taskInput = document.getElementById("taskInput");
  const taskList = document.querySelector(".todo_list");

  loadTasks();

  addButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();

    if (taskText.length < 3) {
      alert("Eng kamida 3 ta belgi kiriting");
      taskInput.style.outlineColor = "red";
      taskInput.focus();
      return;
    }

    addTask(taskText);
    taskInput.value = "";
    taskInput.style.outlineColor = ""; 
  });
});

function addTask(taskText) {
  const taskList = document.querySelector(".todo_list");

  const listItem = document.createElement("div");
  listItem.className = "task";

  listItem.innerHTML = `
    <span>${taskText}</span>
    <button class="edit">Edit</button>
    <button class="delete" onclick="deleteTask(this)">Delete</button>
  `;

  taskList.appendChild(listItem);
  saveTasks();
}

function deleteTask(button) {
  const taskItem = button.parentElement;
  taskItem.remove();
  saveTasks();
}

function saveTasks() {
  const taskList = document.querySelectorAll(".task span");
  const tasks = [];

  taskList.forEach((task) => {
    tasks.push(task.textContent);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  tasks.forEach((taskText) => {
    addTask(taskText);
  });
}
