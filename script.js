//I am a script
const toDoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const toDoList = document.getElementById("todo-list");
let taskNum = 0;
addButton.addEventListener("click", addTask);

//add function
function addTask() {
  if (toDoInput.value != "") {
    console.log("Add Task");

    let newDoneButton = document.createElement("button");
    // newDoneButton.innerHTML = "Done";
    let newTask = document.createElement("li");
    let newTaskText = document.createElement("p");
    newTaskText.textContent = toDoInput.value;
    //Make content editable with next line
    newTaskText.contentEditable = true;
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

    //empty the input field
    toDoInput.value = "";
  } else {
    console.log("Input is empty");
  }

  //Save ToDo-List in local storage
  saveData();
}

// add task with enter key

toDoInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

//Delete function
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("deleteButton")) {
    event.target.parentNode.remove();
    saveData();
  }
});

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("addButton")) {
    event.target.parentNode.remove();
  }
});

// Am Ende der Aufgabenliste einen "Alle löschen" Button hinzufügen
const deleteAllButton = document.createElement("button");
deleteAllButton.textContent = "Delete all";
deleteAllButton.addEventListener("click", function () {
  const toDoItems = document.querySelectorAll("#todo-list li");
  toDoItems.forEach((item) => {
    item.remove();
    saveData();
  });
});
toDoList.parentNode.appendChild(deleteAllButton); // Hinzufügen des Buttons ans Ende der UL, nicht ans Ende der Eingabe

//ToDo-Liste in local storage speichern
function saveData() {
  localStorage.setItem("data", toDoList.innerHTML);
}

//ToDo-Liste wieder aus dem local storage laden
function showTask() {
  toDoList.innerHTML = localStorage.getItem("data");
}
showTask();

//Marks-As-Done function
toDoList.addEventListener("click", (event) => {
  // Überprüfen, ob der "Done" Button gedrückt wurde
  if (event.target.classList.contains("doneButton")) {
    // Elternelement (li) des Buttons finden
    const listItem = event.target.parentNode;
    // Durchstreichen des Textes im Listenelement
    const taskText = listItem.querySelector(".taskText");

    if (!listItem.classList.contains("checked")) {
      taskText.style.textDecoration = "line-through";
      taskText.style.fontWeight = "Bold";
      listItem.classList.add("checked");
      // Ändern der Hintergrundfarbe des Buttons
      event.target.style.backgroundColor = " #79e9a2";
      // Checkmark-Symbol einfügen auf Button
      event.target.innerHTML = "&#10004;";
      event.target.style.padding = "1px";
      
    } else {
      // Ändern der Hintergrundfarbe des Buttons
      event.target.style.backgroundColor = " #fff";
      listItem.classList.remove("checked");
      event.target.innerHTML = "";
      taskText.style.fontWeight = "normal";
      taskText.style.textDecoration = "none";
    }
    console.log(taskText.style.textDecoration);
  }
});
// Funktion zum Drucken der To-Do-Liste
function printToDoList() {
  // Inhalt der To-Do-Liste abrufen
  const toDoListContent = document.getElementById("todo-list").innerHTML;
  // Neues Fenster öffnen
  const printWindow = window.open("", "_blank");
  // HTML-Struktur für das Drucken erstellen
  const printContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Print ToDo List</title>
      <style>
        /* CSS-Stile für den Druck */
        /* Stile der ToDo-Liste */
        ul {
          list-style-type: none;
          padding: 0;
        }
        li {
          background-color: #eafdfc;
          padding: 0.2rem;
          margin-bottom: 0.3rem;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 1px 0.5px 2px 0.5px;
        }
        li .deleteButton {
          background-color: #eafdfc;
          color: white;
          border: none;
          border-radius: 2px;
          padding: 5px;
          margin-left: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          font-size: 0;
          background-image: url("./images/close2.png"); /* Hinzufügen des Error-Bildes als Hintergrundbild */
          background-size: cover;
        }
        li .deleteButton:hover {
          background-color: #e382a263;
        }
      </style>
    </head>
    <body>
      <!-- Inhalt der ToDo-Liste -->
      <ul>${toDoListContent}</ul>
    </body>
    </html>
  `;
  // Inhalt in das neue Fenster schreiben
  printWindow.document.write(printContent);
  // Drucken auslösen
  printWindow.print();
}

// Event-Listener für den Drucker-Button
const printButton = document.getElementById("print-button");
printButton.addEventListener("click", printToDoList);
