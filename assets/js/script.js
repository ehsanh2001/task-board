// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = Number(localStorage.getItem("nextId")) || 0;

const TaskStatus = {
    TODO: "todo",
    IN_PROGRESS: "inprogress",
    DONE: "done",
};

// Todo: create a function to generate a unique task id
function generateTaskId() {
    nextId++;
    localStorage.setItem("nextId", nextId);
    return nextId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const cardColor = "card-late";
    const headerColor = cardColor + "-header";

    let card = $("<div>").addClass(`card m-2 ${cardColor}`);

    let cardHeader = $("<div>").addClass(`card-header h3 ${headerColor}`);
    cardHeader.text(task.title);
    card.append(cardHeader);

    let cardBody = $("<div>").addClass("card-body text-start");
    let cardBodyDueDate = $("<p>").addClass("card-text h6").text(task.dueDate);
    cardBody.append(`Due Date: cardBodyDueDate`);
    let cardBodyDescription = $("<p>")
        .addClass("card-text border rounded p-1")
        .text(task.description);
    cardBody.append(cardBodyDescription);

    //we use a container for delete button to center it on the card
    let delBtnContainer = $("<div>").addClass("text-center");
    let delBtn = $("<button type='button'>")
        .addClass("btn btn-danger")
        .text("Delete");
    delBtnContainer.append(delBtn);
    cardBody.append(delBtnContainer);

    card.append(cardBody);

    return card;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {}

// Todo: create a function to handle adding a new task
function Task(title, dueDate, description) {
    this.title = title;
    this.dueDate = dueDate;
    this.description = description;
    this.id = generateTaskId();
    this.status = TaskStatus.TODO;
}

function handleAddTask() {
    let title = $("#task-title").val();
    let dueDate = $("#task-due-date").val();
    let description = $("#task-description").val();

    clearFormInputs();

    let task = new Task(title, dueDate, description);
    taskList.push(task);

    localStorage.setItem("tasks", JSON.stringify(taskList));

    let card = createTaskCard(task);
    $("#to-do").append(card);
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {});
