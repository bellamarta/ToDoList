//I am a script
const toDoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const toDoList = document.getElementById("todo-list");
let taskNum = 0;
addButton.addEventListener("click", addTask);

function addTask() {
  if (toDoInput.value != "") {
    console.log("Add Task");

    let newDoneButton = document.createElement("button");
    // newDoneButton.innerHTML = "Done";
    let newTask = document.createElement("li");
    let newTaskText = document.createElement("p");
    newTaskText.textContent = toDoInput.value;
    let newDeleteButton = document.createElement("button");
    newDeleteButton.innerHTML = "Delete";

    newTask.appendChild(newDoneButton);
    newTask.appendChild(newTaskText);
    newTask.appendChild(newDeleteButton);

    toDoList.appendChild(newTask);
    //ID hinzufügen
    taskNum = toDoList.getElementsByTagName("li").length;
    //set Attribute ID
    newDoneButton.setAttribute("id", `doneButton${taskNum}`);
    newTask.setAttribute("id", `task${taskNum}`);
    newTaskText.setAttribute("id", `taskText${taskNum}`);
    newDeleteButton.setAttribute("id", `deleteButton${taskNum}`);
    //set Attribute Class
    newDoneButton.setAttribute("class", `doneButton`);
    newTask.setAttribute("class", `task`);
    newTaskText.setAttribute("class", `taskText`);
    newDeleteButton.setAttribute("class", `deleteButton`);
  } else {
    console.log("Input is empty");
  }
}

//Delete function
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("deleteButton")) {
    event.target.parentNode.remove();
  }
});

// Am Ende der Aufgabenliste einen "Alle löschen" Button hinzufügen
const deleteAllButton = document.createElement("button");
deleteAllButton.textContent = "Alle löschen";
deleteAllButton.addEventListener("click", function () {
  const toDoItems = document.querySelectorAll("#todo-list li");
  toDoItems.forEach((item) => {
    item.remove();
  });
});
toDoList.parentNode.appendChild(deleteAllButton); // Hinzufügen des Buttons ans Ende der UL, nicht ans Ende der Eingabe
