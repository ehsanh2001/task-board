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
function createTaskCard(task) {}

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

    clearInput();

    let task = new Task(title, dueDate, description);
    taskList.push(task);

    localStorage.setItem("tasks", JSON.stringify(taskList));
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {});
