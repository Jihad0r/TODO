let icon = document.querySelector(".image");
let submit = document.querySelector(".submit");
let input = document.querySelector("input");
let list = document.querySelector(".list");
let tasksContainer = document.querySelector(".tasks");
let clear = document.querySelector(".clear");
let showmob = document.querySelector("div.show");
let footer = document.querySelector(".footer");
let left = document.querySelector(".left");
let active = document.querySelector(".active");
let all = document.querySelector(".all");
let completed = document.querySelector(".completed");
let backgroundImg = document.querySelector(".backgroundimg");
let background = document.querySelector(".background");
let tasks = JSON.parse(localStorage.getItem("tasks")) || {};
let upgrade = document.querySelector(".upgrade");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTaskElement(taskText, taskId, isDone) {
  let task = document.createElement("div");
  task.classList.add("task");

  let check = document.createElement("div");
  check.classList.add("check");
  if (isDone) check.classList.add("done");
  let checkImg = document.createElement("img");
  checkImg.setAttribute("src", "images/icon-check.svg");
  check.append(checkImg);

  let text = document.createElement("div");
  let p = document.createElement("p");
  p.append(taskText, text);

  let cross = document.createElement("img");
  cross.setAttribute("src", "images/icon-cross.svg");
  cross.classList.add("cross");
  cross.addEventListener("click", () => {
    if (left.textContent <= 0) {
      upgrade.style.display = "none";
    }

    delete tasks[taskId];
    saveTasks();
    task.remove();
    left.textContent = 6 - Object.keys(tasks).length;
  });

  task.append(check, p, cross);

  check.addEventListener("click", () => {
    check.classList.toggle("done");
    tasks[taskId].isDone = check.classList.contains("done");
    saveTasks();
  });

  return task;
}

icon.addEventListener("click", () => {
  if (icon.querySelector(".sun").style.display === "block") {
    icon.querySelector(".sun").style.display = "none";
    icon.querySelector(".moon").style.display = "block";
    backgroundImg
      .querySelector("img")
      .setAttribute("src", "images/bg-desktop-light.jpg");
    background.style.backgroundColor = "hsl(236, 33%, 92%)";
    list.classList.add("light");
    input.classList.add("light");
    upgrade.classList.add("light");
    showmob.classList.add("light");
  } else {
    icon.querySelector(".moon").style.display = "none";
    icon.querySelector(".sun").style.display = "block";
    backgroundImg
      .querySelector("img")
      .setAttribute("src", "images/bg-desktop-dark.jpg");
    background.style.backgroundColor = "hsl(235, 21%, 11%)";
    list.classList.remove("light");
    input.classList.remove("light");
    upgrade.classList.remove("light");
    showmob.classList.remove("light");
  }
});
if (window.innerWidth < "1120") {
  let filter = footer.querySelector(".show").cloneNode(true);
  showmob.append(filter);
  footer.querySelector(".show").style.display = "none";
  let all = filter.querySelector(".all");
  let active = filter.querySelector(".active");
  let completed = filter.querySelector(".completed");

  all.addEventListener("click", () => {
    if (list.classList.contains("light")) {
      all.style.color = "hsl(220, 98%, 61%)";
      active.style.color = "hsl(233, 14%, 85%)";
      completed.style.color = "hsl(233, 14%, 85%)";
    } else {
      all.style.color = "hsl(220, 98%, 61%)";
      active.style.color = "hsl(233, 14%, 35%)";
      completed.style.color = "hsl(233, 14%, 35%)";
    }
    tasksContainer.innerHTML = "";
    Object.keys(tasks).forEach((taskId) => {
      const { text, isDone } = tasks[taskId];
      const taskElement = createTaskElement(text, taskId, isDone);
      tasksContainer.append(taskElement);
    });
  });

  completed.addEventListener("click", () => {
    if (list.classList.contains("light")) {
      active.style.color = "hsl(234, 39%, 85%)";
      all.style.color = "hsl(233, 14%, 85%)";
      completed.style.color = "hsl(233, 14%, 35%)";
    } else {
      all.style.color = "hsl(233, 14%, 35%)";
      active.style.color = "hsl(233, 14%, 35%)";
      completed.style.color = "hsl(233, 14%, 85%)";
    }
    tasksContainer.innerHTML = "";
    Object.keys(tasks).forEach((taskId) => {
      const { text, isDone } = tasks[taskId];
      if (isDone) {
        const taskElement = createTaskElement(text, taskId, isDone);
        tasksContainer.append(taskElement);
      }
    });
  });

  active.addEventListener("click", () => {
    if (list.classList.contains("light")) {
      active.style.color = "hsl(234, 39%, 35%)";
      all.style.color = "hsl(233, 14%, 85%)";
      completed.style.color = "hsl(233, 14%, 85%)";
    } else {
      active.style.color = "hsl(234, 39%, 85%)";
      all.style.color = "hsl(233, 14%, 35%)";
      completed.style.color = "hsl(233, 14%, 35%)";
    }
    tasksContainer.innerHTML = "";
    Object.keys(tasks).forEach((taskId) => {
      const { text, isDone } = tasks[taskId];
      if (!isDone) {
        const taskElement = createTaskElement(text, taskId, isDone);
        tasksContainer.append(taskElement);
      }
    });
  });
}
clear.addEventListener("click", () => {
  if (left.textContent <= 0) {
    upgrade.style.display = "none";
  }
  tasks = {};
  saveTasks();
  tasksContainer.innerHTML = "";
  left.textContent = 6;
});

submit.addEventListener("click", () => {
  if (left.textContent <= 0) {
    upgrade.style.display = "block";
  } else {
    const taskText = input.value.trim();
    if (taskText) {
      const taskId = Date.now().toString();
      tasks[taskId] = { text: taskText, isDone: false };
      saveTasks();
      left.textContent = 6 - Object.keys(tasks).length;
      const taskElement = createTaskElement(taskText, taskId, false);
      tasksContainer.append(taskElement);
      input.value = "";
    }
  }
});

window.addEventListener("DOMContentLoaded", () => {
  icon.querySelector(".sun").style.display = "block";
  Object.keys(tasks).forEach((taskId) => {
    const { text, isDone } = tasks[taskId];
    const taskElement = createTaskElement(text, taskId, isDone);
    tasksContainer.append(taskElement);
  });
  left.textContent = 6 - Object.keys(tasks).length;
});
all.addEventListener("click", () => {
  if (list.classList.contains("light")) {
    all.style.color = "hsl(220, 98%, 61%)";
    active.style.color = "hsl(233, 14%, 85%)";
    completed.style.color = "hsl(233, 14%, 85%)";
  } else {
    all.style.color = "hsl(220, 98%, 61%)";
    active.style.color = "hsl(233, 14%, 35%)";
    completed.style.color = "hsl(233, 14%, 35%)";
  }
  tasksContainer.innerHTML = "";
  Object.keys(tasks).forEach((taskId) => {
    const { text, isDone } = tasks[taskId];
    const taskElement = createTaskElement(text, taskId, isDone);
    tasksContainer.append(taskElement);
  });
});

completed.addEventListener("click", () => {
  if (list.classList.contains("light")) {
    active.style.color = "hsl(234, 39%, 85%)";
    all.style.color = "hsl(233, 14%, 85%)";
    completed.style.color = "hsl(233, 14%, 35%)";
  } else {
    all.style.color = "hsl(233, 14%, 35%)";
    active.style.color = "hsl(233, 14%, 35%)";
    completed.style.color = "hsl(233, 14%, 85%)";
  }
  tasksContainer.innerHTML = "";
  Object.keys(tasks).forEach((taskId) => {
    const { text, isDone } = tasks[taskId];
    if (isDone) {
      const taskElement = createTaskElement(text, taskId, isDone);
      tasksContainer.append(taskElement);
    }
  });
});

active.addEventListener("click", () => {
  if (list.classList.contains("light")) {
    active.style.color = "hsl(234, 39%, 35%)";
    all.style.color = "hsl(233, 14%, 85%)";
    completed.style.color = "hsl(233, 14%, 85%)";
  } else {
    active.style.color = "hsl(234, 39%, 85%)";
    all.style.color = "hsl(233, 14%, 35%)";
    completed.style.color = "hsl(233, 14%, 35%)";
  }
  tasksContainer.innerHTML = "";
  Object.keys(tasks).forEach((taskId) => {
    const { text, isDone } = tasks[taskId];
    if (!isDone) {
      const taskElement = createTaskElement(text, taskId, isDone);
      tasksContainer.append(taskElement);
    }
  });
});
