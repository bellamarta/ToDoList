const addButton = document.getElementById("add-button");
const inputBox = document.getElementById("input-box");
const taskList = document.getElementById("task-list");

addButton.addEventListener("click", addTask);

function addTask() {
  if (inputBox.value === "") {
    alert("Please add a task!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    taskList.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
}

taskList.addEventListener(
  "click",
  function (event) {
    if (event.target.tagName === "LI") {
      event.target.classList.toggle("checked");
    } else if (event.target.tagName === "SPAN") {
      event.target.parentElement.remove();
    }
  },
  false
);
