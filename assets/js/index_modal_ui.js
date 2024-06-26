$(function () {
    $("#task-due-date").datepicker({
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: "dd-mm-yy",
    });
});

function addTaskBtnClicked(){
    if (!validateInput()) return;
    $("#taskDataModal").modal("hide");
    handleAddTask();
}

function clearFormInputs() {
    $("#task-title").val("");
    $("#task-due-date").val("");
    $("#task-description").val("");
}
function validateInput() {
    if ($("#task-title").val() === "") {
        $("label[for='task-title']").addClass("error");
        return false;
    }
    if ($("#task-due-date").val() === "") {
        $("label[for='task-due-date']").addClass("error");
        return false;
    }
    if ($("#task-description").val() === "") {
        $("label[for='task-description']").addClass("error");
        return false;
    }
    return true;
}
// Remove the error message for required input
function formControlChange(event){
    $(`label[for='${event.target.id}']`).removeClass("error");
}