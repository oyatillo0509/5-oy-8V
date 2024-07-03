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

  function addTask(taskText) {
    const listItem = document.createElement("div");
    listItem.className = "task";

    listItem.innerHTML = `
      <span>${taskText}</span>
      <button class="edit">Edit</button>
      <button class="delete">Delete</button>
    `;

    const deleteButton = listItem.querySelector(".delete");
    deleteButton.addEventListener("click", () => deleteTask(listItem));

    const editButton = listItem.querySelector(".edit");
    editButton.addEventListener("click", () => editTask(listItem));

    taskList.appendChild(listItem);
    saveTasks();
  }

  function deleteTask(taskItem) {
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

    if (tasks) {
      tasks.forEach((taskText) => {
        addTask(taskText);
      });
    }
  }
});
