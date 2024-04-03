// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = Number(localStorage.getItem("nextId")) || 0;

const TaskStatus = {
    TODO: "todo",
    IN_PROGRESS: "in-progress",
    DONE: "done",
};

// Todo: create a function to generate a unique task id
function generateTaskId() {
    nextId++;
    localStorage.setItem("nextId", nextId);
    return nextId;
}

// Todo: create a function to create a task card
function colorClassByDueDate(taskDueDate) {
    let cardColor = "";
    const todayDate = dayjs();
    const dueDate = dayjs(taskDueDate, "DD-MM-YYYY");

    if (dueDate.isSame(todayDate, "day")) {
        cardColor = "card-today";
    } else if (dueDate.isAfter(todayDate, "day")) {
        cardColor = "card-normal";
    } else {
        cardColor = "card-late";
    }
    return cardColor;
}

function createTaskCard(task) {
    let cardColorClass, headerColorClass;
    cardColorClass = colorClassByDueDate(task.dueDate);
    headerColorClass = cardColorClass + "-header";

    // Card
    let card = $("<div>").addClass(`card m-2 ${cardColorClass}`);
    card.attr("draggable", "true");
    card.attr("id", task.id);
    card.attr("ondragstart", "dragStart(event)");
    //////////Card Header
    let cardHeader = $("<div>").addClass(`card-header h3 ${headerColorClass}`);
    cardHeader.text(task.title);
    card.append(cardHeader);
    //////////Card Body
    let cardBody = $("<div>").addClass("card-body text-start");
    card.append(cardBody);
    //////////////////Due Date Paragraph
    let cardBodyDueDate = $("<p>")
        .addClass("card-text h6")
        .text("Due Date: " + task.dueDate);
    cardBody.append(cardBodyDueDate);
    //////////////////Description Paragraph
    let cardBodyDescription = $("<p>")
        .addClass("card-text border rounded p-1")
        .text(task.description);
    cardBody.append(cardBodyDescription);
    //////////////////Delete Button Container
    //we use a container for delete button to center it on the card
    let delBtnContainer = $("<div>").addClass("text-center");
    cardBody.append(delBtnContainer);
    //////////////////////////Delete Button
    let delBtn = $("<button type='button'>")
        .addClass("btn btn-danger")
        .text("Delete");
    delBtnContainer.append(delBtn);

    return card;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const todoCards = $("#todo-cards");
    const inProgressCards = $("#in-progress-cards");
    const doneCards = $("#done-cards");
    todoCards.empty();
    inProgressCards.empty();
    doneCards.empty();

    for (const task of taskList) {
        let card = createTaskCard(task);
        if (task.status === TaskStatus.TODO) {
            todoCards.append(card);
        } else if (task.status === TaskStatus.IN_PROGRESS) {
            inProgressCards.append(card);
        } else {
            doneCards.append(card);
        }
    }
}

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
    renderTaskList();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
// Using html and JS for drag and drop not jQuery
function allowDrop(event) {
    event.preventDefault();
}

function dragStart(event) {
    event.dataTransfer.setData("taskId", event.target.id);
}

function drop(event) {
    event.preventDefault();

    let id = event.dataTransfer.getData("taskId");
    let draggedElement = document.getElementById(id);
    let dropTarget = event.target;

    // If drop target is a task card, find its parent container
    while (dropTarget && !dropTarget.classList.contains("card-container")) {
        dropTarget = dropTarget.parentElement;
    }
    // Append the dragged card to the parent container
    if (dropTarget) {
        dropTarget.appendChild(draggedElement);
        let taskIndex = taskList.findIndex((task) => task.id == id);
        if (dropTarget.id == "todo-cards") {
            taskList[taskIndex].status = TaskStatus.TODO;
        } else if (dropTarget.id == "in-progress-cards") {
            taskList[taskIndex].status = TaskStatus.IN_PROGRESS;
        } else {
            taskList[taskIndex].status = TaskStatus.DONE;
        }
        localStorage.setItem("tasks", JSON.stringify(taskList));
    }
}
// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    dayjs.extend(window.dayjs_plugin_customParseFormat);
    renderTaskList();
});
